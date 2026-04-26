import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

export async function GET(request) {
  const config = getAzureDevOpsConfig();

  if (!config.ok) {
    return NextResponse.json({ error: config.error }, { status: 500 });
  }

  const requestedLimit = Number(
    new URL(request.url).searchParams.get("limit") ?? process.env.AZDO_LIMIT,
  );
  const limit = clampLimit(requestedLimit);

  try {
    const wiql = await azureDevOpsFetch(
      config.value,
      "_apis/wit/wiql?api-version=7.1",
      {
        method: "POST",
        body: JSON.stringify({
          query: `
            SELECT [System.Id]
            FROM WorkItems
            WHERE [System.TeamProject] = @project
            ORDER BY [System.ChangedDate] DESC
          `,
        }),
      },
    );

    const ids = (wiql.workItems ?? []).slice(0, limit).map((item) => item.id);

    if (ids.length === 0) {
      return NextResponse.json({ workItems: [], tree: [] });
    }

    const batch = await azureDevOpsFetch(
      config.value,
      "_apis/wit/workitemsbatch?api-version=7.1",
      {
        method: "POST",
        body: JSON.stringify({
          ids,
          $expand: "Relations",
        }),
      },
    );

    const rawWorkItems = batch.value ?? [];
    const workItems = await Promise.all(
      rawWorkItems.map(async (item) => ({
        id: item.id,
        type: item.fields?.["System.WorkItemType"] ?? "",
        title: item.fields?.["System.Title"] ?? "",
        state: item.fields?.["System.State"] ?? "",
        assignedTo: getIdentityName(item.fields?.["System.AssignedTo"]),
        changedDate: item.fields?.["System.ChangedDate"] ?? "",
        createdDate: item.fields?.["System.CreatedDate"] ?? "",
        tags: item.fields?.["System.Tags"] ?? "",
        relations: getHierarchyRelations(item),
        comments: await getComments(config.value, item.id),
      })),
    );

    return NextResponse.json({
      workItems,
      tree: buildWorkItemTree(workItems),
      raw: rawWorkItems,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message ?? "No se pudieron leer Work Items de Azure DevOps." },
      { status: 500 },
    );
  }
}

function buildWorkItemTree(workItems) {
  const nodes = new Map(
    workItems.map((item) => [
      item.id,
      {
        ...item,
        children: [],
      },
    ]),
  );
  const childIds = new Set();

  nodes.forEach((node) => {
    node.relations.forEach((relation) => {
      const target = nodes.get(relation.targetId);

      if (!target) {
        return;
      }

      if (relation.kind === "child") {
        addUniqueChild(node, target);
        childIds.add(target.id);
      }

      if (relation.kind === "parent") {
        addUniqueChild(target, node);
        childIds.add(node.id);
      }
    });
  });

  const roots = [...nodes.values()].filter((node) => !childIds.has(node.id));
  return sortTree(roots);
}

function addUniqueChild(parent, child) {
  if (parent.id === child.id) {
    return;
  }

  if (parent.children.some((existing) => existing.id === child.id)) {
    return;
  }

  parent.children.push(child);
}

function sortTree(nodes) {
  return nodes
    .map((node) => ({
      ...node,
      children: sortTree(node.children),
    }))
    .sort((a, b) => {
      const typeDiff = getTypeOrder(a.type) - getTypeOrder(b.type);

      if (typeDiff !== 0) {
        return typeDiff;
      }

      return new Date(b.changedDate).getTime() - new Date(a.changedDate).getTime();
    });
}

function getHierarchyRelations(item) {
  return (item.relations ?? [])
    .map((relation) => {
      const targetId = getWorkItemIdFromUrl(relation.url);

      if (!targetId) {
        return null;
      }

      if (relation.rel === "System.LinkTypes.Hierarchy-Forward") {
        return { kind: "child", targetId };
      }

      if (relation.rel === "System.LinkTypes.Hierarchy-Reverse") {
        return { kind: "parent", targetId };
      }

      return null;
    })
    .filter(Boolean);
}

function getWorkItemIdFromUrl(url) {
  const match = String(url ?? "").match(/\/workItems\/(\d+)$/i);
  return match ? Number(match[1]) : null;
}

function getTypeOrder(type) {
  const order = {
    Epic: 1,
    Feature: 2,
    "User Story": 3,
    "Product Backlog Item": 3,
    Requirement: 3,
    Task: 4,
    Bug: 4,
  };

  return order[type] ?? 99;
}

async function getComments(config, workItemId) {
  const data = await azureDevOpsFetch(
    config,
    `_apis/wit/workItems/${workItemId}/comments?$top=3&order=desc&api-version=7.1-preview.4`,
  );

  return (data.comments ?? []).map((comment) => ({
    id: comment.id,
    text: stripHtml(comment.text ?? ""),
    createdDate: comment.createdDate ?? "",
    modifiedDate: comment.modifiedDate ?? "",
    createdBy: getIdentityName(comment.createdBy),
  }));
}

async function azureDevOpsFetch(config, path, options = {}) {
  const response = await fetch(`${config.baseUrl}/${path}`, {
    ...options,
    headers: {
      Authorization: `Basic ${config.auth}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Azure DevOps respondio ${response.status}: ${body.slice(0, 300)}`,
    );
  }

  return response.json();
}

function getAzureDevOpsConfig() {
  const org = process.env.AZDO_ORG;
  const project = process.env.AZDO_PROJECT;
  const token = process.env.AZDO_TOKEN;
  const missing = [];

  if (!org) {
    missing.push("AZDO_ORG");
  }

  if (!project) {
    missing.push("AZDO_PROJECT");
  }

  if (!token) {
    missing.push("AZDO_TOKEN");
  }

  if (missing.length > 0) {
    return {
      ok: false,
      error: `Faltan variables de entorno: ${missing.join(", ")}.`,
    };
  }

  const projectSlug = encodeURIComponent(decodeURIComponent(project));

  return {
    ok: true,
    value: {
      baseUrl: `https://dev.azure.com/${org}/${projectSlug}`,
      auth: Buffer.from(`:${token}`).toString("base64"),
    },
  };
}

function clampLimit(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return DEFAULT_LIMIT;
  }

  return Math.min(Math.round(value), MAX_LIMIT);
}

function getIdentityName(identity) {
  if (!identity) {
    return "";
  }

  if (typeof identity === "string") {
    return identity;
  }

  return identity.displayName ?? identity.uniqueName ?? "";
}

function stripHtml(value) {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

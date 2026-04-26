import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 25;

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
      return NextResponse.json({ workItems: [] });
    }

    const batch = await azureDevOpsFetch(
      config.value,
      "_apis/wit/workitemsbatch?api-version=7.1",
      {
        method: "POST",
        body: JSON.stringify({
          ids,
          fields: [
            "System.Id",
            "System.WorkItemType",
            "System.Title",
            "System.State",
            "System.AssignedTo",
            "System.ChangedDate",
            "System.CreatedDate",
            "System.Tags",
          ],
        }),
      },
    );

    const workItems = await Promise.all(
      (batch.value ?? []).map(async (item) => ({
        id: item.id,
        type: item.fields?.["System.WorkItemType"] ?? "",
        title: item.fields?.["System.Title"] ?? "",
        state: item.fields?.["System.State"] ?? "",
        assignedTo: getIdentityName(item.fields?.["System.AssignedTo"]),
        changedDate: item.fields?.["System.ChangedDate"] ?? "",
        createdDate: item.fields?.["System.CreatedDate"] ?? "",
        tags: item.fields?.["System.Tags"] ?? "",
        comments: await getComments(config.value, item.id),
      })),
    );

    return NextResponse.json({ workItems });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message ?? "No se pudieron leer Work Items de Azure DevOps." },
      { status: 500 },
    );
  }
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

  if (!org || !project || !token) {
    return {
      ok: false,
      error: "Faltan variables AZDO_ORG, AZDO_PROJECT o AZDO_TOKEN.",
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

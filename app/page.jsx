"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [campo1, setCampo1] = useState("");
  const [campo2, setCampo2] = useState("");
  const [registros, setRegistros] = useState([]);
  const [workItems, setWorkItems] = useState([]);
  const [workItemTree, setWorkItemTree] = useState([]);
  const [status, setStatus] = useState("Listo para guardar.");
  const [azdoStatus, setAzdoStatus] = useState("Listo para consultar Azure DevOps.");
  const [isError, setIsError] = useState(false);
  const [isAzdoError, setIsAzdoError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingWorkItems, setIsLoadingWorkItems] = useState(false);

  async function loadRegistros() {
    const response = await fetch("/api/registros", {
      cache: "no-store",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "No se pudieron cargar los registros.");
    }

    setRegistros(data.registros);
  }

  useEffect(() => {
    loadRegistros().catch((error) => {
      setIsError(true);
      setStatus(error.message);
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedCampo1 = campo1.trim();
    const trimmedCampo2 = campo2.trim();

    if (!trimmedCampo1 || !trimmedCampo2) {
      setIsError(true);
      setStatus("Completa los dos campos antes de guardar.");
      return;
    }

    setIsSaving(true);
    setIsError(false);
    setStatus("Guardando...");

    try {
      const response = await fetch("/api/registros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campo1: trimmedCampo1,
          campo2: trimmedCampo2,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo guardar.");
      }

      setCampo1("");
      setCampo2("");
      setStatus("Guardado correctamente.");
      await loadRegistros();
    } catch (error) {
      setIsError(true);
      setStatus(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function loadWorkItems() {
    setIsLoadingWorkItems(true);
    setIsAzdoError(false);
    setAzdoStatus("Consultando Azure DevOps...");

    try {
      const response = await fetch("/api/azure-devops/workitems?limit=50", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "No se pudieron cargar los Work Items.");
      }

      setWorkItems(data.workItems ?? []);
      setWorkItemTree(data.tree ?? []);
      setAzdoStatus(`Se cargaron ${data.workItems?.length ?? 0} Work Items.`);
    } catch (error) {
      setIsAzdoError(true);
      setAzdoStatus(error.message);
    } finally {
      setIsLoadingWorkItems(false);
    }
  }

  return (
    <main className="shell">
      <section className="intro" aria-labelledby="title">
        <p className="eyebrow">Next.js + Firebase</p>
        <h1 id="title">Hola Firebase</h1>
        <p className="intro-text">
          Esta version separa la interfaz JSX, una ruta backend y Firestore para
          que puedas crecer la app por capas.
        </p>
        <ul className="layers" aria-label="Capas de la aplicacion">
          <li>Frontend: formulario React en JSX.</li>
          <li>Backend: API route de Next.js.</li>
          <li>Base de datos: Cloud Firestore.</li>
        </ul>
        <a className="route-link" href="/TeamSIIx">
          Abrir tablero TeamSIIx
        </a>
      </section>

      <section className="workspace" aria-label="Formulario y registros">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="campo1">Campo 1</label>
            <input
              id="campo1"
              maxLength={80}
              onChange={(event) => setCampo1(event.target.value)}
              required
              type="text"
              value={campo1}
            />
          </div>

          <div className="form-row">
            <label htmlFor="campo2">Campo 2</label>
            <input
              id="campo2"
              maxLength={80}
              onChange={(event) => setCampo2(event.target.value)}
              required
              type="text"
              value={campo2}
            />
          </div>

          <button className="submit" disabled={isSaving} type="submit">
            {isSaving ? "Guardando..." : "Guardar"}
          </button>

          <p className={isError ? "status error" : "status"} aria-live="polite">
            {status}
          </p>
        </form>

        <div className="list-header">
          <h2>Registros</h2>
          <span className="count">{registros.length}</span>
        </div>

        <ul className="items">
          {registros.length === 0 ? (
            <li className="empty">Todavia no hay registros.</li>
          ) : (
            registros.map((registro) => (
              <li className="item" key={registro.id}>
                <strong>{registro.campo1}</strong>
                <span>{registro.campo2}</span>
              </li>
            ))
          )}
        </ul>

        <div className="list-header">
          <h2>Azure DevOps</h2>
          <span className="count">{workItems.length}</span>
        </div>

        <button
          className="submit secondary"
          disabled={isLoadingWorkItems}
          onClick={loadWorkItems}
          type="button"
        >
          {isLoadingWorkItems ? "Consultando..." : "Traer 50 Work Items"}
        </button>

        <p className={isAzdoError ? "status error" : "status"} aria-live="polite">
          {azdoStatus}
        </p>

        {workItemTree.length > 0 && (
          <div className="tree-panel">
            <h3>Arbol Epic / Feature / Task</h3>
            <ul className="tree">
              {workItemTree.map((node) => (
                <WorkItemTreeNode key={node.id} node={node} />
              ))}
            </ul>
          </div>
        )}

        <ul className="workitems">
          {workItems.map((item) => (
            <li className="workitem" key={item.id}>
              <div className="workitem-title">
                <span>#{item.id}</span>
                <strong>{item.title}</strong>
              </div>
              <div className="workitem-meta">
                <span>{item.type}</span>
                <span>{item.state}</span>
                {item.assignedTo && <span>{item.assignedTo}</span>}
              </div>
              <div className="comments">
                {item.comments.length === 0 ? (
                  <p>No tiene comentarios recientes.</p>
                ) : (
                  item.comments.map((comment) => (
                    <article className="comment" key={comment.id}>
                      <strong>{comment.createdBy || "Sin autor"}</strong>
                      <p>{comment.text || "Comentario sin texto."}</p>
                    </article>
                  ))
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function WorkItemTreeNode({ node }) {
  return (
    <li className="tree-node">
      <div className="tree-card">
        <span className={`type-pill ${getTypeClass(node.type)}`}>{node.type}</span>
        <strong>#{node.id} {node.title}</strong>
        <small>{node.state}{node.assignedTo ? ` · ${node.assignedTo}` : ""}</small>
      </div>
      {node.children.length > 0 && (
        <ul className="tree">
          {node.children.map((child) => (
            <WorkItemTreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

function getTypeClass(type) {
  return String(type).toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

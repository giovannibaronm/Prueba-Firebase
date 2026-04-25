"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [campo1, setCampo1] = useState("");
  const [campo2, setCampo2] = useState("");
  const [registros, setRegistros] = useState([]);
  const [status, setStatus] = useState("Listo para guardar.");
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
      </section>
    </main>
  );
}

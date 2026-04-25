"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronRight, X, Link2, Sun, Moon, Activity } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar as RBar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Legend } from "recharts";

// ═══════════════════════════════════════════════════════════════
// BLOQUE 1: DATOS (140 frentes, con cod + ejec)
// ═══════════════════════════════════════════════════════════════
const DATA = [
{"id": 1, "eje": "Gestión SIIx", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Soporte Apps", "pri": "Media", "cod": "GSIIx-01", "plan": "Mantenimiento Sistemas de Información", "resp": "Miguel Angel Quintero Lopez", "ejec": "Miguel Angel Quintero Lopez", "fi": "16-Feb-26", "ff": "30-Nov-26", "qi": "2026-Q1", "qf": "2026-Q4", "av": "Recurrente", "est": "Recurrente", "estRaw": "R - Recurrente", "fr": "Actualización Catalogo de Sistemas de Información (Ingreso - Actualización - Retiro)", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 1, "q": [1, 2, 3, 4], "rec": 1, "dur": 287},
{"id": 2, "eje": "Gestión SIIx", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Soporte Apps", "pri": "Media", "cod": "GSIIx-01", "plan": "Mantenimiento Sistemas de Información", "resp": "Miguel Angel Quintero Lopez", "ejec": "TeamSIIx", "fi": "2-Mar-26", "ff": "30-May-26", "qi": "2026-Q1", "qf": "", "av": "5%", "est": "Levantamiento", "estRaw": "1 - Levantamiento", "fr": "Mantenimiento Preventivo - Correctivo Sistemas de Información Principales", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 89},
{"id": 3, "eje": "Gestión SIIx", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Soporte Apps", "pri": "Alta", "cod": "GSIIx-01", "plan": "Mantenimiento Sistemas de Información", "resp": "Miguel Angel Quintero Lopez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Aseguramiento de Codigo y Artefactos de los Sistemas de Información Activos (In-House)", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 4, "eje": "Gestión SIIx", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Soporte Apps", "pri": "Media", "cod": "GSIIx-02", "plan": "Soporte Segundo Nivel Aplicaciones", "resp": "Martha Ines Lizarazo Torres", "ejec": "Analistas SIRBE", "fi": "2-Jan-26", "ff": "31-Dec-26", "qi": "2026-Q1", "qf": "2026-Q4", "av": "Recurrente", "est": "Recurrente", "estRaw": "R - Recurrente", "fr": "Soporte SIRBE Web", "sol": "", "obs": "", "comp": "Baja", "rad": "", "qS": 1, "q": [1, 2, 3, 4], "rec": 1, "dur": 363},
{"id": 5, "eje": "Gestión SIIx", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Soporte Apps", "pri": "Media", "cod": "GSIIx-02", "plan": "Soporte Segundo Nivel Aplicaciones", "resp": "Martha Cecilia Calderon Castro", "ejec": "Analistas SEVEN", "fi": "2-Jan-26", "ff": "31-Dec-26", "qi": "2026-Q1", "qf": "2026-Q4", "av": "Recurrente", "est": "Recurrente", "estRaw": "R - Recurrente", "fr": "Soporte SEVEN", "sol": "", "obs": "", "comp": "Baja", "rad": "", "qS": 1, "q": [1, 2, 3, 4], "rec": 1, "dur": 363},
{"id": 6, "eje": "Gestión SIIx", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Soporte Apps", "pri": "Media", "cod": "GSIIx-02", "plan": "Soporte Segundo Nivel Aplicaciones", "resp": "Martha Cecilia Calderon Castro", "ejec": "Martha Elizabeth Tovar Peña", "fi": "2-Jan-26", "ff": "31-Dec-26", "qi": "2026-Q1", "qf": "2026-Q4", "av": "Recurrente", "est": "Recurrente", "estRaw": "R - Recurrente", "fr": "Soporte Kactus", "sol": "", "obs": "", "comp": "Baja", "rad": "", "qS": 1, "q": [1, 2, 3, 4], "rec": 1, "dur": 363},
{"id": 7, "eje": "Gestión SIIx", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Soporte Apps", "pri": "Media", "cod": "GSIIx-02", "plan": "Soporte Segundo Nivel Aplicaciones", "resp": "Miguel Angel Quintero Lopez", "ejec": "Yeferson Alexander Ladino Cuervo", "fi": "2-Jan-26", "ff": "31-Dec-26", "qi": "2026-Q1", "qf": "2026-Q4", "av": "Recurrente", "est": "Recurrente", "estRaw": "R - Recurrente", "fr": "Soporte AZDigital", "sol": "Contrato 7746-2025 Analítica", "obs": "", "comp": "Baja", "rad": "", "qS": 1, "q": [1, 2, 3, 4], "rec": 1, "dur": 363},
{"id": 8, "eje": "Gestión SIIx", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Soporte Apps", "pri": "Media", "cod": "GSIIx-02", "plan": "Soporte Segundo Nivel Aplicaciones", "resp": "Liliana Borda Parra", "ejec": "Analistas IOPS", "fi": "2-Jan-26", "ff": "31-Dec-26", "qi": "2026-Q1", "qf": "2026-Q4", "av": "Recurrente", "est": "Recurrente", "estRaw": "R - Recurrente", "fr": "Soporte IOPS", "sol": "", "obs": "", "comp": "Baja", "rad": "", "qS": 1, "q": [1, 2, 3, 4], "rec": 1, "dur": 363},
{"id": 9, "eje": "Gestión SIIx", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Soporte Apps", "pri": "Media", "cod": "GSIIx-02", "plan": "Soporte Segundo Nivel Aplicaciones", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Analistas Busines Apps", "fi": "2-Jan-26", "ff": "31-Dec-26", "qi": "2026-Q1", "qf": "2026-Q4", "av": "Recurrente", "est": "Recurrente", "estRaw": "R - Recurrente", "fr": "Soporte aplicaciones Business Apps", "sol": "", "obs": "", "comp": "Baja", "rad": "", "qS": 1, "q": [1, 2, 3, 4], "rec": 1, "dur": 363},
{"id": 10, "eje": "Gestión SIIx", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Gestión SIIx", "pri": "Alta", "cod": "GSIIx-02", "plan": "Contrato: 10687 - 2025 - AGATA", "resp": "Miguel Angel Quintero Lopez", "ejec": "Johanm Mauricio Carrillo Mayo", "fi": "19-Nov-25", "ff": "18-Jun-26", "qi": "2025-Q4", "qf": "2026-Q2", "av": "51%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Pagina Web - 1. La Modernización Del Portal Web Institucional", "sol": "Contrato: 10687 - 2025 - AGATA", "obs": "", "comp": "Media", "rad": "", "qS": 4, "q": [1, 2], "rec": 0, "dur": 211},
{"id": 11, "eje": "Gestión SIIx", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Gestión SIIx", "pri": "Alta", "cod": "GSIIx-02", "plan": "Contrato: 10687 - 2025 - AGATA", "resp": "Miguel Angel Quintero Lopez", "ejec": "Johanm Mauricio Carrillo Mayo", "fi": "19-Nov-25", "ff": "18-Jun-26", "qi": "2025-Q4", "qf": "2026-Q2", "av": "20%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Pagina Web - 2. Desarrollo del visor de bienestar", "sol": "Contrato: 10687 - 2025 - AGATA", "obs": "", "comp": "Media", "rad": "", "qS": 4, "q": [1, 2], "rec": 0, "dur": 211},
{"id": 12, "eje": "Gestión SIIx", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Gestión SIIx", "pri": "Alta", "cod": "GSIIx-02", "plan": "Contrato: 10687 - 2025 - AGATA", "resp": "Miguel Angel Quintero Lopez", "ejec": "Johanm Mauricio Carrillo Mayo", "fi": "19-Nov-25", "ff": "18-Jun-26", "qi": "2025-Q4", "qf": "2026-Q2", "av": "70%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Pagina Web - 3. Diseño de la Intranet basado en  SharePoint Online", "sol": "Contrato: 10687 - 2025 - AGATA", "obs": "", "comp": "Media", "rad": "", "qS": 4, "q": [1, 2], "rec": 0, "dur": 211},
{"id": 13, "eje": "Gestión SIIx", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Gestión SIIx", "pri": "Alta", "cod": "GSIIx-02", "plan": "Contrato: 10687 - 2025 - AGATA", "resp": "Miguel Angel Quintero Lopez", "ejec": "Johanm Mauricio Carrillo Mayo", "fi": "19-Nov-25", "ff": "18-Jun-26", "qi": "2025-Q4", "qf": "2026-Q2", "av": "3%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Pagina Web - 4.  Portal de Niños", "sol": "Contrato: 10687 - 2025 - AGATA", "obs": "23-Abr-2026: En aprobación de historias de usuario", "comp": "Media", "rad": "", "qS": 4, "q": [1, 2], "rec": 0, "dur": 211},
{"id": 14, "eje": "Gestión SIIx", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Gestión SIIx", "pri": "Alta", "cod": "GSIIx-02", "plan": "Contrato: 10687 - 2025 - AGATA", "resp": "Miguel Angel Quintero Lopez", "ejec": "Diego Alfonso Pedroza Castro", "fi": "19-Nov-25", "ff": "18-Jun-26", "qi": "2025-Q4", "qf": "2026-Q2", "av": "33%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Prospectiva - IA", "sol": "Contrato: 10687 - 2025 - AGATA", "obs": "", "comp": "Media", "rad": "", "qS": 4, "q": [1, 2], "rec": 0, "dur": 211},
{"id": 15, "eje": "Gestión SIIx", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Gestión SIIx", "pri": "Alta", "cod": "GSIIx-02", "plan": "Contrato: 10687 - 2025 - AGATA", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Juan Carlos Pelaez Reyes", "fi": "19-Nov-25", "ff": "18-Jun-26", "qi": "2025-Q4", "qf": "2026-Q2", "av": "33%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Notificaciones Comisarias", "sol": "Contrato: 10687 - 2025 - AGATA", "obs": "", "comp": "Media", "rad": "", "qS": 4, "q": [1, 2], "rec": 0, "dur": 211},
{"id": 16, "eje": "Gestión SIIx", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Gestión SIIx", "pri": "Alta", "cod": "GSIIx-02", "plan": "Contrato: 10687 - 2025 - AGATA", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Jhon Jairo Gonzalez Melo", "fi": "19-Nov-25", "ff": "18-Jun-26", "qi": "2025-Q4", "qf": "2026-Q2", "av": "33%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "La Profe", "sol": "Contrato: 10687 - 2025 - AGATA", "obs": "", "comp": "Media", "rad": "", "qS": 4, "q": [1, 2], "rec": 0, "dur": 211},
{"id": 17, "eje": "A. Eje Estratégico (Misional)", "area": "Subsecretaria Técnica", "ejeE": "Datos - Misional", "pri": "Baja", "cod": "Datos-03", "plan": "Inteligencia de Negocio Institucional – Analítica y Visualización", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Tablero de Seguimiento de Servicios", "sol": "Subsecretaria Técnica", "obs": "", "comp": "Media", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 18, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Transferencias", "ejeE": "Datos - Misional", "pri": "Alta", "cod": "iTIC-01", "plan": "Implementación TIC - Transferencias Monetarias (IMG)", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Edward Heiler Giraldo Carvajal", "fi": "16-Oct-25", "ff": "30-Apr-26", "qi": "2025-Q4", "qf": "", "av": "5%", "est": "Levantamiento", "estRaw": "1 - Levantamiento", "fr": "Disposición de Fuentes - Listados IMG", "sol": "IMG", "obs": "", "comp": "Alta", "rad": "", "qS": 4, "q": [4], "rec": 0, "dur": 196},
{"id": 19, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Transferencias", "ejeE": "Datos - Misional", "pri": "Media", "cod": "iTIC-01", "plan": "Implementación TIC - Transferencias Monetarias (IMG)", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Diego Alfonso Pedroza Castro", "fi": "16-Oct-25", "ff": "15-May-26", "qi": "2025-Q4", "qf": "", "av": "11%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "Listado de Transferencias Condicionadas de Educación e Infancia  - V2.0 - Fuente Paga diarios - Maestra de Personas (FA)", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 4, "q": [4], "rec": 0, "dur": 211},
{"id": 20, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Transferencias - Discapacidad", "ejeE": "Datos - Misional", "pri": "Baja", "cod": "iTIC-01", "plan": "Implementación TIC - Transferencias Monetarias (IMG)", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Diego Alfonso Pedroza Castro", "fi": "16-Oct-25", "ff": "15-May-26", "qi": "2025-Q4", "qf": "", "av": "11%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "Listado Servicio Transferencias para Personas con Discapacidad (IMG-CV)", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": 4, "q": [4], "rec": 0, "dur": 211},
{"id": 21, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Transferencias", "ejeE": "Datos - Misional", "pri": "Baja", "cod": "iTIC-01", "plan": "Implementación TIC - Transferencias Monetarias (IMG)", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Diego Alfonso Pedroza Castro", "fi": "16-Oct-25", "ff": "15-May-26", "qi": "2025-Q4", "qf": "", "av": "11%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "Listado Servicio Transferencias Monetarias No Condicionadas  componente pobreza extrema (IMG-CV)", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": 4, "q": [4], "rec": 0, "dur": 211},
{"id": 22, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Transferencias", "ejeE": "Datos - Misional", "pri": "Baja", "cod": "iTIC-01", "plan": "Implementación TIC - Transferencias Monetarias (IMG)", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Diego Alfonso Pedroza Castro", "fi": "16-Oct-25", "ff": "15-May-26", "qi": "2025-Q4", "qf": "", "av": "11%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "Listado Servicio Transferencias Monetarias Persona Mayor (IMG-CV)", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": 4, "q": [4], "rec": 0, "dur": 211},
{"id": 23, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Transferencias", "ejeE": "Datos - Misional", "pri": "Baja", "cod": "iTIC-01", "plan": "Implementación TIC - Transferencias Monetarias (IMG)", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Diego Alfonso Pedroza Castro", "fi": "16-Oct-25", "ff": "15-May-26", "qi": "2025-Q4", "qf": "", "av": "11%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "Listado Servicio Pasajes Gratis (IMG-CV)", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": 4, "q": [4], "rec": 0, "dur": 211},
{"id": 24, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Transferencias", "ejeE": "Datos - Misional", "pri": "Baja", "cod": "iTIC-01", "plan": "Implementación TIC - Transferencias Monetarias (IMG)", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Diego Alfonso Pedroza Castro", "fi": "16-Oct-25", "ff": "15-May-26", "qi": "2025-Q4", "qf": "", "av": "11%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "Listado Servicio Hogares Étnicos Víctimas Del Conflicto JAIDRUA (IMG-CV)", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": 4, "q": [4], "rec": 0, "dur": 211},
{"id": 25, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Transferencias", "ejeE": "SIIx & Apps - SIM", "pri": "Media", "cod": "iTIC-01", "plan": "Implementación TIC - Transferencias Monetarias (IMG)", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Integración Sistema Misional (SIRBE Web) - SIGLO (IMG) - Datos - Listados", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 26, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Transferencias", "ejeE": "SIIx & Apps - AZDigital", "pri": "Media", "cod": "iTIC-01", "plan": "Implementación TIC - Transferencias Monetarias (IMG)", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Integración IMG - AZDigital", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 27, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Transferencias", "ejeE": "SIIx & Apps - SEVEN & KACTUS", "pri": "Baja", "cod": "iTIC-01", "plan": "Implementación TIC - Transferencias Monetarias (IMG)", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Analistas SEVEN", "fi": "2-Mar-26", "ff": "30-Mar-26", "qi": "2026-Q1", "qf": "2026-Q1", "av": "Descartado", "est": "Descartado", "estRaw": "99 - Descartado", "fr": "Requisiciones Transferencias Monetarias", "sol": "", "obs": "23-Abr-2026: Se debe socializar con IOV, y posteriormente con IMG", "comp": "Baja", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 28},
{"id": 28, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Poblacional - Infancia", "ejeE": "Datos - Misional", "pri": "Alta", "cod": "iTIC-02", "plan": "Implementación TIC - Infancia", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Wilson David Gallo Sandoval", "fi": "18-Feb-26", "ff": "7-May-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "95%", "est": "Pruebas Funcionales", "estRaw": "6 - Pruebas Funcionales", "fr": "Tablero de Control de Cobertura", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 78},
{"id": 29, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Poblacional - Infancia", "ejeE": "No determinado", "pri": "No Determinada", "cod": "iTIC-02", "plan": "Implementación TIC - Infancia", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Edward Heiler Giraldo Carvajal", "fi": "18-Feb-26", "ff": "", "qi": "2026-Q1", "qf": "", "av": "5%", "est": "Congelado", "estRaw": "8 - Congelado", "fr": "Instrumento de Autoevaluación de Condiciones de Calidad", "sol": "", "obs": "22-Abr-2026: Esta congelado, ya que el area esta haciendo modificaciones al instrumento", "comp": "No Determinada", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 0},
{"id": 30, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Poblacional - Infancia", "ejeE": "SIIx & Apps - SIM", "pri": "Media", "cod": "iTIC-02", "plan": "Implementación TIC - Infancia", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Juan Fernando Herrera Martinez", "fi": "12-Mar-26", "ff": "8-May-26", "qi": "2026-Q1", "qf": "", "av": "5%", "est": "Levantamiento", "estRaw": "1 - Levantamiento", "fr": "Funcionalidad de Asistencias -> SIM", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 57},
{"id": 31, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Poblacional - Infancia", "ejeE": "SIIx & Apps - Business Apps", "pri": "No Determinada", "cod": "iTIC-02", "plan": "Implementación TIC - Infancia", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Raul Eduardo Gonzalez Leon", "fi": "6-Mar-26", "ff": "6-Mar-26", "qi": "2026-Q1", "qf": "2026-Q1", "av": "Descartado", "est": "Descartado", "estRaw": "99 - Descartado", "fr": "Matriz de Interrupción de Servicios", "sol": "Se hace por Asistencias SIRBE WEB", "obs": "", "comp": "No Determinada", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 0},
{"id": 32, "eje": "A. Eje Estratégico (Misional)", "area": "Subsecretaria Técnica", "ejeE": "SIIx & Apps - Business Apps", "pri": "Media", "cod": "iTIC-02", "plan": "Implementación TIC - Infancia", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Juan Fernando Herrera Martinez", "fi": "23-Apr-26", "ff": "8-May-26", "qi": "2026-Q2", "qf": "", "av": "5%", "est": "Levantamiento", "estRaw": "1 - Levantamiento", "fr": "Escalamiento datos de conceptos sanitarios.", "sol": "Subsecretaria Técnica", "obs": "", "comp": "Alta", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 15},
{"id": 33, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Poblacional - Infancia", "ejeE": "No determinado", "pri": "No Determinada", "cod": "iTIC-02", "plan": "Implementación TIC - Infancia", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Giovanni Alexander Baron Mejia", "fi": "3-Mar-26", "ff": "30-Apr-26", "qi": "2026-Q1", "qf": "", "av": "11%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "Herramienta de Situación de la Niñez", "sol": "", "obs": "", "comp": "No Determinada", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 58},
{"id": 34, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Poblacional - Infancia", "ejeE": "No determinado", "pri": "No Determinada", "cod": "iTIC-02", "plan": "Implementación TIC - Infancia", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Giovanni Alexander Baron Mejia", "fi": "3-Mar-26", "ff": "30-Apr-26", "qi": "2026-Q1", "qf": "", "av": "11%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "Aplicación para administración de suministros e insumos", "sol": "", "obs": "22-Abr-2026: El area no tiene claro el requerimiento (Alerta)", "comp": "No Determinada", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 58},
{"id": 35, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Poblacional - Infancia", "ejeE": "SIIx & Apps - SIM", "pri": "No Determinada", "cod": "iTIC-02", "plan": "Implementación TIC - Infancia", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Matrices PVD y Estrategia Cero Tolerancia a las Violencias", "sol": "", "obs": "", "comp": "No Determinada", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 36, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Poblacional - Infancia", "ejeE": "Datos - Misional", "pri": "No Determinada", "cod": "iTIC-02", "plan": "Implementación TIC - Infancia", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Perfiles de Localidades con Mapa Social", "sol": "", "obs": "", "comp": "No Determinada", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 37, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Poblacional - Infancia", "ejeE": "SIIx & Apps - SIM", "pri": "No Determinada", "cod": "iTIC-02", "plan": "Implementación TIC - Infancia", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Seguimiento a Procesos de Fortalecimiento", "sol": "", "obs": "", "comp": "No Determinada", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 38, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Poblacional - Jóvenes", "ejeE": "Datos - Misional", "pri": "Alta", "cod": "iTIC-03", "plan": "Implementación TIC - Jóvenes con Oportunidades", "resp": "Miguel Angel Quintero Lopez", "ejec": "Diego Alfonso Pedroza Castro", "fi": "2-Jan-26", "ff": "7-May-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "95%", "est": "Pruebas Funcionales", "estRaw": "6 - Pruebas Funcionales", "fr": "Focalización - Jóvenes con Oportunidades", "sol": "", "obs": "22-Abr-2026: Se van a actualizar las fuentes para correr de nuevo el listado, e inclusión de columnas", "comp": "Media", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 125},
{"id": 39, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Poblacional - Jóvenes", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "iTIC-03", "plan": "Implementación TIC - Jóvenes con Oportunidades", "resp": "Miguel Angel Quintero Lopez", "ejec": "Jhon Jairo Gonzalez Melo", "fi": "2-Jan-26", "ff": "13-Feb-26", "qi": "2026-Q1", "qf": "2026-Q1", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Formulario Preinscripción y Formalización Jóvenes con Oportunidades.", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 42},
{"id": 40, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Poblacional - Jóvenes", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "iTIC-03", "plan": "Implementación TIC - Jóvenes con Oportunidades", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Wilmer Gustavo Mogollon Duque", "fi": "2-Mar-26", "ff": "12-Jun-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "22%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Triage Psicosocial", "sol": "", "obs": "22-Abr-2026: Se necesitan las columnas del listado de Jovenes", "comp": "Media", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 102},
{"id": 41, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección Poblacional - Jóvenes", "ejeE": "Datos - Misional", "pri": "Baja", "cod": "iTIC-03", "plan": "Implementación TIC - Jóvenes con Oportunidades", "resp": "Miguel Angel Quintero Lopez", "ejec": "Diego Alejandro Sanchez Bernal", "fi": "16-Oct-25", "ff": "15-May-26", "qi": "2025-Q4", "qf": "", "av": "5%", "est": "Levantamiento", "estRaw": "1 - Levantamiento", "fr": "Listado Servicio Jóvenes con Oportunidades (IMG-CV)", "sol": "", "obs": "22-Abr-2026: Reunion el 23 de abril con Secretaria de Desarrollo Economico para gestión de las fuentes de la misma", "comp": "Alta", "rad": "", "qS": 4, "q": [4], "rec": 0, "dur": 211},
{"id": 42, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección para Inclusión y las Familias - Familia", "ejeE": "SIIx & Apps - SIM", "pri": "Baja", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Edward Heiler Giraldo Carvajal", "fi": "1-Jan-26", "ff": "7-May-26", "qi": "2026-Q1", "qf": "", "av": "5%", "est": "Levantamiento", "estRaw": "1 - Levantamiento", "fr": "Funcionalidad: Interoperabilidad HL7 - SDS - Violencia contra la Mujer", "sol": "Área: Familias - Natalia Martinez", "obs": "", "comp": "Media", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 126},
{"id": 43, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección para Inclusión y las Familias - Familia", "ejeE": "Datos - Misional", "pri": "Alta", "cod": "Datos-03", "plan": "Inteligencia de Negocio Institucional – Analítica y Visualización", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Diego Alejandro Sanchez Bernal", "fi": "13-Apr-26", "ff": "5-Jun-26", "qi": "2026-Q2", "qf": "", "av": "5%", "est": "Levantamiento", "estRaw": "1 - Levantamiento", "fr": "Tablero de Comisarias de Familia", "sol": "Familias", "obs": "", "comp": "Media", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 53},
{"id": 44, "eje": "A. Eje Estratégico (Misional)", "area": "Dirección para Inclusión y las Familias - Familia", "ejeE": "SIIx & Apps - SIM - Otros", "pri": "Media", "cod": "Apps-SIM-04", "plan": "SICOFA - Sistema de Información de Comisarias", "resp": "Juan Pablo Ceballos", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "SICOFA - Sistema de Información de Comisarias", "sol": "", "obs": "", "comp": "No Determinada", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 45, "eje": "A. Eje Estratégico (Misional)", "area": "Subdireccion para la Identificación, Caracterización e Integración", "ejeE": "SIIx & Apps - Business Apps", "pri": "Baja", "cod": "Apps-BApps-01", "plan": "Requerimientos Business Apps", "resp": "Miguel Angel Quintero Lopez", "ejec": "Jhon Jairo Gonzalez Melo", "fi": "16-Apr-26", "ff": "7-May-26", "qi": "2026-Q2", "qf": "2026-Q2", "av": "60%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Formulario Survey 123  - Inclusión Base Pagadiarios", "sol": "Lindsay Benitez (Subdirectora)", "obs": "", "comp": "Baja", "rad": "14.Abr.2026 - I2026011388", "qS": 2, "q": [2], "rec": 0, "dur": 21},
{"id": 46, "eje": "B. Eje de Gestión (Apoyo)", "area": "Subsecretaria de Gestión Institucional", "ejeE": "No determinado", "pri": "Alta", "cod": "iTIC-04", "plan": "Implementación TIC - Vigencias Futuras", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Juan Fernando Herrera Martinez", "fi": "24-Mar-26", "ff": "", "qi": "2026-Q1", "qf": "", "av": "5%", "est": "Congelado", "estRaw": "8 - Congelado", "fr": "Implementación TIC - Vigencias Futuras", "sol": "Área: Subsecretaria de Gestión Institucional, Lina Sanchez", "obs": "23-Abr-2026: Congelado por Subsecretaria Corporativa", "comp": "Alta", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 0},
{"id": 47, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Contratación", "ejeE": "SIIx & Apps - AZDigital", "pri": "Media", "cod": "Apps-AZD-01", "plan": "Contrato: Soporte y Mantenimiento AZDigital", "resp": "Miguel Angel Quintero Lopez", "ejec": "Proveedor: ANALITICA", "fi": "9-Feb-26", "ff": "", "qi": "2026-Q1", "qf": "", "av": "5%", "est": "Congelado", "estRaw": "8 - Congelado", "fr": "Flujo de Contratación - AZDigital", "sol": "Subdirección de Contratación", "obs": "22-Abr-2026: En proceso de revisión de las HUs, por parte del proveedor, falta de definición real por parte de Contratación", "comp": "Alta", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 0},
{"id": 48, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Contratación", "ejeE": "SIIx & Apps - IOPS", "pri": "Media", "cod": "Apps-IOPS-01", "plan": "Requerimientos IOPS (Informe Orden de Prestacion de Servicios)", "resp": "Miguel Angel Quintero Lopez", "ejec": "Jhon Jairo Gonzalez Melo", "fi": "8-Nov-25", "ff": "22-Apr-26", "qi": "2025-Q4", "qf": "2026-Q2", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Reducción de Proyección de Pagos", "sol": "Financiera", "obs": "", "comp": "Media", "rad": "", "qS": 4, "q": [1, 2], "rec": 0, "dur": 165},
{"id": 49, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Contratación", "ejeE": "SIIx & Apps - IOPS", "pri": "Media", "cod": "Apps-IOPS-01", "plan": "Requerimientos IOPS (Informe Orden de Prestacion de Servicios)", "resp": "Miguel Angel Quintero Lopez", "ejec": "Jhon Jairo Gonzalez Melo", "fi": "8-Nov-25", "ff": "22-Apr-26", "qi": "2025-Q4", "qf": "2026-Q2", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Dividir CRP para múltiples fuentes de pago a un contratista - ICBF", "sol": "Financiera", "obs": "", "comp": "Media", "rad": "", "qS": 4, "q": [1, 2], "rec": 0, "dur": 165},
{"id": 50, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Contratación", "ejeE": "SIIx & Apps - IOPS", "pri": "Media", "cod": "Apps-IOPS-01", "plan": "Requerimientos IOPS (Informe Orden de Prestacion de Servicios)", "resp": "Miguel Angel Quintero Lopez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Devolución de Informe de IOPS - Múltiples Opciones", "sol": "Contratación", "obs": "", "comp": "Media", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 51, "eje": "B. Eje de Gestión (Apoyo)", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - IOPS", "pri": "Baja", "cod": "Apps-IOPS-01", "plan": "Requerimientos IOPS (Informe Orden de Prestacion de Servicios)", "resp": "Miguel Angel Quintero Lopez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Optimización Procesamiento de Planillas", "sol": "TeamSIIx - Modernización", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 52, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Plantas Físicas", "ejeE": "SIIx & Apps - Business Apps", "pri": "Alta", "cod": "Apps-SISBS-01", "plan": "Implementación SISBS", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Juan Carlos Pelaez Reyes", "fi": "27-Dec-24", "ff": "27-Mar-26", "qi": "2024-Q4", "qf": "2026-Q1", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Censo Unidades Operativas 1: Soporte a migración y consolidación de datos.", "sol": "Subdirección Plantas Físicas, DADE", "obs": "27-Apr-2026: Laura Lozano esta certificando los datos", "comp": "Media", "rad": "", "qS": 4, "q": [1], "rec": 0, "dur": 455},
{"id": 53, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Plantas Físicas", "ejeE": "SIIx & Apps - Business Apps", "pri": "Alta", "cod": "Apps-SISBS-01", "plan": "Implementación SISBS", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Juan Carlos Pelaez Reyes", "fi": "10-Mar-25", "ff": "7-May-26", "qi": "2025-Q1", "qf": "2026-Q2", "av": "95%", "est": "Pruebas Funcionales", "estRaw": "6 - Pruebas Funcionales", "fr": "Implementación Modulo de Mantenimiento (Pilotos de Uso - Barrios Unidos - Bosa)", "sol": "Subdirección Plantas Físicas", "obs": "", "comp": "Alta", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 423},
{"id": 54, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Plantas Físicas", "ejeE": "SIIx & Apps - Business Apps", "pri": "Media", "cod": "Apps-SISBS-01", "plan": "Implementación SISBS", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Juan Carlos Pelaez Reyes", "fi": "21-Apr-26", "ff": "30-Apr-26", "qi": "2026-Q2", "qf": "2026-Q2", "av": "60%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Carga de Solicitudes Instrumento Antiguo - App Dynamics", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 9},
{"id": 55, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Plantas Físicas", "ejeE": "Datos - Apoyo", "pri": "Baja", "cod": "Apps-SISBS-01", "plan": "Implementación SISBS", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Juan Carlos Pelaez Reyes", "fi": "6-Apr-26", "ff": "7-May-26", "qi": "2026-Q2", "qf": "", "av": "11%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "Tablero de Mantenimiento", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 31},
{"id": 56, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Plantas Físicas", "ejeE": "SIIx & Apps - Business Apps", "pri": "Media", "cod": "Apps-SISBS-01", "plan": "Implementación SISBS", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Juan Carlos Pelaez Reyes", "fi": "17-Jun-25", "ff": "15-Mar-26", "qi": "2025-Q2", "qf": "2026-Q1", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Censo Unidades Operativas 2", "sol": "", "obs": "27-Apr-2026: Memorando de entrega y formalización (30.Abr.2026)", "comp": "Media", "rad": "", "qS": 2, "q": [1], "rec": 0, "dur": 271},
{"id": 57, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Plantas Físicas", "ejeE": "SIIx & Apps - Business Apps", "pri": "Baja", "cod": "Apps-SISBS-01", "plan": "Implementación SISBS", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Implementación Curso de Moodle - SISBS", "sol": "", "obs": "", "comp": "Baja", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 58, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - SAF", "ejeE": "SIIx & Apps - Business Apps", "pri": "Media", "cod": "Apps-BApps-01", "plan": "Requerimientos Business Apps", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Solicitudes de mantenimiento para activos fijos SAF: requerimiento, desarrollo, pruebas, soporte", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 59, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - SAF", "ejeE": "SIIx & Apps - SEVEN & KACTUS", "pri": "Baja", "cod": "Apps-SEVEN-01", "plan": "Requerimientos  ERP SEVEN", "resp": "Martha Cecilia Calderon Castro", "ejec": "Proveedor: DigitalWare", "fi": "2-Feb-26", "ff": "30-Apr-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "85%", "est": "Pruebas Internas", "estRaw": "5 - Pruebas Internas", "fr": "SEVEN - Modificación campos programa contratos", "sol": "Financiera", "obs": "", "comp": "Baja", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 87},
{"id": 60, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - SAF", "ejeE": "SIIx & Apps - SEVEN & KACTUS", "pri": "Baja", "cod": "Apps-SEVEN-01", "plan": "Requerimientos  ERP SEVEN", "resp": "Martha Cecilia Calderon Castro", "ejec": "Analistas SEVEN", "fi": "9-Feb-26", "ff": "31-May-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "85%", "est": "Pruebas Internas", "estRaw": "5 - Pruebas Internas", "fr": "Consulta SGNPLAEX", "sol": "Financiera", "obs": "", "comp": "Baja", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 111},
{"id": 61, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - SAF", "ejeE": "SIIx & Apps - SEVEN & KACTUS", "pri": "Baja", "cod": "Apps-SEVEN-01", "plan": "Requerimientos  ERP SEVEN", "resp": "Martha Cecilia Calderon Castro", "ejec": "Martha Elizabeth Tovar Peña", "fi": "2-Jan-26", "ff": "27-Feb-26", "qi": "2026-Q1", "qf": "2026-Q1", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Dependientes Medios magnéticos", "sol": "Financiera", "obs": "", "comp": "Baja", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 56},
{"id": 62, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - SAF", "ejeE": "SIIx & Apps - SEVEN & KACTUS", "pri": "Baja", "cod": "Apps-SEVEN-01", "plan": "Requerimientos  ERP SEVEN", "resp": "Martha Cecilia Calderon Castro", "ejec": "Analistas SEVEN", "fi": "4-Jan-26", "ff": "30-Dec-26", "qi": "2026-Q1", "qf": "2026-Q4", "av": "Recurrente", "est": "Recurrente", "estRaw": "R - Recurrente", "fr": "Transferencia de Cocimiento y Apropiación SEVEN", "sol": "", "obs": "", "comp": "Baja", "rad": "", "qS": 1, "q": [1, 2, 3, 4], "rec": 1, "dur": 360},
{"id": 63, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - SAF", "ejeE": "SIIx & Apps - SEVEN & KACTUS", "pri": "Baja", "cod": "Apps-SEVEN-01", "plan": "Requerimientos  ERP SEVEN", "resp": "Martha Cecilia Calderon Castro", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Certificación de Ingresos - Financiera", "sol": "Financiera", "obs": "", "comp": "Media", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 64, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - SAF", "ejeE": "SIIx & Apps - AZDigital", "pri": "Media", "cod": "Apps-AZD-01", "plan": "Contrato: Soporte y Mantenimiento AZDigital", "resp": "Miguel Angel Quintero Lopez", "ejec": "Proveedor: ANALITICA", "fi": "12-Apr-25", "ff": "31-Dec-27", "qi": "2025-Q2", "qf": "2027-Q4", "av": "14%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Transferencia de Conocimiento AZ-Digital", "sol": "", "obs": "", "comp": "Baja", "rad": "", "qS": 2, "q": [1, 2, 3, 4], "rec": 0, "dur": 993},
{"id": 65, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Talento Humano", "ejeE": "SIIx & Apps - SEVEN & KACTUS", "pri": "Media", "cod": "Apps-Kactus-01", "plan": "Requerimientos  HH.RR KACTUS", "resp": "Martha Cecilia Calderon Castro", "ejec": "Martha Elizabeth Tovar Peña", "fi": "16-Feb-26", "ff": "15-May-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "60%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Interfaces Kactus/Seven  (Presupuesto, Cuentas por Pagar y Contabilidad)", "sol": "Talento Humano", "obs": "", "comp": "Alta", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 88},
{"id": 66, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Talento Humano", "ejeE": "SIIx & Apps - SEVEN & KACTUS", "pri": "Baja", "cod": "Apps-Kactus-01", "plan": "Requerimientos  HH.RR KACTUS", "resp": "Martha Cecilia Calderon Castro", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Planta de Personal", "sol": "Talento Humano", "obs": "", "comp": "Media", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 67, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Talento Humano", "ejeE": "SIIx & Apps - SEVEN & KACTUS", "pri": "Baja", "cod": "Apps-Kactus-01", "plan": "Requerimientos  HH.RR KACTUS", "resp": "Martha Cecilia Calderon Castro", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Permisos y Vacaciones", "sol": "Talento Humano", "obs": "", "comp": "Media", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 68, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Talento Humano", "ejeE": "SIIx & Apps - SEVEN & KACTUS", "pri": "Media", "cod": "Apps-Kactus-01", "plan": "Requerimientos  HH.RR KACTUS", "resp": "Martha Cecilia Calderon Castro", "ejec": "Martha Elizabeth Tovar Peña", "fi": "16-Jan-26", "ff": "17-Apr-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Ajustes y parametrización de Reportes de Nómina", "sol": "Talento Humano", "obs": "", "comp": "Alta", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 91},
{"id": 69, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Talento Humano", "ejeE": "SIIx & Apps - SEVEN & KACTUS", "pri": "Media", "cod": "Apps-Kactus-01", "plan": "Requerimientos  HH.RR KACTUS", "resp": "Martha Cecilia Calderon Castro", "ejec": "Martha Elizabeth Tovar Peña", "fi": "1-Apr-26", "ff": "30-Apr-26", "qi": "2026-Q2", "qf": "2026-Q2", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Reportes de Seguridad Social", "sol": "Talento Humano", "obs": "", "comp": "Alta", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 29},
{"id": 70, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Gestión Corporativa - Talento Humano", "ejeE": "SIIx & Apps - SEVEN & KACTUS", "pri": "Baja", "cod": "Apps-Kactus-01", "plan": "Requerimientos  HH.RR KACTUS", "resp": "Martha Cecilia Calderon Castro", "ejec": "Martha Elizabeth Tovar Peña", "fi": "4-Jan-26", "ff": "31-Dec-26", "qi": "2026-Q1", "qf": "2026-Q4", "av": "Recurrente", "est": "Recurrente", "estRaw": "R - Recurrente", "fr": "Transferencia de Cocimiento y Apropiación KACTUS", "sol": "Talento Humano", "obs": "", "comp": "Baja", "rad": "", "qS": 1, "q": [1, 2, 3, 4], "rec": 1, "dur": 361},
{"id": 71, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "SIIx & Apps - Business Apps", "pri": "Media", "cod": "Apps-BApps-01", "plan": "Requerimientos Business Apps", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Raul Eduardo Gonzalez Leon", "fi": "17-Jun-25", "ff": "30-Mar-26", "qi": "2025-Q2", "qf": "2026-Q1", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Continuidad de negocio: prueba piloto, uso funcional 100%.", "sol": "", "obs": "", "comp": "Baja", "rad": "", "qS": 2, "q": [1], "rec": 0, "dur": 286},
{"id": 72, "eje": "B. Eje de Gestión (Apoyo)", "area": "Dirección de Análisis y Diseño Estratégico - SDES", "ejeE": "SIIx & Apps - Business Apps", "pri": "Media", "cod": "Apps-BApps-01", "plan": "Requerimientos Business Apps", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Juan Carlos Pelaez Reyes", "fi": "20-Apr-26", "ff": "7-May-26", "qi": "2026-Q2", "qf": "", "av": "11%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "Automatización directorio unidades operativas: requerimiento, desarrollo, pruebas, soporte.", "sol": "Subdirección Técnica, DADE, SAF", "obs": "", "comp": "Alta", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 17},
{"id": 73, "eje": "C. Arquitectura Empresarial - Procesos", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "SIIx & Apps - SIM", "pri": "Media", "cod": "AE-01", "plan": "Armonización Plan de Desarrollo", "resp": "Liliana Borda Parra", "ejec": "Analistas SIRBE", "fi": "1-Apr-25", "ff": "15-May-26", "qi": "2025-Q2", "qf": "2026-Q2", "av": "60%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Armonización - Revisión Bitácoras", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": 2, "q": [1, 2], "rec": 0, "dur": 409},
{"id": 74, "eje": "C. Arquitectura Empresarial - Procesos", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "SIIx & Apps - SIM", "pri": "Media", "cod": "AE-01", "plan": "Armonización Plan de Desarrollo", "resp": "Liliana Borda Parra", "ejec": "Analistas SIRBE", "fi": "1-Oct-25", "ff": "30-May-26", "qi": "2025-Q4", "qf": "2026-Q2", "av": "60%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Armonización - Parametrización", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": 4, "q": [1, 2], "rec": 0, "dur": 241},
{"id": 75, "eje": "C. Arquitectura Empresarial - Procesos", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Arquitectura Empresarial", "pri": "Media", "cod": "AE-02", "plan": "Arquitectura Empresarial - Vigencia 2025", "resp": "Giovanni Alexander Baron Mejia", "ejec": "Raul Eduardo Gonzalez Leon", "fi": "15-Jun-26", "ff": "30-Jul-26", "qi": "2026-Q2", "qf": "2026-Q3", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "iVolucion - Validación Matriz de Recomendaciones Arquitectura Empresarial - Componentes no identificados", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 2, "q": [2, 3], "rec": 0, "dur": 45},
{"id": 76, "eje": "C. Arquitectura Empresarial - Procesos", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Arquitectura Empresarial", "pri": "Media", "cod": "AE-02", "plan": "Arquitectura Empresarial - Vigencia 2025", "resp": "Giovanni Alexander Baron Mejia", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "iVolucion - Implementación Matriz de Recomendaciones Arquitectura Empresarial", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 77, "eje": "C. Arquitectura Empresarial - Procesos", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Arquitectura Empresarial", "pri": "Media", "cod": "AE-02", "plan": "Arquitectura Empresarial - Vigencia 2025", "resp": "Giovanni Alexander Baron Mejia", "ejec": "Raul Eduardo Gonzalez Leon", "fi": "15-Jun-26", "ff": "15-Sep-26", "qi": "2026-Q2", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "iVolucion - Analisis de Formularios e Instrumentos de Recolección de Datos", "sol": "Arquitectura Empresarial (iVolucion)", "obs": "", "comp": "Baja", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 92},
{"id": 78, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Fabrica de Datos", "pri": "Media", "cod": "Datos-01", "plan": "Recepción y automatización de fuentes de datos", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Edward Heiler Giraldo Carvajal", "fi": "13-Feb-26", "ff": "30-Nov-26", "qi": "2026-Q1", "qf": "2026-Q4", "av": "Recurrente", "est": "Recurrente", "estRaw": "R - Recurrente", "fr": "Matriz de Proveedores y Fuentes", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 1, "q": [1, 2, 3, 4], "rec": 1, "dur": 290},
{"id": 79, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Fabrica de Datos", "pri": "Media", "cod": "Datos-01", "plan": "Recepción y automatización de fuentes de datos", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Edward Heiler Giraldo Carvajal", "fi": "4-Mar-26", "ff": "10-Mar-26", "qi": "2026-Q1", "qf": "2026-Q1", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Diagnostico de Proveedores vs Automatización", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 6},
{"id": 80, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Fabrica de Datos", "pri": "Media", "cod": "Datos-01", "plan": "Recepción y automatización de fuentes de datos", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Edward Heiler Giraldo Carvajal", "fi": "3-Mar-26", "ff": "15-May-26", "qi": "2026-Q1", "qf": "", "av": "11%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "Automatización de Proveedores - Fuentes", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 73},
{"id": 81, "eje": "D. Gestión de Datos e Información", "area": "Dirección Territorial", "ejeE": "Datos - Fabrica de Datos", "pri": "Media", "cod": "Datos-01", "plan": "Recepción y automatización de fuentes de datos", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Diego Alejandro Sanchez Bernal", "fi": "15-Apr-26", "ff": "29-May-26", "qi": "2026-Q2", "qf": "", "av": "2%", "est": "Levantamiento", "estRaw": "1 - Levantamiento", "fr": "Consumo Datos API IDIGER", "sol": "Área: Dirección Territorial, Sandra Orozco", "obs": "", "comp": "Media", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 44},
{"id": 82, "eje": "D. Gestión de Datos e Información", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Datos - Misional", "pri": "Media", "cod": "Datos-02", "plan": "Plan de Implementación Listados", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Diego Alfonso Pedroza Castro", "fi": "2-Jan-26", "ff": "7-May-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "81%", "est": "Pruebas Internas", "estRaw": "5 - Pruebas Internas", "fr": "Focalización - Comunidad de Cuidado", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 125},
{"id": 83, "eje": "D. Gestión de Datos e Información", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Datos - Misional", "pri": "Media", "cod": "Datos-02", "plan": "Plan de Implementación Listados", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Diego Alfonso Pedroza Castro", "fi": "23-Mar-26", "ff": "29-May-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "81%", "est": "Pruebas Internas", "estRaw": "5 - Pruebas Internas", "fr": "Focalización - Compromiso por una Alimentación Incluyente", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 67},
{"id": 84, "eje": "D. Gestión de Datos e Información", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Datos - Misional", "pri": "Media", "cod": "Datos-02", "plan": "Plan de Implementación Listados", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Nelson David Barriga Castellanos", "fi": "2-Mar-26", "ff": "29-May-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "81%", "est": "Pruebas Internas", "estRaw": "5 - Pruebas Internas", "fr": "Focalización - Atención sociosanitaria para personas mayores", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 88},
{"id": 85, "eje": "D. Gestión de Datos e Información", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Datos - Misional", "pri": "Media", "cod": "Datos-02", "plan": "Plan de Implementación Listados", "resp": "Diego Alfonso Pedroza Castro", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Focalización - Unidades habitacionales", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 86, "eje": "D. Gestión de Datos e Información", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Datos - Misional", "pri": "Media", "cod": "Datos-02", "plan": "Plan de Implementación Listados", "resp": "Diego Alfonso Pedroza Castro", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Focalización - Centro integrarte atención externa", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 87, "eje": "D. Gestión de Datos e Información", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Datos - Misional", "pri": "Media", "cod": "Datos-02", "plan": "Plan de Implementación Listados", "resp": "Diego Alfonso Pedroza Castro", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Focalización - Centro integrarte atención interna", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 88, "eje": "D. Gestión de Datos e Información", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "Datos - Misional", "pri": "Media", "cod": "Datos-02", "plan": "Plan de Implementación Listados", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Diego Alejandro Sanchez Bernal", "fi": "27-Apr-26", "ff": "8-May-26", "qi": "2026-Q2", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Focalización - Discapacidad V2.0 - Maestra de Personas (FA)", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 11},
{"id": 89, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Misional", "pri": "Alta", "cod": "Datos-04", "plan": "Desarrollo e Implementación Tablas Maestras (Fabric)", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Diego Alfonso Pedroza Castro", "fi": "1-Oct-25", "ff": "10-Feb-26", "qi": "2025-Q4", "qf": "2026-Q1", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Maestra de Personas", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": 4, "q": [1], "rec": 0, "dur": 132},
{"id": 90, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Misional", "pri": "Alta", "cod": "Datos-04", "plan": "Desarrollo e Implementación Tablas Maestras (Fabric)", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Diego Alfonso Pedroza Castro", "fi": "23-Mar-26", "ff": "29-May-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "50%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Maestra de Personas - V1.1", "sol": "", "obs": "22-Abr-2026: Inclusión de nuevas columnas, y actualización de variables que llegan de Sociodemografica y Ubicación", "comp": "Alta", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 67},
{"id": 91, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Misional", "pri": "Alta", "cod": "Datos-04", "plan": "Desarrollo e Implementación Tablas Maestras (Fabric)", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Diego Alfonso Pedroza Castro", "fi": "2-Jan-26", "ff": "15-May-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "60%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Maestra PUA (Persona Única Atendida) - V1.0", "sol": "", "obs": "22-Abr-2026: Problemas en columnas inexistentes bajo el levantamiento Inicial", "comp": "Alta", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 133},
{"id": 92, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Misional", "pri": "Alta", "cod": "Datos-04", "plan": "Desarrollo e Implementación Tablas Maestras (Fabric)", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Edward Heiler Giraldo Carvajal", "fi": "1-Feb-26", "ff": "7-May-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "60%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Maestra de variables sociodemográficas", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 95},
{"id": 93, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Misional", "pri": "Alta", "cod": "Datos-04", "plan": "Desarrollo e Implementación Tablas Maestras (Fabric)", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Edward Heiler Giraldo Carvajal", "fi": "9-Mar-26", "ff": "14-May-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "40%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Maestra de ubicación y contacto", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 66},
{"id": 94, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Misional", "pri": "Alta", "cod": "Datos-04", "plan": "Desarrollo e Implementación Tablas Maestras (Fabric)", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Edward Heiler Giraldo Carvajal", "fi": "2-Mar-26", "ff": "15-May-26", "qi": "2026-Q1", "qf": "", "av": "11%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "Maestra de grupos (familias)", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 74},
{"id": 95, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Misional", "pri": "Alta", "cod": "Datos-04", "plan": "Desarrollo e Implementación Tablas Maestras (Fabric)", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Edward Heiler Giraldo Carvajal", "fi": "2-Mar-26", "ff": "", "qi": "2026-Q1", "qf": "", "av": "5%", "est": "Congelado", "estRaw": "8 - Congelado", "fr": "Maestra de actuaciones", "sol": "", "obs": "23-Abr-2026: Congelado por disponibilidad de recurso humano", "comp": "Alta", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 0},
{"id": 96, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Misional", "pri": "Alta", "cod": "Datos-04", "plan": "Desarrollo e Implementación Tablas Maestras (Fabric)", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Edward Heiler Giraldo Carvajal", "fi": "2-Mar-26", "ff": "", "qi": "2026-Q1", "qf": "", "av": "5%", "est": "Congelado", "estRaw": "8 - Congelado", "fr": "Maestra de alertas", "sol": "", "obs": "23-Abr-2026: Congelado por disponibilidad de recurso humano", "comp": "Alta", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 0},
{"id": 97, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Fabrica de Datos", "pri": "Media", "cod": "Datos-03", "plan": "Inteligencia de Negocio Institucional – Analítica y Visualización", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Diego Alfonso Pedroza Castro", "fi": "2-Mar-26", "ff": "22-May-26", "qi": "2026-Q1", "qf": "", "av": "15%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "Gobernanza y Arquitectura (Tableros y Dominios)", "sol": "Transversal", "obs": "", "comp": "Media", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 81},
{"id": 98, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Fabrica de Datos", "pri": "Media", "cod": "Datos-03", "plan": "Inteligencia de Negocio Institucional – Analítica y Visualización", "resp": "Raul Eduardo Gonzalez Leon", "ejec": "Diego Alfonso Pedroza Castro", "fi": "29-Apr-26", "ff": "20-May-26", "qi": "2026-Q2", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Tableros Institucionales - Misionales", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 21},
{"id": 99, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Fabrica de Datos", "pri": "Media", "cod": "Datos-06", "plan": "Gobernanza de Datos - PurView", "resp": "Diego Alfonso Pedroza Castro", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Arquitectura y Gobierno de datos: Roles - Configuración - Permisos", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 100, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Fabrica de Datos", "pri": "Media", "cod": "Datos-05", "plan": "Uso y Apropiación Fabrica de Datos - MS Fabric", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Diego Alfonso Pedroza Castro", "fi": "2-Feb-26", "ff": "30-Apr-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Uso y apropiación MS-Fabric gestión de conocimiento (GESCO)", "sol": "", "obs": "", "comp": "Baja", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 87},
{"id": 101, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Fabrica de Datos", "pri": "Media", "cod": "Datos-05", "plan": "Uso y Apropiación Fabrica de Datos - MS Fabric", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Diego Alfonso Pedroza Castro", "fi": "2-Feb-26", "ff": "30-Apr-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Uso y apropiación MS-Fabric procesamiento de datos (SDES-Procesamiento)", "sol": "", "obs": "", "comp": "Baja", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 87},
{"id": 102, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Fabrica de Datos", "pri": "Media", "cod": "Datos-05", "plan": "Uso y Apropiación Fabrica de Datos - MS Fabric", "resp": "Diego Alfonso Pedroza Castro", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Uso y apropiación MS-Fabric IMG", "sol": "", "obs": "", "comp": "Baja", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 103, "eje": "D. Gestión de Datos e Información", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "Datos - Fabrica de Datos", "pri": "Media", "cod": "Datos-05", "plan": "Uso y Apropiación Fabrica de Datos - MS Fabric", "resp": "Diego Alfonso Pedroza Castro", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Soporte y Autogestión de Datos - Fuentes - Tablas - Fabric (Funcionales)", "sol": "", "obs": "", "comp": "Baja", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 104, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - Interoperabilidad", "pri": "Media", "cod": "Apps-01", "plan": "Implementación API Management - Interoperabilidad", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Daniel Enrique Paez Puentes", "fi": "6-Apr-26", "ff": "30-Aug-26", "qi": "2026-Q2", "qf": "2026-Q3", "av": "30%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Implementación API Management Azure - Interoperabilidad", "sol": "TeamSIIx - Modernización", "obs": "", "comp": "Media", "rad": "", "qS": 2, "q": [2, 3], "rec": 0, "dur": 146},
{"id": 105, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - Interoperabilidad", "pri": "Media", "cod": "Apps-01", "plan": "Implementación API Management - Interoperabilidad", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Marisol Ferro Lopez", "fi": "2-Mar-26", "ff": "30-Apr-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "API - Maestra de Personas", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 59},
{"id": 106, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - Interoperabilidad", "pri": "Media", "cod": "Apps-01", "plan": "Implementación API Management - Interoperabilidad", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "API - Maestra de variables sociodemográficas", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 107, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - Interoperabilidad", "pri": "Media", "cod": "Apps-01", "plan": "Implementación API Management - Interoperabilidad", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "API - Maestra de ubicación y contacto", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 108, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - Interoperabilidad", "pri": "Media", "cod": "Apps-01", "plan": "Implementación API Management - Interoperabilidad", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "API - Maestra de grupos (familias)", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 109, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - Interoperabilidad", "pri": "Media", "cod": "Apps-01", "plan": "Implementación API Management - Interoperabilidad", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "API - Maestra de actuaciones", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 110, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - Interoperabilidad", "pri": "Media", "cod": "Apps-01", "plan": "Implementación API Management - Interoperabilidad", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "API - Maestra de alertas", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 111, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - Interoperabilidad", "pri": "Alta", "cod": "Apps-01", "plan": "Implementación API Management - Interoperabilidad", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Jhon Jairo Gonzalez Melo", "fi": "10-Apr-26", "ff": "7-May-26", "qi": "2026-Q2", "qf": "", "av": "15%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "API - Tramites - Focalización - Disposición a Secretaria General", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 27},
{"id": 112, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Nelson David Barriga Castellanos", "fi": "27-Apr-26", "ff": "7-May-26", "qi": "2026-Q2", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Cierre Fase 1 - Modernización SIRBE", "sol": "TeamSIIx - Modernización", "obs": "", "comp": "Alta", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 10},
{"id": 113, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Daniel Enrique Paez Puentes", "fi": "15-Jul-25", "ff": "13-Mar-26", "qi": "2025-Q3", "qf": "2026-Q1", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Implementación Modulo de Cursos", "sol": "TeamSIIx - Modernización", "obs": "", "comp": "Alta", "rad": "", "qS": 3, "q": [1], "rec": 0, "dur": 241},
{"id": 114, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "SIIx & Apps - SIM", "pri": "Media", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Edwin Molano Suarez", "fi": "14-Jan-26", "ff": "30-Apr-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "95%", "est": "Pruebas Funcionales", "estRaw": "6 - Pruebas Funcionales", "fr": "Funcionalidad: Consulta Ciudadano - Focalización", "sol": "DADE - Ivan Osejo", "obs": "", "comp": "Baja", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 106},
{"id": 115, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "John Morales Chaguala", "fi": "9-Oct-25", "ff": "30-Apr-26", "qi": "2025-Q4", "qf": "2026-Q2", "av": "95%", "est": "Pruebas Funcionales", "estRaw": "6 - Pruebas Funcionales", "fr": "Funcionalidad: Criterios de Egreso", "sol": "DADE - Ivan Osejo", "obs": "", "comp": "Media", "rad": "", "qS": 4, "q": [1, 2], "rec": 0, "dur": 203},
{"id": 116, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Wilmer Gustavo Mogollon Duque", "fi": "9-Oct-25", "ff": "11-Mar-26", "qi": "2025-Q4", "qf": "2026-Q1", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Funcionalidad: Pertenencia Étnica", "sol": "DADE - Ivan Osejo", "obs": "", "comp": "Media", "rad": "", "qS": 4, "q": [1], "rec": 0, "dur": 153},
{"id": 117, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Media", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Nelson David Barriga Castellanos", "fi": "3-Mar-26", "ff": "30-Apr-26", "qi": "2026-Q1", "qf": "2026-Q2", "av": "60%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Mejora SIRBE XXI - Parametrización para SIRBE Web", "sol": "TeamSIIx - Modernización", "obs": "", "comp": "Media", "rad": "", "qS": 1, "q": [1, 2], "rec": 0, "dur": 58},
{"id": 118, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Media", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Nelson David Barriga Castellanos", "fi": "15-Jan-26", "ff": "", "qi": "2026-Q1", "qf": "", "av": "40%", "est": "Congelado", "estRaw": "8 - Congelado", "fr": "Mejora SIRBE XXI - Roles para SIRBE Web", "sol": "TeamSIIx - Modernización", "obs": "23-Abr-2026: Congelado por disponibilidad de recurso humano", "comp": "Media", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 0},
{"id": 119, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Media", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Daniel Enrique Paez Puentes", "fi": "10-Nov-25", "ff": "14-May-26", "qi": "2025-Q4", "qf": "2026-Q2", "av": "81%", "est": "Pruebas Internas", "estRaw": "5 - Pruebas Internas", "fr": "Mejora Modulo: Asistencias - Anulación y Modificación", "sol": "TeamSIIx - Modernización", "obs": "", "comp": "Media", "rad": "", "qS": 4, "q": [1, 2], "rec": 0, "dur": 185},
{"id": 120, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Miguel Angel Torres Rodriguez", "fi": "19-Feb-26", "ff": "15-May-26", "qi": "2026-Q1", "qf": "", "av": "15%", "est": "Análisis y Diseño", "estRaw": "2 - Analisis, Diseño y Estimación", "fr": "Funcionalidad SIM: Seguimiento", "sol": "Arquitectura Empresarial (iVolucion)", "obs": "", "comp": "Alta", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 85},
{"id": 121, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "SIIx & Apps - SIM", "pri": "Media", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Diego Alfonso Pedroza Castro", "ejec": "Edward Heiler Giraldo Carvajal", "fi": "6-Apr-26", "ff": "21-May-26", "qi": "2026-Q2", "qf": "2026-Q2", "av": "30%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Disposición de Fuentes y Datos de Contactabilidad para Conexión Social (WS GESCO)", "sol": "Ivan Osejo (Director)", "obs": "23-Abr-2026: Finaliza con la disposicion de la maestra de Ubicacion y Contacto", "comp": "Media", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 45},
{"id": 122, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "SIIx & Apps - SIM", "pri": "Media", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Martha Ines Lizarazo Torres", "ejec": "Carlos Manuel Garcia Rendon", "fi": "9-Mar-26", "ff": "14-May-26", "qi": "2026-Q1", "qf": "", "av": "9%", "est": "Levantamiento", "estRaw": "1 - Levantamiento", "fr": "Parametrización y Consulta: Nuevo Servicio -> Conexión Social", "sol": "Ivan Osejo (Director)", "obs": "", "comp": "Media", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 66},
{"id": 123, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "SIIx & Apps - SIM", "pri": "Media", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Martha Ines Lizarazo Torres", "ejec": "Jhon Jairo Gonzalez Melo", "fi": "21-Apr-26", "ff": "30-Apr-26", "qi": "2026-Q2", "qf": "", "av": "5%", "est": "Levantamiento", "estRaw": "1 - Levantamiento", "fr": "Formulario Preinscripción y Formalización Conexión Social", "sol": "Ivan Osejo (Director)", "obs": "", "comp": "Media", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 9},
{"id": 124, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subsecretaria Técnica", "ejeE": "SIIx & Apps - SIM", "pri": "Baja", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Jorge Andres Alvarado Gomez", "fi": "22-Oct-25", "ff": "1-Apr-26", "qi": "2025-Q4", "qf": "", "av": "20%", "est": "Cola", "estRaw": "3 - Cola", "fr": "Funcionalidad: Formato de Corresponsabilidad", "sol": "Subsecretaria - Manuel Barros", "obs": "23-Abr-2026: En cola ya que el desarrollador esta en prioridad de Ventanilla", "comp": "No Determinada", "rad": "", "qS": 4, "q": [4], "rec": 0, "dur": 161},
{"id": 125, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Media", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Mejora Técnica: Carga de elementos en CDN para mejorar velocidad de carga datos", "sol": "TeamSIIx - Modernización", "obs": "", "comp": "Media", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 126, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Baja", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Funcionalidad: Cruces de Datos", "sol": "Arquitectura Empresarial (iVolucion)", "obs": "", "comp": "Media", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 127, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Dirección para Inclusión y las Familias - Discapacidad", "ejeE": "SIIx & Apps - SIM", "pri": "Baja", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Juan Fernando Herrera Martinez", "fi": "11-Nov-25", "ff": "7-May-26", "qi": "2025-Q4", "qf": "", "av": "5%", "est": "Levantamiento", "estRaw": "1 - Levantamiento", "fr": "Mejora Modulo Consultas: Campos para cruce actuaciones de Intervención", "sol": "Discapacidad - Marcela Cubides", "obs": "", "comp": "Baja", "rad": "", "qS": 4, "q": [4], "rec": 0, "dur": 177},
{"id": 128, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Baja", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Funcionalidad: Cargues Masivos", "sol": "TeamSIIx - Modernización", "obs": "", "comp": "Media", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 129, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Marisol Ferro Lopez", "fi": "13-Apr-26", "ff": "21-May-26", "qi": "2026-Q2", "qf": "2026-Q2", "av": "60%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Disposición en SIM - Maestra de Personas", "sol": "TeamSIIx - Modernización", "obs": "", "comp": "Alta", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 38},
{"id": 130, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Disposición en SIM - Maestra de variables sociodemográficas", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 131, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Disposición en SIM - Maestra de ubicación y contacto", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 132, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Disposición en SIM - Maestra de grupos (familias)", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 133, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Disposición en SIM - Maestra de actuaciones", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 134, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Disposición en SIM - Maestra de alertas", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 135, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Nutrición", "ejeE": "SIIx & Apps - SIM", "pri": "Media", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Juan Fernando Herrera Martinez", "fi": "20-Feb-26", "ff": "30-Apr-26", "qi": "2026-Q1", "qf": "", "av": "5%", "est": "Levantamiento", "estRaw": "1 - Levantamiento", "fr": "Modulo Asistencias: Informe de Fotografia, incluir variables adicionales al Informe de Fotografia", "sol": "Zulma Fonseca (Subdirectora)", "obs": "", "comp": "Baja", "rad": "13-Feb-2026 - I2026004163", "qS": 1, "q": [1], "rec": 0, "dur": 69},
{"id": 136, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Dirección de Nutrición y Abastecimiento", "ejeE": "SIIx & Apps - SIM", "pri": "Baja", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Modulo Asistencias: Ajuste a estados multiples para toma de Asistencias", "sol": "Ivonne Carolina Camargo (Directora)", "obs": "", "comp": "Baja", "rad": "17-Abr-2026 -  I2026011939", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 137, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Nutrición", "ejeE": "SIIx & Apps - SIM", "pri": "Media", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Hector Heli Ariza Torres", "fi": "16-Apr-26", "ff": "", "qi": "2026-Q2", "qf": "", "av": "5%", "est": "Congelado", "estRaw": "8 - Congelado", "fr": "Modulo Nutrición: Ajuste en el Calculo Nutricional", "sol": "Zulma Fonseca (Subdirectora)", "obs": "23-Abr-2026: Ejecutor en estabilización de Cursos y Asistencias", "comp": "Media", "rad": "23-Feb-2026 - I2026005493", "qS": 2, "q": [2], "rec": 0, "dur": 0},
{"id": 138, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Dirección de Análisis y Diseño Estratégico", "ejeE": "SIIx & Apps - SIM", "pri": "Baja", "cod": "Apps-SIM-01", "plan": "Modernización Sistema de Información Misional", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Wilmer Gustavo Mogollon Duque", "fi": "28-Apr-26", "ff": "28-Apr-26", "qi": "2026-Q2", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Focalización: Ventana de Confirmación de Datos", "sol": "Ivan Osejo (Director)", "obs": "", "comp": "Baja", "rad": "27-Mar-2026 - I2026009727", "qS": 2, "q": [2], "rec": 0, "dur": 0},
{"id": 139, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "Apps-SIM-02", "plan": "Uso y Apropiación Sistema de Información Misional", "resp": "Martha Ines Lizarazo Torres", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Implementación Curso de Moodle - Base de Conocimiento - SIM", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 140, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Subdirección de Investigación e Información (TIC)", "ejeE": "SIIx & Apps - SIM", "pri": "Alta", "cod": "Apps-SIM-02", "plan": "Uso y Apropiación Sistema de Información Misional", "resp": "Martha Ines Lizarazo Torres", "ejec": "John Morales Chaguala", "fi": "18-May-26", "ff": "30-Jun-26", "qi": "2026-Q2", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Transferencia de Conocimiento - Apropiación Funcionalidades SIRBE - Recomendaciones AE 2025", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 2, "q": [2], "rec": 0, "dur": 43},
{"id": 141, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Despacho Secretario", "ejeE": "SIIx & Apps - SIM - Otros", "pri": "Baja", "cod": "Apps-SIM-03", "plan": "Apoyo Ventanilla  Virtual de Tramites", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Jorge Andres Alvarado Gomez", "fi": "3-Nov-25", "ff": "29-May-26", "qi": "2025-Q4", "qf": "2026-Q2", "av": "30%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Conexión de VU a Microservicios del Sistema de Información Misional (SIM)", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 4, "q": [1, 2], "rec": 0, "dur": 207},
{"id": 142, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Despacho Secretario", "ejeE": "SIIx & Apps - SIM - Otros", "pri": "Baja", "cod": "Apps-SIM-03", "plan": "Apoyo Ventanilla  Virtual de Tramites", "resp": "Miguel Angel Torres Rodriguez", "ejec": "—", "fi": "", "ff": "", "qi": "", "qf": "", "av": "0%", "est": "No Definido", "estRaw": "0 - No Definido", "fr": "Definición del Método de Autenticación de la VU -> Ciudadano", "sol": "", "obs": "", "comp": "Alta", "rad": "", "qS": null, "q": [], "rec": 0, "dur": 0},
{"id": 143, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Despacho Secretario", "ejeE": "SIIx & Apps - SIM - Otros", "pri": "Media", "cod": "Apps-SIM-03", "plan": "Apoyo Ventanilla  Virtual de Tramites", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Edward Heiler Giraldo Carvajal", "fi": "3-Nov-25", "ff": "29-May-26", "qi": "2025-Q4", "qf": "2026-Q2", "av": "30%", "est": "En Desarrollo", "estRaw": "4 - Desarrollo", "fr": "Disposición de Fuentes y Maestras para consumo de la VU", "sol": "", "obs": "", "comp": "Media", "rad": "", "qS": 4, "q": [1, 2], "rec": 0, "dur": 207},
{"id": 144, "eje": "E. Gestión de Sistemas de Información y Apps", "area": "Despacho Secretario", "ejeE": "SIIx & Apps - SIM - Otros", "pri": "Media", "cod": "Apps-SIM-03", "plan": "Apoyo Ventanilla  Virtual de Tramites", "resp": "Miguel Angel Torres Rodriguez", "ejec": "Miguel Angel Torres Rodriguez", "fi": "8-Jan-25", "ff": "20-Mar-26", "qi": "2025-Q1", "qf": "2026-Q1", "av": "100%", "est": "Completada", "estRaw": "7 - Completada", "fr": "Separación de Ambientes de Ejecución de Aplicaciones (SIM <-> VU)", "sol": "", "obs": "", "comp": "baja", "rad": "", "qS": 1, "q": [1], "rec": 0, "dur": 436}
];

// ═══════════════════════════════════════════════════════════════
// BLOQUE 2: CONFIG
// ═══════════════════════════════════════════════════════════════

// Paleta de estados (sobrios)
const EC = {
  "No Definido":         "#94a3b8",
  "Levantamiento":       "#7c3aed",
  "Análisis y Diseño":   "#4f46e5",
  "Cola":                "#64748b",
  "En Desarrollo":       "#0284c7",
  "Pruebas Internas":    "#d97706",
  "Pruebas Funcionales": "#ea580c",
  "Completada":          "#059669",
  "Recurrente":          "#0d9488",
  "Congelado":           "#e11d48",
  "Descartado":          "#71717a"
};

// Ciclo de vida del requerimiento (modelo lineal 0→7)
// avMin/avMax = rango de % de avance válido para este estado
const LIFECYCLE = [
  { id: 0,  key: "No Definido",         avMin: 0,   avMax: 0,   desc: "No se sabe qué tipo de requerimiento es y se debe levantar." },
  { id: 1,  key: "Levantamiento",       avMin: 1,   avMax: 10,  desc: "En proceso de entendimiento y levantamiento del requerimiento." },
  { id: 2,  key: "Análisis y Diseño",   avMin: 11,  avMax: 20,  desc: "En proceso de análisis, diseño y estimación de tiempo para la actividad." },
  { id: 3,  key: "Cola",                avMin: 20,  avMax: 20,  desc: "Definida y con estimación de tiempo, sin fecha de inicio asignada." },
  { id: 4,  key: "En Desarrollo",       avMin: 21,  avMax: 80,  desc: "En curso por parte del equipo de desarrollo." },
  { id: 5,  key: "Pruebas Internas",    avMin: 81,  avMax: 90,  desc: "En pruebas internas por parte del equipo de analistas de pruebas." },
  { id: 6,  key: "Pruebas Funcionales", avMin: 91,  avMax: 99,  desc: "En pruebas funcionales o calibración entre el TeamSIIx y el equipo funcional." },
  { id: 7,  key: "Completada",          avMin: 100, avMax: 100, desc: "Finalizada a satisfacción." }
];
const LIFECYCLE_BRANCH = [
  { id: "R",  key: "Recurrente", avMin: null, avMax: null, desc: "Actividad recurrente. No aplica avance; es operación continua." },
  { id: 8,    key: "Congelado",  avMin: null, avMax: null, desc: "Detenida por directrices internas o externas. Se conserva el avance del último estado." },
  { id: 99,   key: "Descartado", avMin: null, avMax: null, desc: "Descartada por directrices internas o externas. Se conserva el avance del último estado." }
];

// R-18: Excepciones a la regla de rangos de avance (R-05)
// Los frentes que pertenezcan a estos planes/frentes no se validan contra los rangos
const AVANCE_EXCEPCIONES = {
  planes:  ["Contrato: 10687 - 2025 - AGATA"],
  frentes: ["Transferencia de Conocimiento AZ-Digital"]
};

// Helper: determina si un item está exento de validación de rango por R-18
const esExcepcionAvance = (item) =>
  AVANCE_EXCEPCIONES.planes.includes(item.plan) ||
  AVANCE_EXCEPCIONES.frentes.includes(item.fr);

// Helper: valida si el avance de un item está dentro del rango de su estado
// Retorna null si no aplica validación (estado R/8/99, o excepción R-18), true si coherente, false si inconsistente
const validarAvance = (item) => {
  if (esExcepcionAvance(item)) return null;
  const step = LIFECYCLE.find(l => l.key === item.est);
  if (!step) return null;
  const av = (function(){
    const raw = String(item.av||"").trim();
    if (raw === "" || raw.toLowerCase() === "recurrente" || raw.toLowerCase() === "descartado") return null;
    const n = parseInt(raw.replace("%",""));
    return isNaN(n) ? null : n;
  })();
  if (av === null) return null;
  return av >= step.avMin && av <= step.avMax;
};

const INT = "Subdirección de Investigación e Información (TIC)";

// Estados activos (en ejecución)
const EST_ACTIVE = new Set(["Levantamiento","Análisis y Diseño","Cola","En Desarrollo","Pruebas Internas","Pruebas Funcionales","Recurrente"]);

// Secciones para Vista de Planes — agrupación alineada con eje específico del CSV
// ═══════════════════════════════════════════════════════════════
// Jerarquía V2: Grupo Principal → SubGrupo
// Mapeo por Eje Específico Trabajo (fuente: imagen 1)
// ═══════════════════════════════════════════════════════════════
const MAP_EJE_E = {
  "Gestión SIIx":                     {grupo:"Apps & SIIx",              sub:"Gestión SIIx"},
  "SIIx & Apps - AZDigital":          {grupo:"Apps & SIIx",              sub:"Gestión Documental (AZDigital)"},
  "SIIx & Apps - Business Apps":      {grupo:"Apps & SIIx",              sub:"Business Apps"},
  "SIIx & Apps - Interoperabilidad":  {grupo:"Apps & SIIx",              sub:"Interoperabilidad"},
  "SIIx & Apps - IOPS":               {grupo:"Apps & SIIx",              sub:"IOPS"},
  "SIIx & Apps - SEVEN & KACTUS":     {grupo:"Apps & SIIx",              sub:"ERP - RRHH (SEVEN/KACTUS)"},
  "SIIx & Apps - SIM":                {grupo:"Apps & SIIx",              sub:"SIM (Sistema Misional)"},
  "SIIx & Apps - SIM - Otros":        {grupo:"Apps & SIIx",              sub:"SIM (Sistema Misional)"},
  "Soporte Apps":                     {grupo:"Apps & SIIx",              sub:"Gestión SIIx"},
  "Datos - Apoyo":                    {grupo:"Datos e Información",      sub:"Gestión de Apoyo"},
  "Datos - Fabrica de Datos":         {grupo:"Datos e Información",      sub:"Fábrica de Datos"},
  "Datos - Misional":                 {grupo:"Datos e Información",      sub:"Gestión Misional"},
  "Arquitectura Empresarial":         {grupo:"Arquitectura Empresarial", sub:"Arquitectura Empresarial"},
  "No determinado":                   {grupo:"No Determinado",           sub:"No Determinado"}
};

// Mapeo por Plan de Trabajo Principal (fuente: imagen 2) — tiene prioridad sobre MAP_EJE_E
const MAP_PLAN_ITIC = {
  "Implementación TIC - Transferencias Monetarias (IMG)": {grupo:"Implementación TIC", sub:"Transferencias Monetarias (IMG)"},
  "Implementación TIC - Infancia":                          {grupo:"Implementación TIC", sub:"Infancia"},
  "Implementación TIC - Jóvenes con Oportunidades":         {grupo:"Implementación TIC", sub:"Jóvenes con Oportunidades"}
};

// Clasifica un frente → {grupo, sub}
const classify = (item) => {
  if (MAP_PLAN_ITIC[item.plan]) return MAP_PLAN_ITIC[item.plan];
  return MAP_EJE_E[item.ejeE] || {grupo:"No Determinado", sub:item.ejeE};
};

// Responsable de cada plan (fuente: catálogo de planes TeamSIIx)
// Clave: "códigoPlan::PlanDeTrabajoPrincipal" — necesario porque GSIIx-02 tiene 2 planes con responsables diferentes
const PLAN_RESP = {
  "AE-01::Armonización Plan de Desarrollo":                                   "Liliana Borda Parra",
  "AE-02::Arquitectura Empresarial - Vigencia 2025":                          "Raul Eduardo Gonzalez Leon",
  "Apps-01::Implementación API Management - Interoperabilidad":               "Miguel Angel Torres Rodriguez",
  "Apps-AZD-01::Contrato: Soporte y Mantenimiento AZDigital":                 "Miguel Angel Quintero Lopez",
  "Apps-BApps-01::Requerimientos Business Apps":                              "Raul Eduardo Gonzalez Leon",
  "Apps-IOPS-01::Requerimientos IOPS (Informe Orden de Prestacion de Servicios)": "Miguel Angel Quintero Lopez",
  "Apps-Kactus-01::Requerimientos  HH.RR KACTUS":                             "Martha Cecilia Calderon Castro",
  "Apps-SEVEN-01::Requerimientos  ERP SEVEN":                                 "Martha Cecilia Calderon Castro",
  "Apps-SIM-01::Modernización Sistema de Información Misional":               "Miguel Angel Torres Rodriguez",
  "Apps-SIM-02::Uso y Apropiación Sistema de Información Misional":           "Martha Ines Lizarazo Torres",
  "Apps-SIM-03::Apoyo Ventanilla  Virtual de Tramites":                       "Miguel Angel Quintero Lopez",
  "Apps-SIM-04::SICOFA - Sistema de Información de Comisarias":               "Miguel Angel Torres Rodriguez",
  "Apps-SISBS-01::Implementación SISBS":                                      "Raul Eduardo Gonzalez Leon",
  "Datos-01::Recepción y automatización de fuentes de datos":                 "Diego Alfonso Pedroza Castro",
  "Datos-02::Plan de Implementación Listados":                                "Diego Alfonso Pedroza Castro",
  "Datos-03::Inteligencia de Negocio Institucional – Analítica y Visualización": "Raul Eduardo Gonzalez Leon",
  "Datos-04::Desarrollo e Implementación Tablas Maestras (Fabric)":           "Diego Alfonso Pedroza Castro",
  "Datos-05::Uso y Apropiación Fabrica de Datos - MS Fabric":                 "Diego Alfonso Pedroza Castro",
  "Datos-06::Gobernanza de Datos - PurView":                                  "Diego Alfonso Pedroza Castro",
  "GSIIx-01::Mantenimiento Sistemas de Información":                          "Miguel Angel Quintero Lopez",
  "GSIIx-02::Contrato: 10687 - 2025 - AGATA":                                 "Miguel Angel Quintero Lopez",
  "GSIIx-02::Soporte Segundo Nivel Aplicaciones":                             "Liliana Borda Parra",
  "iTIC-01::Implementación TIC - Transferencias Monetarias (IMG)":            "Raul Eduardo Gonzalez Leon",
  "iTIC-02::Implementación TIC - Infancia":                                   "Raul Eduardo Gonzalez Leon",
  "iTIC-03::Implementación TIC - Jóvenes con Oportunidades":                  "Miguel Angel Quintero Lopez",
  "iTIC-04::Implementación TIC - Vigencias Futuras":                          "Raul Eduardo Gonzalez Leon"
};

// Helper: obtiene el responsable del plan a partir de un item (primer frente del plan)
const getPlanResp = (cod, plan) => PLAN_RESP[`${cod}::${plan}`] || null;

// Agrupamiento de planes por Grupo Temático (para el Tab Análisis)
// Un plan pertenece a un único grupo según el catálogo institucional
const PLAN_GRUPO = {
  "GSIIx-01::Mantenimiento Sistemas de Información":                       "Gestión SIIx",
  "GSIIx-02::Soporte Segundo Nivel Aplicaciones":                          "Gestión SIIx",
  "GSIIx-02::Contrato: 10687 - 2025 - AGATA":                              "Gestión SIIx",
  "Datos-03::Inteligencia de Negocio Institucional – Analítica y Visualización": "Datos",
  "iTIC-01::Implementación TIC - Transferencias Monetarias (IMG)":         "Implementación TIC",
  "iTIC-02::Implementación TIC - Infancia":                                "Implementación TIC",
  "iTIC-03::Implementación TIC - Jóvenes con Oportunidades":               "Implementación TIC",
  "Apps-SIM-01::Modernización Sistema de Información Misional":            "SIM (Sistema Misional)",
  "Apps-SIM-04::SICOFA - Sistema de Información de Comisarias":            "SIM (Sistema Misional)",
  "Apps-BApps-01::Requerimientos Business Apps":                           "Business Apps",
  "iTIC-04::Implementación TIC - Vigencias Futuras":                       "Implementación TIC",
  "Apps-AZD-01::Contrato: Soporte y Mantenimiento AZDigital":              "Gestión Documental (AZDigital)",
  "Apps-IOPS-01::Requerimientos IOPS (Informe Orden de Prestacion de Servicios)": "IOPS",
  "Apps-SISBS-01::Implementación SISBS":                                   "Business Apps",
  "Apps-SEVEN-01::Requerimientos  ERP SEVEN":                              "ERP - RRHH (SEVEN/KACTUS)",
  "Apps-Kactus-01::Requerimientos  HH.RR KACTUS":                          "ERP - RRHH (SEVEN/KACTUS)",
  "AE-01::Armonización Plan de Desarrollo":                                "SIM (Sistema Misional)",
  "AE-02::Arquitectura Empresarial - Vigencia 2025":                       "Arquitectura Empresarial",
  "Datos-01::Recepción y automatización de fuentes de datos":              "Datos",
  "Datos-02::Plan de Implementación Listados":                             "Datos",
  "Datos-04::Desarrollo e Implementación Tablas Maestras (Fabric)":        "Datos",
  "Datos-06::Gobernanza de Datos - PurView":                               "Datos",
  "Datos-05::Uso y Apropiación Fabrica de Datos - MS Fabric":              "Datos",
  "Apps-01::Implementación API Management - Interoperabilidad":            "Interoperabilidad",
  "Apps-SIM-02::Uso y Apropiación Sistema de Información Misional":        "SIM (Sistema Misional)",
  "Apps-SIM-03::Apoyo Ventanilla  Virtual de Tramites":                    "SIM (Sistema Misional)"
};
const getPlanGrupo = (cod, plan) => PLAN_GRUPO[`${cod}::${plan}`] || "Sin Grupo";

// Colores e iconos por Grupo Temático
const GRUPO_TEMATICO_COLOR = {
  "SIM (Sistema Misional)":          "#4f46e5",
  "Datos":                            "#0d9488",
  "Implementación TIC":               "#d97706",
  "Gestión SIIx":                     "#7c3aed",
  "ERP - RRHH (SEVEN/KACTUS)":        "#0284c7",
  "Business Apps":                    "#e11d48",
  "Interoperabilidad":                "#ea580c",
  "IOPS":                             "#8b5cf6",
  "Arquitectura Empresarial":         "#059669",
  "Gestión Documental (AZDigital)":   "#64748b",
  "Sin Grupo":                        "#94a3b8"
};
const GRUPO_TEMATICO_ICON = {
  "SIM (Sistema Misional)":          "🏗️",
  "Datos":                            "📊",
  "Implementación TIC":               "🎯",
  "Gestión SIIx":                     "🛠️",
  "ERP - RRHH (SEVEN/KACTUS)":        "💼",
  "Business Apps":                    "🏢",
  "Interoperabilidad":                "🔗",
  "IOPS":                             "📑",
  "Arquitectura Empresarial":         "🏛️",
  "Gestión Documental (AZDigital)":   "📋",
  "Sin Grupo":                        "❓"
};

// Colores por grupo para jerarquía visual
const GRUPO_COLOR = {
  "Apps & SIIx":              "#4f46e5",
  "Datos e Información":      "#059669",
  "Implementación TIC":       "#d97706",
  "Arquitectura Empresarial": "#7c3aed",
  "No Determinado":           "#94a3b8"
};

// Iconos por grupo y subgrupo
const GRUPO_ICON = {
  "Apps & SIIx":              "💻",
  "Datos e Información":      "📊",
  "Implementación TIC":       "🎯",
  "Arquitectura Empresarial": "🏛️",
  "No Determinado":           "❓"
};
const SUB_ICON = {
  "SIM (Sistema Misional)":          "🏗️",
  "ERP - RRHH (SEVEN/KACTUS)":       "💼",
  "Business Apps":                    "🏢",
  "Gestión Documental (AZDigital)":  "📋",
  "IOPS":                             "📑",
  "Interoperabilidad":                "🔗",
  "Gestión SIIx":                     "🛠️",
  "Gestión Misional":                 "🎯",
  "Fábrica de Datos":                 "⚙️",
  "Gestión de Apoyo":                 "📊",
  "Transferencias Monetarias (IMG)": "💳",
  "Infancia":                         "👶",
  "Jóvenes con Oportunidades":        "🎓",
  "Arquitectura Empresarial":         "🏛️",
  "No Determinado":                   "❓"
};

// Estilos de prioridad (para usar con style inline + color condicional)
const PCOLORS = {"Alta":"#e11d48","Media":"#d97706","Baja":"#059669","No Determinada":"#94a3b8"};

// Detección de planes multi-eje
const MP = new Set();
{ const m={}; DATA.forEach(d=>{ if(!m[d.plan]) m[d.plan]=new Set(); m[d.plan].add(d.ejeE); });
  Object.entries(m).forEach(([p,s])=>{ if(s.size>1) MP.add(p); }); }

// ═══════════════════════════════════════════════════════════════
// THEME — CSS variables (responde a toggle dark/light)
// ═══════════════════════════════════════════════════════════════
const T = (dark) => ({
  // Backgrounds
  bg:        dark ? "#020617" : "#f8fafc",
  surface:   dark ? "#0f172a" : "#ffffff",
  surfaceAlt: dark ? "#1e293b" : "#f1f5f9",
  surfaceHover: dark ? "#1e293b" : "#f8fafc",
  // Text
  text:      dark ? "#f1f5f9" : "#0f172a",
  textMuted: dark ? "#94a3b8" : "#64748b",
  textSubtle: dark ? "#64748b" : "#94a3b8",
  // Borders
  border:    dark ? "#1e293b" : "#e2e8f0",
  borderHover: dark ? "#4f46e5" : "#818cf8",
  // Accents
  accent:    dark ? "#818cf8" : "#4f46e5",
  accentBg:  dark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.08)",
  // Header gradient
  headerBg:  dark ? "linear-gradient(135deg,#0f172a 0%,#1e293b 100%)" 
                  : "linear-gradient(135deg,#3730a3 0%,#4338ca 100%)",
  headerText: "#ffffff"
});

// ═══════════════════════════════════════════════════════════════
// BLOQUE 3: UTILS
// ═══════════════════════════════════════════════════════════════
const MO = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const pD = s => { const p=String(s).split("-"); return new Date(2000+parseInt(p[2]),MO.indexOf(p[1]),parseInt(p[0])); };

// Avance numérico del CSV (ya viene acotado por el avMax del estado)
// Retorna null si el frente es Recurrente (no aplica avance medible)
const aN = it => {
  const raw = String(it.av || "").trim();
  if (raw === "" || raw.toLowerCase() === "descartado") return 0;
  // Recurrentes no tienen avance medible
  if (raw.toLowerCase() === "recurrente") return null;
  const n = parseInt(raw.replace("%",""));
  return isNaN(n) ? 0 : Math.max(0, Math.min(100, n));
};

// Promedio simple del avance de un conjunto de frentes.
// Excluye Recurrentes (aN = null) y Descartados (av literal "Descartado").
// Retorna null si no hay ningún frente medible en el conjunto.
const wA = items => {
  const vals = items
    .map(i => aN(i))
    .filter(v => v !== null && !isNaN(v));
  // Excluir también los que vienen con av vacío/no numérico
  const medibles = items.filter(i => {
    const v = aN(i);
    return v !== null && String(i.av||"").trim() !== "" && String(i.av||"").toLowerCase() !== "descartado";
  });
  if (!medibles.length) return null;
  const suma = medibles.reduce((acc, i) => acc + aN(i), 0);
  return Math.round(suma / medibles.length);
};

const cobertura = items => {
  if (!items.length) return 0;
  return Math.round(items.filter(i => i.dur > 0 || i.rec === 1).length / items.length * 100);
};

const tipificado = items => {
  if (!items.length) return 0;
  return Math.round(items.filter(i => i.est !== "No Definido").length / items.length * 100);
};

const sC = items => {
  const c={}; items.forEach(i=>{c[i.est]=(c[i.est]||0)+1});
  const order = [...LIFECYCLE.map(l=>l.key), ...LIFECYCLE_BRANCH.map(l=>l.key)];
  return order.filter(k=>c[k]).map(k=>({e:k,n:c[k],color:EC[k]}));
};

// ═══════════════════════════════════════════════════════════════
// BLOQUE 4: COMPONENTS — usan CSS variables vía style inline
// ═══════════════════════════════════════════════════════════════

// Barra de avance compacta
const Bar = ({v, c="#4f46e5"}) => (
  <div style={{display:"flex",alignItems:"center",gap:8,width:"100%"}}>
    <div style={{flex:1,height:6,borderRadius:9999,background:"var(--surface-alt)",overflow:"hidden"}}>
      <div style={{height:"100%",borderRadius:9999,width:`${v}%`,background:c,transition:"width .3s"}}/>
    </div>
    <span style={{fontSize:10,fontWeight:600,fontVariantNumeric:"tabular-nums",width:32,textAlign:"right",color:"var(--text-muted)"}}>{v}%</span>
  </div>
);

// Puntos por estado
const Dots = ({items}) => {
  const counts = sC(items);
  if (!counts.length) return null;
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
      {counts.map(({e,n,color}) => (
        <span key={e} title={`${e}: ${n}`} style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:10,padding:"2px 6px",borderRadius:9999,background:"var(--surface-alt)",color:"var(--text-muted)"}}>
          <span style={{width:6,height:6,borderRadius:9999,background:color}}/>{n}
        </span>
      ))}
    </div>
  );
};

// Quarter Bar
const QB = ({item}) => {
  const Q = [1,2,3,4];
  const qStart = item.qS;
  const qEnd = Array.isArray(item.q) && item.q.length > 0 ? item.q[item.q.length - 1] : null;
  return (
    <div style={{display:"flex",alignItems:"center",gap:2}}>
      {Q.map(q => {
        const active = item.q && item.q.includes(q);
        const isStart = qStart === q;
        const isEnd = qEnd === q && qStart !== qEnd;
        const isSingle = qStart === q && qEnd === q;
        // Estilos por tipo
        let bg, color, border;
        if (!active) {
          bg = "var(--surface-alt)";
          color = "var(--text-subtle)";
          border = "1px solid transparent";
        } else if (isSingle) {
          // Q único (inicia y termina en el mismo trimestre)
          bg = "#059669";
          color = "#fff";
          border = "1px solid #047857";
        } else if (isStart) {
          bg = "var(--accent)";
          color = "#fff";
          border = "1px solid var(--accent)";
        } else if (isEnd) {
          bg = "#dc2626";
          color = "#fff";
          border = "1px solid #b91c1c";
        } else {
          bg = "var(--accent-bg)";
          color = "var(--accent)";
          border = "1px solid var(--accent)";
        }
        const marker = isSingle ? "●" : (isStart ? "▶" : (isEnd ? "◀" : ""));
        return (
          <span key={q}
            title={
              isSingle ? `Q${q} (inicio y fin)` :
              isStart ? `Q${q} (inicio)` :
              isEnd ? `Q${q} (fin)` :
              active ? `Q${q} (activo)` : `Q${q}`
            }
            style={{
              fontSize:9, fontWeight:700, minWidth:22, height:16,
              padding:"0 3px",
              display:"flex", alignItems:"center", justifyContent:"center", borderRadius:3,
              background: bg, color: color, border: border,
              boxShadow: (isStart || isEnd || isSingle) ? `0 1px 3px rgba(0,0,0,0.15)` : "none",
              gap: 2
            }}>
            {marker && <span style={{fontSize:7,lineHeight:1}}>{marker}</span>}
            <span>Q{q}</span>
          </span>
        );
      })}
    </div>
  );
};

// Pill de prioridad
const PriPill = ({pri}) => {
  const c = PCOLORS[pri] || "#94a3b8";
  return <span style={{fontSize:9,padding:"2px 6px",borderRadius:4,fontWeight:700,color:c,background:`${c}20`,border:`1px solid ${c}40`}}>{pri}</span>;
};

// Fila de Frente
const Row = ({item, onClick}) => {
  const av = aN(item);
  const color = EC[item.est] || "#94a3b8";
  const coherente = validarAvance(item);
  return (
    <button onClick={onClick} style={{
      width:"100%",textAlign:"left",padding:"8px 12px",borderRadius:8,
      border:"1px solid var(--border)",background:"var(--surface)",color:"var(--text)",
      cursor:"pointer",transition:"all .15s"
    }} onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--border-hover)";e.currentTarget.style.background="var(--surface-hover)"}}
       onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--surface)"}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
        <span style={{width:3,alignSelf:"stretch",borderRadius:9999,background:color}}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:4}}>
            <span style={{fontSize:12,fontWeight:500,color:"var(--text)",lineHeight:1.3,display:"flex",alignItems:"flex-start",gap:4}}>
              {coherente === false && <span title="Avance fuera del rango del estado" style={{color:"#e11d48",flex:"0 0 auto",marginTop:1}}>⚠</span>}
              <span>{item.fr}</span>
            </span>
            <PriPill pri={item.pri}/>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginTop:4}}>
            <div style={{display:"flex",alignItems:"center",gap:6,fontSize:10,color:"var(--text-muted)",minWidth:0,flex:1}}>
              <span style={{fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}} title={`Responsable: ${item.resp}`}>{item.resp}</span>
              {item.ejec && item.ejec !== "—" && item.ejec !== item.resp && (
                <>
                  <span style={{opacity:0.5}}>/</span>
                  <span style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",opacity:0.85}} title={`Ejecutor: ${item.ejec}`}>{item.ejec}</span>
                </>
              )}
              <span style={{opacity:0.5}}>·</span>
              <span style={{color,fontWeight:600,whiteSpace:"nowrap",flex:"0 0 auto"}}>{item.est}</span>
            </div>
            <QB item={item} />
          </div>
          {av !== null && av > 0 && <div style={{marginTop:6}}><Bar v={av} c={color} /></div>}
        </div>
      </div>
    </button>
  );
};

// Plan Bar (header expandible) — muestra "Codigo - Nombre"
const PB = ({plan, cod, items, expanded, onToggle}) => {
  const av = wA(items); const cob = cobertura(items);
  const resp = getPlanResp(cod, plan);
  return (
    <button onClick={onToggle} style={{
      width:"100%",padding:"10px 12px",borderRadius:8,
      background:"var(--surface)",border:"1px solid var(--border)",cursor:"pointer",
      textAlign:"left",color:"var(--text)",transition:"border-color .15s"
    }} onMouseEnter={e=>e.currentTarget.style.borderColor="var(--border-hover)"}
       onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <span style={{color:"var(--text-subtle)",transform:expanded?"rotate(90deg)":"none",transition:"transform .15s",display:"inline-block"}}>▸</span>
        <span style={{flex:1,fontSize:13,fontWeight:600,color:"var(--text)"}}>
          {cod && <span style={{color:"var(--accent)",fontWeight:700,marginRight:6}}>{cod}</span>}
          {plan}
        </span>
        <span style={{fontSize:10,color:"var(--text-muted)",fontWeight:500,fontVariantNumeric:"tabular-nums"}}>{items.length} frente{items.length!==1?"s":""}</span>
      </div>
      <div style={{marginLeft:20}}>
        {resp && (
          <div style={{fontSize:10,color:"var(--text-muted)",marginBottom:6,display:"flex",alignItems:"center",gap:4}}>
            <span style={{opacity:0.7}}>Responsable:</span>
            <span style={{fontWeight:500,color:"var(--text)"}}>{resp}</span>
          </div>
        )}
        <Dots items={items}/>
        {av !== null ? (
          <div style={{marginTop:6,fontSize:10,color:"var(--text-muted)"}}>Avance: <span style={{fontWeight:600,color:"var(--text)"}}>{av}%</span></div>
        ) : (
          <div style={{marginTop:6,fontSize:10,color:"var(--text-subtle)",fontStyle:"italic"}}>Sin frentes medibles</div>
        )}
      </div>
    </button>
  );
};

// Drawer lateral con detalle de frente
const Field = ({k,v}) => (
  <div>
    <dt style={{fontSize:10,textTransform:"uppercase",letterSpacing:".05em",color:"var(--text-subtle)",fontWeight:500}}>{k}</dt>
    <dd style={{fontSize:12,color:"var(--text)",marginTop:2}}>{v}</dd>
  </div>
);

const Drawer = ({item, onClose}) => {
  if (!item) return null;
  const color = EC[item.est] || "#94a3b8";
  const av = aN(item);
  const lifeStep = LIFECYCLE.find(l=>l.key===item.est) || LIFECYCLE_BRANCH.find(l=>l.key===item.est);
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:50,display:"flex"}}>
      <div style={{flex:1,background:"rgba(2,6,23,0.5)",backdropFilter:"blur(4px)"}}/>
      <div onClick={e=>e.stopPropagation()} style={{
        width:"100%",maxWidth:448,background:"var(--surface)",borderLeft:"1px solid var(--border)",
        boxShadow:"-4px 0 24px rgba(0,0,0,0.2)",overflowY:"auto"
      }}>
        <div style={{position:"sticky",top:0,background:"var(--surface)",borderBottom:"1px solid var(--border)",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontSize:11,textTransform:"uppercase",letterSpacing:".05em",color:"var(--text-subtle)",fontWeight:500}}>Detalle de Frente</span>
          <button onClick={onClose} style={{background:"none",border:"none",color:"var(--text-muted)",cursor:"pointer",padding:0}}><X size={18}/></button>
        </div>
        <div style={{padding:20,display:"flex",flexDirection:"column",gap:16}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{width:8,height:8,borderRadius:9999,background:color}}/>
              <span style={{fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:".04em",color}}>{lifeStep?`#${lifeStep.id} · ${item.est}`:item.est}</span>
              <span style={{marginLeft:"auto"}}><PriPill pri={item.pri}/></span>
            </div>
            <h3 style={{fontSize:16,fontWeight:600,color:"var(--text)",lineHeight:1.3}}>{item.fr}</h3>
            <p style={{fontSize:11,color:"var(--text-muted)",marginTop:4}}>{item.cod && <span style={{color:"var(--accent)",fontWeight:600,marginRight:4}}>{item.cod}</span>}{item.plan}</p>
          </div>

          {(() => {
            const step = LIFECYCLE.find(l=>l.key===item.est);
            const coherente = validarAvance(item);
            const excepcion = esExcepcionAvance(item);
            const esRec = item.rec === 1;
            const rangoTxt = step
              ? (step.avMin === step.avMax ? `${step.avMin}%` : `${step.avMin}% – ${step.avMax}%`)
              : null;
            if (esRec) {
              return (
                <div style={{padding:"10px 12px",borderRadius:8,background:"rgba(13,148,136,0.10)",border:"1px solid rgba(13,148,136,0.25)",fontSize:11,color:"#0d9488",display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:14}}>↻</span>
                  <span>Frente recurrente — operación continua, no aplica medición de avance</span>
                </div>
              );
            }
            return (
              <div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"var(--text-muted)",marginBottom:4}}>
                  <span>Avance {rangoTxt && !excepcion && <span style={{opacity:0.65}}>(rango del estado: {rangoTxt})</span>}</span>
                  <span style={{fontWeight:600,color:"var(--text)"}}>{av}%</span>
                </div>
                <Bar v={av} c={color}/>
                {excepcion && (
                  <div style={{marginTop:8,padding:"6px 10px",borderRadius:6,background:"rgba(99,102,241,0.10)",border:"1px solid rgba(99,102,241,0.25)",fontSize:11,color:"var(--accent)",display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:12}}>ⓘ</span>
                    <span>Frente exento de validación de rango por regla R-18 (plan o frente con dinámica contractual especial)</span>
                  </div>
                )}
                {coherente === false && (
                  <div style={{marginTop:8,padding:"6px 10px",borderRadius:6,background:"rgba(225,29,72,0.12)",border:"1px solid rgba(225,29,72,0.3)",fontSize:11,color:"#e11d48",display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:14}}>⚠</span>
                    <span>Inconsistencia: el avance ({av}%) está fuera del rango válido del estado actual ({rangoTxt})</span>
                  </div>
                )}
              </div>
            );
          })()}

          <dl style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:16,rowGap:8,fontSize:12}}>
            <Field k="Responsable" v={item.resp}/>
            <Field k="Ejecutor" v={item.ejec}/>
            <Field k="Complejidad" v={item.comp}/>
            <Field k="Eje" v={item.eje}/>
            <Field k="Eje Específico" v={item.ejeE}/>
            <Field k="Área Solicitante" v={item.area}/>
            <Field k="Solicitante" v={item.sol||"—"}/>
            <Field k="Radicado / Solicitud" v={item.rad||"—"}/>
            <Field k="Fecha Inicio" v={item.fi||"—"}/>
            <Field k="Fecha Final" v={item.ff||"—"}/>
            <Field k="Q Inicial" v={item.qi||"—"}/>
            <Field k="Q Final" v={item.qf||"—"}/>
            <Field k="Estado (CSV)" v={item.estRaw||"—"}/>
          </dl>

          {item.obs && (
            <div style={{paddingTop:8,borderTop:"1px solid var(--border)"}}>
              <span style={{fontSize:10,textTransform:"uppercase",letterSpacing:".05em",color:"var(--text-subtle)",fontWeight:500}}>Observaciones</span>
              <p style={{fontSize:12,color:"var(--text)",marginTop:4,lineHeight:1.5}}>{item.obs}</p>
            </div>
          )}

          {lifeStep && lifeStep.desc && (
            <div style={{paddingTop:8,borderTop:"1px solid var(--border)"}}>
              <span style={{fontSize:10,textTransform:"uppercase",letterSpacing:".05em",color:"var(--text-subtle)",fontWeight:500}}>Significado del estado</span>
              <p style={{fontSize:12,color:"var(--text-muted)",marginTop:4,fontStyle:"italic"}}>{lifeStep.desc}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Modal del Ciclo de Vida
const LifecycleModal = ({onClose}) => (
  <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div style={{position:"absolute",inset:0,background:"rgba(2,6,23,0.6)",backdropFilter:"blur(4px)"}}/>
    <div onClick={e=>e.stopPropagation()} style={{
      position:"relative",maxWidth:672,width:"100%",maxHeight:"90vh",overflowY:"auto",
      background:"var(--surface)",border:"1px solid var(--border)",borderRadius:16,
      boxShadow:"0 20px 50px rgba(0,0,0,0.3)"
    }}>
      <div style={{position:"sticky",top:0,background:"var(--surface)",borderBottom:"1px solid var(--border)",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <h2 style={{fontSize:18,fontWeight:600,color:"var(--text)"}}>Ciclo de vida del requerimiento</h2>
          <p style={{fontSize:11,color:"var(--text-muted)",marginTop:2}}>Modelo lineal de estados — TeamSIIx</p>
        </div>
        <button onClick={onClose} style={{background:"none",border:"none",color:"var(--text-muted)",cursor:"pointer"}}><X size={20}/></button>
      </div>
      <div style={{padding:24}}>
        <div>
          {LIFECYCLE.map((s, idx) => (
            <div key={s.id}>
              <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",flex:"0 0 auto"}}>
                  <div style={{width:40,height:40,borderRadius:9999,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff",background:EC[s.key],boxShadow:"0 2px 4px rgba(0,0,0,0.1)"}}>{s.id}</div>
                </div>
                <div style={{flex:1,paddingBottom:16,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:10,flexWrap:"wrap"}}>
                    <span style={{fontWeight:600,fontSize:14,color:"var(--text)"}}>{s.key}</span>
                    <span style={{fontSize:10,textTransform:"uppercase",letterSpacing:".05em",color:"var(--text-subtle)",fontWeight:600}}>Rango avance:</span>
                    <span style={{fontSize:12,fontWeight:700,fontVariantNumeric:"tabular-nums",color:EC[s.key],padding:"1px 8px",borderRadius:4,background:`${EC[s.key]}20`,border:`1px solid ${EC[s.key]}40`}}>
                      {s.avMin === s.avMax ? `${s.avMin}%` : `${s.avMin}% – ${s.avMax}%`}
                    </span>
                  </div>
                  <div style={{fontSize:12,color:"var(--text-muted)",marginTop:4,lineHeight:1.5}}>{s.desc}</div>
                </div>
              </div>
              {idx < LIFECYCLE.length-1 && (
                <div style={{display:"flex"}}>
                  <div style={{width:40,display:"flex",justifyContent:"center"}}>
                    <div style={{width:1,height:24,background:"var(--border)"}}/>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{marginTop:24,paddingTop:20,borderTop:"1px solid var(--border)"}}>
          <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:".05em",color:"var(--text-subtle)",fontWeight:500,marginBottom:12}}>Estados paralelos al flujo</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
            {LIFECYCLE_BRANCH.map(s => (
              <div key={s.id} style={{padding:12,borderRadius:8,border:"1px solid var(--border)",background:"var(--surface-alt)"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <span style={{width:24,height:24,borderRadius:9999,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#fff",background:EC[s.key]}}>{s.id}</span>
                  <span style={{fontSize:12,fontWeight:600,color:"var(--text)"}}>{s.key}</span>
                  <span style={{marginLeft:"auto",fontSize:9,textTransform:"uppercase",letterSpacing:".04em",color:"var(--text-subtle)",fontWeight:600}}>Último estado</span>
                </div>
                <div style={{fontSize:11,color:"var(--text-muted)",lineHeight:1.4}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// BLOQUE 5a: VISTA PLANES (V2) — Jerarquía: Grupo → SubGrupo → Plan → Frente
// Ordenado por cantidad de frentes (mayor a menor) en cada nivel
// ═══════════════════════════════════════════════════════════════

const PlanNode = ({plan, cod, items, onPick}) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <PB plan={plan} cod={cod} items={items} expanded={open} onToggle={()=>setOpen(!open)}/>
      {open && (
        <div style={{marginLeft:12,paddingLeft:12,borderLeft:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:6}}>
          {items.map(it => <Row key={it.id} item={it} onClick={()=>onPick(it)}/>)}
        </div>
      )}
    </div>
  );
};

// SubGrupo (nivel 2) — contiene planes
// allItems: frentes del subgrupo SIN filtrar (define el orden)
// items: frentes del subgrupo CON filtrar (los visibles actualmente)
const SubGroupNode = ({subName, allItems, items, onPick}) => {
  const [open, setOpen] = useState(false);

  // Orden de referencia sobre allItems (siempre el mismo)
  const planesMapAll = {};
  allItems.forEach(it => {
    if (!planesMapAll[it.plan]) planesMapAll[it.plan] = {cod: it.cod, items: []};
    planesMapAll[it.plan].items.push(it);
  });
  const planesOrden = Object.entries(planesMapAll)
    .sort((a,b) => b[1].items.length - a[1].items.length)
    .map(([plan, info]) => ({plan, cod: info.cod}));

  // Items filtrados agrupados por plan
  const planesMapFiltered = {};
  items.forEach(it => {
    if (!planesMapFiltered[it.plan]) planesMapFiltered[it.plan] = [];
    planesMapFiltered[it.plan].push(it);
  });

  // Solo mostrar el subgrupo si hay items filtrados
  if (!items.length) return null;

  const icon = SUB_ICON[subName] || "▸";
  const planesVisibles = planesOrden.filter(p => planesMapFiltered[p.plan]);

  return (
    <div>
      <button onClick={()=>setOpen(!open)} style={{
        width:"100%",textAlign:"left",padding:"8px 14px",borderRadius:8,
        background:"var(--surface-alt)",border:"1px solid var(--border)",cursor:"pointer",
        color:"var(--text)",transition:"border-color .15s"
      }} onMouseEnter={e=>e.currentTarget.style.borderColor="var(--border-hover)"}
         onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{color:"var(--text-subtle)",transform:open?"rotate(90deg)":"none",transition:"transform .15s",display:"inline-block",fontSize:11}}>▸</span>
          <span style={{fontSize:15}}>{icon}</span>
          <span style={{flex:1,fontSize:12,fontWeight:600,color:"var(--text)"}}>{subName}</span>
          <span style={{fontSize:10,color:"var(--text-muted)",fontWeight:500,fontVariantNumeric:"tabular-nums"}}>{planesVisibles.length} {planesVisibles.length===1?"plan":"planes"} · {items.length} frentes</span>
        </div>
      </button>
      {open && (
        <div style={{marginTop:6,paddingLeft:14,display:"flex",flexDirection:"column",gap:6}}>
          {planesVisibles.map(({plan, cod}) => (
            <PlanNode key={plan} plan={plan} cod={cod} items={planesMapFiltered[plan]} onPick={onPick}/>
          ))}
        </div>
      )}
    </div>
  );
};

// Grupo Principal (nivel 1) — contiene subgrupos
// allItems: frentes del grupo SIN filtrar (define el orden)
// items: frentes del grupo CON filtrar (los visibles actualmente)
const GroupNode = ({groupName, allItems, items, onPick}) => {
  const [open, setOpen] = useState(false);
  const color = GRUPO_COLOR[groupName] || "#64748b";
  const icon = GRUPO_ICON[groupName] || "▸";

  // Orden de referencia sobre allItems
  const subMapAll = {};
  allItems.forEach(it => {
    const {sub} = classify(it);
    (subMapAll[sub] = subMapAll[sub] || []).push(it);
  });
  const subsOrden = Object.entries(subMapAll)
    .sort((a,b) => b[1].length - a[1].length)
    .map(([sub, arr]) => ({sub, all: arr}));

  // Items filtrados por subgrupo
  const subMapFiltered = {};
  items.forEach(it => {
    const {sub} = classify(it);
    (subMapFiltered[sub] = subMapFiltered[sub] || []).push(it);
  });

  if (!items.length) return null;

  const subsVisibles = subsOrden.filter(s => subMapFiltered[s.sub]);
  const planesUnicos = new Set(items.map(i=>i.plan)).size;

  return (
    <div>
      <button onClick={()=>setOpen(!open)} style={{
        width:"100%",textAlign:"left",padding:"12px 16px",borderRadius:12,
        background:`linear-gradient(90deg, ${color}18 0%, var(--surface) 100%)`,
        border:`1px solid ${color}40`,cursor:"pointer",color:"var(--text)",transition:"all .15s"
      }} onMouseEnter={e=>e.currentTarget.style.borderColor=color}
         onMouseLeave={e=>e.currentTarget.style.borderColor=`${color}40`}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{color,transform:open?"rotate(90deg)":"none",transition:"transform .15s",display:"inline-block",fontSize:14,fontWeight:700}}>▸</span>
          <span style={{fontSize:22}}>{icon}</span>
          <span style={{flex:1,fontSize:15,fontWeight:700,color}}>{groupName}</span>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:10,color:"var(--text-muted)",fontWeight:500,fontVariantNumeric:"tabular-nums",padding:"2px 8px",borderRadius:4,background:`${color}15`,border:`1px solid ${color}30`}}>
              {subsVisibles.length} subgrupos · {planesUnicos} planes · {items.length} frentes
            </span>
          </div>
        </div>
      </button>
      {open && (
        <div style={{marginTop:10,paddingLeft:16,display:"flex",flexDirection:"column",gap:8}}>
          {subsVisibles.map(({sub, all}) => (
            <SubGroupNode key={sub} subName={sub} allItems={all} items={subMapFiltered[sub]} onPick={onPick}/>
          ))}
        </div>
      )}
    </div>
  );
};

// V2 recibe data (filtrada) pero internamente usa DATA (global) para preservar el orden
const V2 = ({data, onPick}) => {
  // Orden de referencia: calculado sobre DATA completa (constante)
  const grupoMapAll = {};
  DATA.forEach(it => {
    const {grupo} = classify(it);
    (grupoMapAll[grupo] = grupoMapAll[grupo] || []).push(it);
  });
  const gruposOrden = Object.entries(grupoMapAll)
    .sort((a,b) => b[1].length - a[1].length)
    .map(([grupo, arr]) => ({grupo, all: arr}));

  // Agrupación de los items filtrados
  const grupoMapFiltered = {};
  data.forEach(it => {
    const {grupo} = classify(it);
    (grupoMapFiltered[grupo] = grupoMapFiltered[grupo] || []).push(it);
  });

  return (
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {gruposOrden
        .filter(({grupo}) => grupoMapFiltered[grupo])
        .map(({grupo, all}) => (
          <GroupNode
            key={grupo}
            groupName={grupo}
            allItems={all}
            items={grupoMapFiltered[grupo]}
            onPick={onPick}
          />
        ))
      }
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// BLOQUE 5b: VISTA ÁREAS SDIS (V3) — diseño compacto tipo árbol
// ═══════════════════════════════════════════════════════════════
// ORG_TREE: jerarquía SDIS con directivos (en cursiva bajo el nombre del área)
const ORG_TREE = {
  name: "Secretaría SDIS", icon: "🏛️", dir: "Roberto Angulo Salazar", area: null,
  children: [
    { name: "Despacho Secretario", icon: "👔", dir: "Roberto Angulo Salazar", area: "Despacho Secretario" },
    { name: "Subsec. Gestión Institucional", icon: "⚙️", dir: "Lina María Sánchez Romero", area: "Subsecretaria de Gestión Institucional",
      children: [
        { name: "Dir. Gestión Corporativa", icon: "🏢", dir: "María Camila Díaz Marín", area: null,
          children: [
            { name: "SAF (Administrativa y Financiera)", icon: "💰", dir: "Gloria Matilde Torres Cruz", area: "Dirección de Gestión Corporativa - SAF" },
            { name: "Plantas Físicas",   icon: "🏗️", dir: "Johnny Edward Padilla Ariza", area: "Dirección de Gestión Corporativa - Plantas Físicas" },
            { name: "Talento Humano",    icon: "👥", dir: "Ana María Araujo Castro",      area: "Dirección de Gestión Corporativa - Talento Humano" },
            { name: "Contratación",      icon: "📝", dir: "Ruby Esperanza Arias Castro",  area: "Dirección de Gestión Corporativa - Contratación" }
          ]
        },
        { name: "Dir. Análisis y Diseño Estratégico (DADE)", icon: "📐", dir: "Iván Osejo Villamil", area: "Dirección de Análisis y Diseño Estratégico",
          children: [
            { name: "SubDir. Diseño, Evaluación y Sistematización (SDES)", icon: "📊", dir: "Elizabeth Soler Yaya", area: "Dirección de Análisis y Diseño Estratégico - SDES" },
            { name: "SubDir. Investigación e Información (TeamSIIx)", icon: "🚀", dir: "Andrea Eliana Salazar Pérez", area: "Subdirección de Investigación e Información (TIC)" }
          ]
        }
      ]
    },
    { name: "Subsec. Técnica", icon: "🔧", dir: "Juliana Sánchez Calderón", area: "Subsecretaria Técnica",
      children: [
        { name: "Dir. Nutrición y Abastecimiento", icon: "🍽️", dir: "Ivón Carolina Camargo García", area: "Dirección de Nutrición y Abastecimiento",
          children: [
            { name: "SubDir. Nutrición", icon: "🥗", dir: "Zulma Yanira Fonseca Centeno", area: "Subdirección de Nutrición" }
          ]
        },
        { name: "Dir. Territorial", icon: "🗺️", dir: "Sandra Patricia Orozco Marín", area: "Dirección Territorial",
          children: [
            { name: "SubDir. Identificación, Caracterización e Integración", icon: "🧭", dir: "Lindsay Benítez Barajas", area: "Subdireccion para la Identificación, Caracterización e Integración" }
          ]
        },
        { name: "Dir. Poblacional", icon: "👨‍👩‍👧‍👦", dir: "Natalia Martínez Pardo", area: null,
          children: [
            { name: "Infancia", icon: "👶", dir: "Adriana González Gómez",   area: "Dirección Poblacional - Infancia" },
            { name: "Jóvenes",  icon: "🎓", dir: "Diego Duque Gaitán",        area: "Dirección Poblacional - Jóvenes" }
          ]
        },
        { name: "Dir. Transferencias", icon: "💳", dir: "Mauricio Sandiño", area: "Dirección Transferencias",
          children: [
            { name: "Transferencias - Discapacidad", icon: "♿", dir: "Jennifer Schroeder", area: "Dirección Transferencias - Discapacidad" }
          ]
        },
        { name: "Dir. Inclusión y Familias", icon: "🤝", dir: "Diana Patricia Martínez Gallego", area: null,
          children: [
            { name: "Familia",      icon: "🏠", dir: "Natalia Velasco Castrillón", area: "Dirección para Inclusión y las Familias - Familia" },
            { name: "Discapacidad", icon: "♿", dir: "Marcela Cubides",            area: "Dirección para Inclusión y las Familias - Discapacidad" }
          ]
        }
      ]
    }
  ]
};

const OrgNode = ({node, allData, allDataUnfiltered, onPick, depth=0}) => {
  const [open, setOpen] = useState(false);
  const collectAreas = (n) => {
    let out = n.area ? [n.area] : [];
    if (n.children) n.children.forEach(c => out = out.concat(collectAreas(c)));
    return out;
  };
  const allAreas = collectAreas(node);

  // Items filtrados (visibles) y sin filtrar (para conservar orden de planes)
  const ownFiltered = node.area ? allData.filter(d => d.area === node.area) : [];
  const ownUnfiltered = node.area ? allDataUnfiltered.filter(d => d.area === node.area) : [];
  const allItemsFiltered = allData.filter(d => allAreas.includes(d.area));

  // Si no hay items visibles aquí ni en descendientes, ocultar el nodo
  if (!allItemsFiltered.length) return null;

  const totalPlans = [...new Set(allItemsFiltered.map(d => d.plan))].length;

  // Estilo según profundidad (solo cabecera del nodo)
  const sizes = [
    {pad:"8px 12px", fontSize:13, fontWeight:700, bg:"var(--accent-bg)"},
    {pad:"6px 10px", fontSize:12, fontWeight:600, bg:"var(--surface-alt)"},
    {pad:"5px 10px", fontSize:11, fontWeight:500, bg:"transparent"},
    {pad:"4px 8px",  fontSize:11, fontWeight:500, bg:"transparent"}
  ];
  const sz = sizes[Math.min(depth, sizes.length-1)];

  // Orden de planes "propios" preservado sobre ownUnfiltered
  const planOrden = [...new Set(ownUnfiltered.map(d => d.plan))];
  // Items propios filtrados agrupados por plan
  const ownByPlan = {};
  ownFiltered.forEach(it => {
    if (!ownByPlan[it.plan]) ownByPlan[it.plan] = {cod: it.cod, items: []};
    ownByPlan[it.plan].items.push(it);
  });
  const planesVisibles = planOrden.filter(p => ownByPlan[p]);

  return (
    <div style={{marginLeft: depth*8}}>
      <button onClick={()=>setOpen(!open)} style={{
        width:"100%",textAlign:"left",padding:sz.pad,borderRadius:6,
        background:sz.bg,border:"1px solid var(--border)",cursor:"pointer",color:"var(--text)",
        transition:"border-color .15s"
      }} onMouseEnter={e=>e.currentTarget.style.borderColor="var(--border-hover)"}
         onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{color:"var(--text-subtle)",transform:open?"rotate(90deg)":"none",display:"inline-block",transition:"transform .15s",fontSize:10}}>▸</span>
          <span style={{fontSize:14}}>{node.icon||"📁"}</span>
          <span style={{flex:1,minWidth:0,display:"flex",flexDirection:"column"}}>
            <span style={{fontSize:sz.fontSize,fontWeight:sz.fontWeight,color:"var(--text)",lineHeight:1.2}}>{node.name}</span>
            {node.dir && (
              <span style={{fontSize:10,fontStyle:"italic",color:"var(--text-muted)",lineHeight:1.2,marginTop:1}}>{node.dir}</span>
            )}
          </span>
          <span style={{fontSize:10,color:"var(--text-muted)",fontVariantNumeric:"tabular-nums",padding:"1px 6px",borderRadius:4,background:"var(--surface-alt)",flex:"0 0 auto"}}>{totalPlans}/{allItemsFiltered.length}</span>
        </div>
      </button>
      {open && (
        <div style={{marginTop:6,paddingLeft:14,display:"flex",flexDirection:"column",gap:6}}>
          {planesVisibles.length > 0 && (
            <OwnPlansNode
              planesVisibles={planesVisibles}
              ownByPlan={ownByPlan}
              ownFiltered={ownFiltered}
              onPick={onPick}
              depth={depth+1}
            />
          )}
          {node.children && node.children.map((child, i) => (
            <OrgNode key={i} node={child} allData={allData} allDataUnfiltered={allDataUnfiltered} onPick={onPick} depth={depth+1}/>
          ))}
        </div>
      )}
    </div>
  );
};

// Nodo "Planes Propios" — se renderiza como una subárea más (mismo estilo visual)
const OwnPlansNode = ({planesVisibles, ownByPlan, ownFiltered, onPick, depth=1}) => {
  const [open, setOpen] = useState(false);
  const sizes = [
    {pad:"8px 12px", fontSize:13, fontWeight:700, bg:"var(--accent-bg)"},
    {pad:"6px 10px", fontSize:12, fontWeight:600, bg:"var(--surface-alt)"},
    {pad:"5px 10px", fontSize:11, fontWeight:500, bg:"transparent"},
    {pad:"4px 8px",  fontSize:11, fontWeight:500, bg:"transparent"}
  ];
  const sz = sizes[Math.min(depth, sizes.length-1)];
  return (
    <div>
      <button onClick={()=>setOpen(!open)} style={{
        width:"100%",textAlign:"left",padding:sz.pad,borderRadius:6,
        background:sz.bg,border:"1px solid var(--border)",cursor:"pointer",color:"var(--text)",
        transition:"border-color .15s"
      }} onMouseEnter={e=>e.currentTarget.style.borderColor="var(--border-hover)"}
         onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{color:"var(--text-subtle)",transform:open?"rotate(90deg)":"none",display:"inline-block",transition:"transform .15s",fontSize:10}}>▸</span>
          <span style={{fontSize:14}}>📋</span>
          <span style={{flex:1,minWidth:0}}>
            <span style={{fontSize:sz.fontSize,fontWeight:sz.fontWeight,color:"var(--accent)",lineHeight:1.2}}>Planes Propios</span>
          </span>
          <span style={{fontSize:10,color:"var(--text-muted)",fontVariantNumeric:"tabular-nums",padding:"1px 6px",borderRadius:4,background:"var(--surface-alt)",flex:"0 0 auto"}}>{planesVisibles.length}/{ownFiltered.length}</span>
        </div>
      </button>
      {open && (
        <div style={{marginTop:6,paddingLeft:14,display:"flex",flexDirection:"column",gap:6}}>
          {planesVisibles.map(plan => (
            <PlanNode key={plan} plan={plan} cod={ownByPlan[plan].cod} items={ownByPlan[plan].items} onPick={onPick}/>
          ))}
        </div>
      )}
    </div>
  );
};

const V3 = ({data, onPick}) => (
  <div style={{display:"flex",flexDirection:"column",gap:6}}>
    <OrgNode node={ORG_TREE} allData={data} allDataUnfiltered={DATA} onPick={onPick}/>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// BLOQUE 5c: VISTA TABLERO (V4)
// ═══════════════════════════════════════════════════════════════

const KPI = ({label, value, sub, accent="#4f46e5", help}) => (
  <div style={{padding:"12px 16px",borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)"}}>
    <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:".05em",color:"var(--text-muted)",fontWeight:500}}>{label}</div>
    <div style={{fontSize:24,fontWeight:700,fontVariantNumeric:"tabular-nums",marginTop:4,color:accent}}>{value}</div>
    {sub && <div style={{fontSize:10,color:"var(--text-subtle)",marginTop:2}}>{sub}</div>}
    {help && <div style={{fontSize:10,color:"var(--text-subtle)",marginTop:6,fontStyle:"italic",lineHeight:1.3}}>{help}</div>}
  </div>
);

// ═══════════════════════════════════════════════════════════════
// BLOQUE 5c: VISTA ANÁLISIS (V4Analisis) — heatmaps + insights
// ═══════════════════════════════════════════════════════════════

// Helper: color del heatmap según intensidad (0..1)
const heatColor = (v, dark) => {
  if (v === 0) return dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  // Gradiente azul → violeta → rojo según intensidad
  if (v < 0.33) return `rgba(79, 70, 229, ${0.15 + v * 0.55})`;  // índigo
  if (v < 0.66) return `rgba(124, 58, 237, ${0.35 + v * 0.5})`;  // violeta
  return `rgba(225, 29, 72, ${0.45 + v * 0.5})`;                  // rojo
};

// Heatmap: Plan × Estado, agrupado por Grupo Temático (según PLAN_GRUPO)
const HeatmapPlanesEstados = ({data, dark}) => {
  const STATES = [
    {key:"No Definido",         short:"ND",  id:0},
    {key:"Levantamiento",       short:"Lev", id:1},
    {key:"Análisis y Diseño",   short:"A/D", id:2},
    {key:"Cola",                short:"Col", id:3},
    {key:"En Desarrollo",       short:"Des", id:4},
    {key:"Pruebas Internas",    short:"PI",  id:5},
    {key:"Pruebas Funcionales", short:"PF",  id:6},
    {key:"Completada",          short:"OK",  id:7},
    {key:"Recurrente",          short:"R",   id:"R"},
    {key:"Congelado",           short:"❄",   id:8},
    {key:"Descartado",          short:"✕",   id:99}
  ];

  // Agrupar por plan (cod + plan)
  const planMap = {};
  data.forEach(it => {
    const key = `${it.cod}::${it.plan}`;
    (planMap[key] = planMap[key] || {cod:it.cod, plan:it.plan, items:[]}).items.push(it);
  });

  // Asignar cada plan a su grupo temático
  const planesByGrupo = {};
  Object.values(planMap).forEach(p => {
    const g = getPlanGrupo(p.cod, p.plan);
    (planesByGrupo[g] = planesByGrupo[g] || []).push(p);
  });

  // Ordenar grupos por cantidad total de frentes, y dentro de cada grupo los planes por frentes desc
  const gruposOrd = Object.entries(planesByGrupo)
    .map(([g, planes]) => ({
      grupo: g,
      planes: planes.sort((a,b)=>b.items.length - a.items.length),
      total: planes.reduce((sum,p)=>sum+p.items.length, 0)
    }))
    .sort((a,b) => b.total - a.total);

  const maxVal = Math.max(...Object.values(planMap).flatMap(p => STATES.map(s => p.items.filter(i=>i.est===s.key).length)));

  return (
    <div style={{overflowX:"auto",borderRadius:10,border:"1px solid var(--border)",background:"var(--surface)"}}>
      <table style={{borderCollapse:"separate",borderSpacing:"2px",fontSize:11,width:"100%"}}>
        <thead>
          <tr>
            <th style={{position:"sticky",left:0,zIndex:2,padding:"8px 10px",background:"var(--surface-alt)",textAlign:"left",fontWeight:600,color:"var(--text-muted)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em",minWidth:220}}>Plan</th>
            {STATES.map(s => (
              <th key={s.key} style={{padding:"6px 4px",background:"var(--surface-alt)",textAlign:"center",fontWeight:700,color:EC[s.key],fontSize:10,minWidth:36}} title={s.key}>
                <span style={{display:"inline-block",width:18,height:18,borderRadius:9999,background:EC[s.key],color:"#fff",lineHeight:"18px",fontSize:9,fontWeight:700}}>{s.id}</span>
              </th>
            ))}
            <th style={{padding:"6px 8px",background:"var(--surface-alt)",textAlign:"center",fontWeight:600,color:"var(--text-muted)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em"}}>Σ</th>
          </tr>
        </thead>
        <tbody>
          {gruposOrd.map(({grupo, planes, total}) => {
            const gColor = GRUPO_TEMATICO_COLOR[grupo] || "#64748b";
            const gIcon  = GRUPO_TEMATICO_ICON[grupo] || "📁";
            // Suma de frentes por estado para la fila del grupo
            const byEst = {};
            STATES.forEach(s => { byEst[s.key] = 0; });
            planes.forEach(p => p.items.forEach(i => { if (byEst[i.est] !== undefined) byEst[i.est]++; }));
            return (
              <React.Fragment key={grupo}>
                {/* Fila encabezado de GRUPO */}
                <tr>
                  <td style={{position:"sticky",left:0,zIndex:1,padding:"8px 10px",background:`${gColor}25`,borderLeft:`3px solid ${gColor}`,color:gColor,fontWeight:700,fontSize:11}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:14}}>{gIcon}</span>
                      <span style={{textTransform:"uppercase",letterSpacing:".03em"}}>{grupo}</span>
                      <span style={{marginLeft:"auto",fontSize:9,opacity:0.7,fontWeight:500}}>{planes.length} pl</span>
                    </div>
                  </td>
                  {STATES.map(s => (
                    <td key={s.key} style={{padding:"6px 4px",textAlign:"center",background:`${gColor}20`,color:gColor,fontWeight:700,fontVariantNumeric:"tabular-nums",fontSize:11,borderTop:`1px solid ${gColor}40`,borderBottom:`1px solid ${gColor}40`}}>
                      {byEst[s.key] || ""}
                    </td>
                  ))}
                  <td style={{padding:"6px 8px",textAlign:"center",background:`${gColor}30`,color:gColor,fontWeight:700,fontVariantNumeric:"tabular-nums",borderTop:`1px solid ${gColor}40`,borderBottom:`1px solid ${gColor}40`}}>{total}</td>
                </tr>
                {/* Filas de planes del grupo */}
                {planes.map(p => {
                  const rowTotal = p.items.length;
                  return (
                    <tr key={p.cod+"::"+p.plan}>
                      <td style={{position:"sticky",left:0,zIndex:1,padding:"5px 10px 5px 24px",background:"var(--surface)",color:"var(--text)",borderLeft:`3px solid ${gColor}40`,borderRight:"1px solid var(--border)"}}>
                        <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11}}>
                          <span style={{color:"var(--accent)",fontWeight:700,fontFamily:"ui-monospace,monospace",fontSize:10}}>{p.cod}</span>
                          <span style={{color:"var(--text)",fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:200}} title={p.plan}>{p.plan}</span>
                        </div>
                      </td>
                      {STATES.map(s => {
                        const n = p.items.filter(i => i.est === s.key).length;
                        const intensity = maxVal ? n / maxVal : 0;
                        return (
                          <td key={s.key} style={{
                            padding:"5px 4px",textAlign:"center",
                            background: heatColor(intensity, dark),
                            color: n === 0 ? "var(--text-subtle)" : "#fff",
                            fontWeight: n === 0 ? 400 : 700,
                            fontVariantNumeric:"tabular-nums",
                            fontSize: 11
                          }} title={`${p.cod}: ${n} ${s.key}`}>
                            {n || ""}
                          </td>
                        );
                      })}
                      <td style={{padding:"5px 8px",textAlign:"center",background:"var(--surface-alt)",color:"var(--text)",fontWeight:700,fontVariantNumeric:"tabular-nums"}}>{rowTotal}</td>
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Heatmap: Persona × 3 dimensiones (planes · resp · ejec), agrupado por Grupo Temático
const HeatmapRH = ({data, dark}) => {
  const normalizeName = (raw) => {
    const n = (raw || "").trim();
    const fixes = {
      "Johanm Mauricio Carrillo Mayo": "Johann Mauricio Carrillo Mayo",
      "John Morales Chaguala":         "John Alexander Morales Chaguala"
    };
    return fixes[n] || n;
  };

  // Inicializar estructura por persona
  const personas = {};
  RH_DATA.forEach(p => { personas[p.n] = {...p, planes:0, resp:0, ejec:0}; });

  // Sumar planes (donde la persona es Responsable de Plan)
  Object.values(PLAN_RESP).forEach(name => {
    if (personas[name]) personas[name].planes++;
  });

  // Sumar frentes (resp y ejec)
  data.forEach(d => {
    const r = normalizeName(d.resp);
    const e = normalizeName(d.ejec);
    if (personas[r]) personas[r].resp++;
    if (personas[e]) personas[e].ejec++;
  });

  // Solo personas con al menos una asignación, ordenadas por carga (desc)
  const active = Object.values(personas)
    .filter(p => p.planes + p.resp + p.ejec > 0)
    .sort((a,b) => (b.planes+b.resp+b.ejec) - (a.planes+a.resp+a.ejec));

  // Máximos para normalizar intensidad del heatmap
  const mx = {
    planes: Math.max(...active.map(p=>p.planes), 1),
    resp:   Math.max(...active.map(p=>p.resp),   1),
    ejec:   Math.max(...active.map(p=>p.ejec),   1)
  };

  const dims = [
    {key:"planes", label:"Planes a Cargo",   color:"#4f46e5"},
    {key:"resp",   label:"Resp. Frente",     color:"#7c3aed"},
    {key:"ejec",   label:"Ejec. Frente",     color:"#d97706"}
  ];

  return (
    <div style={{borderRadius:10,border:"1px solid var(--border)",background:"var(--surface)",overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"separate",borderSpacing:"2px",fontSize:11}}>
        <thead>
          <tr>
            <th style={{padding:"8px 8px",background:"var(--surface-alt)",textAlign:"center",fontWeight:600,color:"var(--text-muted)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em",width:32}}>#</th>
            <th style={{position:"sticky",left:0,padding:"8px 10px",background:"var(--surface-alt)",textAlign:"left",fontWeight:600,color:"var(--text-muted)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em",minWidth:220}}>Colaborador</th>
            <th style={{padding:"8px 10px",background:"var(--surface-alt)",textAlign:"left",fontWeight:600,color:"var(--text-muted)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em",minWidth:140}}>Rol</th>
            {dims.map(d => (
              <th key={d.key} style={{padding:"8px 10px",background:"var(--surface-alt)",textAlign:"center",fontWeight:700,color:d.color,fontSize:10,textTransform:"uppercase",letterSpacing:".04em",minWidth:100}}>
                {d.label}
              </th>
            ))}
            <th style={{padding:"8px 10px",background:"var(--surface-alt)",textAlign:"center",fontWeight:600,color:"var(--text-muted)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em"}} title="Suma simple: planes + resp + ejec">Σ carga</th>
          </tr>
        </thead>
        <tbody>
          {active.map((p, idx) => {
            const sumCarga = p.planes + p.resp + p.ejec;
            return (
              <tr key={p.n}>
                <td style={{padding:"5px 8px",textAlign:"center",background:"var(--surface-alt)",color:"var(--text-muted)",fontWeight:600,fontVariantNumeric:"tabular-nums",fontSize:10}}>{idx+1}</td>
                <td style={{position:"sticky",left:0,padding:"5px 10px",background:"var(--surface)",color:"var(--text)",fontWeight:500,borderRight:"1px solid var(--border)"}}>{p.n}</td>
                <td style={{padding:"5px 10px",color:"var(--text-muted)",fontSize:11}}>{p.rol}</td>
                {dims.map(d => {
                  const v = p[d.key];
                  const intensity = mx[d.key] ? v / mx[d.key] : 0;
                  return (
                    <td key={d.key} style={{
                      padding:"5px 10px",textAlign:"center",
                      background: heatColor(intensity, dark),
                      color: v === 0 ? "var(--text-subtle)" : "#fff",
                      fontWeight: v === 0 ? 400 : 700,
                      fontVariantNumeric:"tabular-nums"
                    }}>
                      {v || "—"}
                    </td>
                  );
                })}
                <td style={{padding:"5px 10px",textAlign:"center",background:"var(--surface-alt)",color:"var(--text)",fontWeight:700,fontVariantNumeric:"tabular-nums"}}>{sumCarga}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Panel lateral de hallazgos
const InsightsPanel = ({title, insights}) => (
  <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,padding:16,display:"flex",flexDirection:"column",gap:14,height:"fit-content"}}>
    <div style={{display:"flex",alignItems:"center",gap:8,paddingBottom:10,borderBottom:"1px solid var(--border)"}}>
      <span style={{fontSize:16}}>💡</span>
      <h3 style={{fontSize:13,fontWeight:700,color:"var(--text)",margin:0}}>{title}</h3>
    </div>
    {insights.map((it, i) => (
      <div key={i} style={{display:"flex",flexDirection:"column",gap:4}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:14}}>{it.icon}</span>
          <span style={{fontSize:11,fontWeight:700,color:it.color||"var(--text)",textTransform:"uppercase",letterSpacing:".04em"}}>{it.kind}</span>
        </div>
        <p style={{fontSize:12,color:"var(--text)",lineHeight:1.5,margin:0,paddingLeft:20}}>{it.text}</p>
      </div>
    ))}
  </div>
);

const V4Analisis = ({data, dark}) => {
  // ─── Insights de Planes y Frentes ───
  const total = data.length;
  const nd = data.filter(i => i.est === "No Definido").length;
  const pctNd = Math.round(nd/total*100);
  const completados = data.filter(i => i.est === "Completada").length;
  const enDesarrollo = data.filter(i => i.est === "En Desarrollo").length;
  const recurrentes = data.filter(i => i.est === "Recurrente").length;
  const congDesc = data.filter(i => i.est==="Congelado" || i.est==="Descartado").length;
  const sinFechas = data.filter(i => i.rec !== 1 && (!i.fi || !i.ff)).length;
  const simCount = data.filter(i => i.ejeE.includes("SIM")).length;

  const insightsPlanes = [
    {kind:"Observación", icon:"📌", color:"#4f46e5",
     text:`El portafolio está organizado en 10 grupos temáticos que agrupan 26 planes y ${total} frentes. SIM (5 planes, 37 frentes) y Datos (6 planes, 28 frentes) concentran el 45% del portafolio.`},
    {kind:"Hallazgo", icon:"⚠️", color:"#d97706",
     text:`${nd} frentes (${pctNd}%) están en estado "No Definido". Casi un tercio del portafolio todavía no ha sido tipificado, lo que limita la planeación de capacidad y compromete la priorización temprana.`},
    {kind:"Hallazgo", icon:"🎯", color:"#059669",
     text:`El grupo SIM es el más diverso: tiene Apps-SIM-01 (28 frentes muy variados) junto a SICOFA, Uso y Apropiación, Armonización y Ventanilla Virtual. Requiere gobernanza consolidada para evitar superposiciones.`},
    {kind:"Hallazgo", icon:"📉", color:"#e11d48",
     text:`Implementación TIC (4 planes, 25 frentes) está 90% en fases tempranas (Levantamiento o Análisis). Hay riesgo de cuello de botella si todos avanzan simultáneamente al mismo equipo de desarrollo.`},
    {kind:"Observación", icon:"🔍", color:"#7c3aed",
     text:`Hay 4 grupos pequeños con solo 1 plan cada uno: Interoperabilidad, IOPS, Arquitectura Empresarial y Gestión Documental. Juntos aportan 17 frentes (12% del portafolio) — son dominios estratégicos pero con capacidad acotada.`},
    {kind:"Recomendación", icon:"✅", color:"#0d9488",
     text:`Cerrar primero la tipificación de los ${nd} frentes en "No Definido" (meta: llegar a 80% tipificado antes de cierre Q2). Los grupos con mejor salud (Gestión SIIx, ERP) pueden servir de benchmark de disciplina de reporte.`},
    {kind:"Recomendación", icon:"✅", color:"#0d9488",
     text:`Programar revisión trimestral de los 7 frentes Congelados para confirmar si deben pasar a Descartado o retomarse. Actualmente representan capacidad bloqueada sin decisión.`}
  ];

  // ─── Insights de Recurso Humano ───
  const insightsRH = [
    {kind:"Observación", icon:"📌", color:"#4f46e5",
     text:`5 colaboradores (Torres, Gonzalez, Pedroza, Quintero, Calderon) concentran el 79% de la responsabilidad de frentes (132 de 143). Esto refleja la estructura de liderazgo pero crea dependencia.`},
    {kind:"Hallazgo", icon:"⚠️", color:"#d97706",
     text:`Miguel Angel Torres Rodriguez tiene 39 frentes como responsable con solo 3 planes a cargo — es decir, carga muy alta en frentes con relativamente pocos planes que gestionar directamente. Posible sobreasignación operativa.`},
    {kind:"Hallazgo", icon:"⚠️", color:"#d97706",
     text:`Raul Eduardo Gonzalez Leon es responsable de 7 planes y 37 frentes. La carga total (ponderada planes + resp + ejec) lo ubica como el colaborador con mayor exposición del equipo.`},
    {kind:"Hallazgo", icon:"🔍", color:"#7c3aed",
     text:`Diego Alfonso Pedroza Castro combina 5 planes, 24 frentes como responsable y 17 como ejecutor. Es el perfil más "full-stack" del equipo, pero esto puede limitar su capacidad de delegación.`},
    {kind:"Observación", icon:"📊", color:"#4f46e5",
     text:`Los analistas de aplicaciones (12 personas) aportan ejecución en promedio a 3-4 frentes cada uno. Edward Giraldo Carvajal lidera con 13 frentes como ejecutor — segundo puesto en carga operativa después de Pedroza.`},
    {kind:"Recomendación", icon:"✅", color:"#0d9488",
     text:`Redistribuir 8-10 frentes del responsable Torres hacia Quintero (19 frentes actuales) o Calderon (13) para equilibrar el top 5 de líderes.`},
    {kind:"Recomendación", icon:"✅", color:"#0d9488",
     text:`Crear pareja backup para Pedroza (5 planes de Datos): formalizar un segundo analista senior de datos que pueda asumir responsabilidad de plan ante ausencias o rotación.`},
    {kind:"Recomendación", icon:"✅", color:"#0d9488",
     text:`Revisar los 11 nombres del CSV que no están en el catálogo RH (Analistas SEVEN, Juan Pablo Ceballos, etc.): o son roles genéricos que deben formalizarse como "equipos", o son colaboradores reales que faltan en el catálogo.`}
  ];

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>
      {/* Sección 1: Planes y Frentes */}
      <section>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,paddingBottom:10,borderBottom:"2px solid var(--border)"}}>
          <span style={{fontSize:22}}>📊</span>
          <h2 style={{fontSize:16,fontWeight:700,color:"var(--text)",margin:0}}>Planes y Frentes de Trabajo</h2>
          <span style={{fontSize:11,color:"var(--text-muted)",marginLeft:"auto"}}>Distribución de frentes por plan y estado del ciclo de vida</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.55fr) minmax(280px,1fr)",gap:16,alignItems:"flex-start"}}>
          <HeatmapPlanesEstados data={data} dark={dark}/>
          <InsightsPanel title="Hallazgos y Recomendaciones" insights={insightsPlanes}/>
        </div>
      </section>

      {/* Sección 2: Recurso Humano */}
      <section>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,paddingBottom:10,borderBottom:"2px solid var(--border)"}}>
          <span style={{fontSize:22}}>👥</span>
          <h2 style={{fontSize:16,fontWeight:700,color:"var(--text)",margin:0}}>Recurso Humano y Cargas de Trabajo</h2>
          <span style={{fontSize:11,color:"var(--text-muted)",marginLeft:"auto"}}>3 dimensiones: Planes a Cargo · Responsable de Frente · Ejecutor</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.55fr) minmax(280px,1fr)",gap:16,alignItems:"flex-start"}}>
          <HeatmapRH data={data} dark={dark}/>
          <InsightsPanel title="Hallazgos y Recomendaciones" insights={insightsRH}/>
        </div>
      </section>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// BLOQUE 5d: VISTA CRONOLOGÍA (V6Cronologia) — frentes agrupados por mes de entrega
// Usa la Fecha Final (ff) de cada frente como criterio de agrupamiento
// ═══════════════════════════════════════════════════════════════

const MESES_ES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const MESES_MAP = {"Jan":0,"Feb":1,"Mar":2,"Apr":3,"May":4,"Jun":5,"Jul":6,"Aug":7,"Sep":8,"Oct":9,"Nov":10,"Dec":11};

// Parsea "30-Nov-26" → {year:2026, month:10} (0-indexed)
const parseMesFF = (ffStr) => {
  if (!ffStr) return null;
  const parts = ffStr.split("-");
  if (parts.length !== 3) return null;
  const mo = MESES_MAP[parts[1]];
  const yr = 2000 + parseInt(parts[2]);
  if (mo === undefined || isNaN(yr)) return null;
  return {year: yr, month: mo};
};

// Card de frente para la vista cronología (similar a Row, con extras temporales)
const CronoFrenteCard = ({item, onClick}) => {
  const av = aN(item);
  const color = EC[item.est] || "#94a3b8";
  const coherente = validarAvance(item);
  return (
    <button onClick={onClick} style={{
      width:"100%", textAlign:"left", padding:"8px 12px", borderRadius:8,
      border:"1px solid var(--border)", background:"var(--surface)", color:"var(--text)",
      cursor:"pointer", transition:"all .15s"
    }} onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--border-hover)";e.currentTarget.style.background="var(--surface-hover)"}}
       onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--surface)"}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
        <span style={{width:3,alignSelf:"stretch",borderRadius:9999,background:color}}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:4}}>
            <span style={{fontSize:12,fontWeight:500,color:"var(--text)",lineHeight:1.3,display:"flex",alignItems:"flex-start",gap:4}}>
              {coherente === false && <span title="Avance fuera del rango del estado" style={{color:"#e11d48",flex:"0 0 auto",marginTop:1}}>⚠</span>}
              <span>{item.fr}</span>
            </span>
            <PriPill pri={item.pri}/>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,fontSize:10,color:"var(--text-muted)",flexWrap:"wrap",marginTop:4}}>
            <span style={{color:"var(--accent)",fontWeight:700,fontFamily:"ui-monospace,monospace",fontSize:10}}>{item.cod}</span>
            <span>·</span>
            <span style={{fontWeight:500}}>{item.resp}</span>
            <span>·</span>
            <span style={{color,fontWeight:600}}>{item.est}</span>
            {item.fi && (<><span>·</span><span title="Inicio → Fin" style={{fontVariantNumeric:"tabular-nums"}}>{item.fi} → {item.ff}</span></>)}
            <span style={{marginLeft:"auto"}}><QB item={item}/></span>
          </div>
          {av !== null && av > 0 && <div style={{marginTop:6}}><Bar v={av} c={color}/></div>}
        </div>
      </div>
    </button>
  );
};

// Plan dentro de un mes de entrega — estilo idéntico al PB de Tab Planes
const CronoPlanNode = ({plan, cod, items, onPick}) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <PB plan={plan} cod={cod} items={items} expanded={open} onToggle={()=>setOpen(!open)}/>
      {open && (
        <div style={{marginLeft:12,paddingLeft:12,borderLeft:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:6}}>
          {items.map(it => <CronoFrenteCard key={it.id} item={it} onClick={()=>onPick(it)}/>)}
        </div>
      )}
    </div>
  );
};

// Nodo de mes — header con el mes + totales, desplegable como un Grupo de Tab Planes
const CronoMesNode = ({year, month, items, onPick}) => {
  const [open, setOpen] = useState(false);
  // Determinar si este mes es pasado, actual o futuro
  const now = new Date();
  const nowYr = now.getFullYear();
  const nowMo = now.getMonth();
  const esFuturo = (year > nowYr) || (year === nowYr && month > nowMo);
  const esActual = (year === nowYr && month === nowMo);
  const color = esActual ? "#059669" : (esFuturo ? "#4f46e5" : "#94a3b8");
  const icon = esActual ? "🎯" : (esFuturo ? "📅" : "✓");

  // Agrupar items por plan, ordenados por cantidad
  const planMap = {};
  items.forEach(it => {
    if (!planMap[it.plan]) planMap[it.plan] = {cod: it.cod, items: []};
    planMap[it.plan].items.push(it);
  });
  const planes = Object.entries(planMap).sort((a,b) => b[1].items.length - a[1].items.length);
  const planesUnicos = planes.length;

  const label = `${MESES_ES[month]} ${year}`;

  return (
    <div>
      <button onClick={()=>setOpen(!open)} style={{
        width:"100%",textAlign:"left",padding:"12px 16px",borderRadius:12,
        background:`linear-gradient(90deg, ${color}18 0%, var(--surface) 100%)`,
        border:`1px solid ${color}40`,cursor:"pointer",color:"var(--text)",transition:"all .15s"
      }} onMouseEnter={e=>e.currentTarget.style.borderColor=color}
         onMouseLeave={e=>e.currentTarget.style.borderColor=`${color}40`}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{color,transform:open?"rotate(90deg)":"none",transition:"transform .15s",display:"inline-block",fontSize:14,fontWeight:700}}>▸</span>
          <span style={{fontSize:22}}>{icon}</span>
          <span style={{flex:1,fontSize:15,fontWeight:700,color}}>{label}</span>
          {esActual && <span style={{fontSize:9,color:"#fff",background:color,padding:"2px 8px",borderRadius:9999,textTransform:"uppercase",letterSpacing:".04em",fontWeight:700}}>mes actual</span>}
          <span style={{fontSize:10,color:"var(--text-muted)",fontWeight:500,fontVariantNumeric:"tabular-nums",padding:"2px 8px",borderRadius:4,background:`${color}15`,border:`1px solid ${color}30`}}>
            {planesUnicos} {planesUnicos===1?"plan":"planes"} · {items.length} frentes
          </span>
        </div>
      </button>
      {open && (
        <div style={{marginTop:10,paddingLeft:16,display:"flex",flexDirection:"column",gap:8}}>
          {planes.map(([plan, info]) => (
            <CronoPlanNode key={plan} plan={plan} cod={info.cod} items={info.items} onPick={onPick}/>
          ))}
        </div>
      )}
    </div>
  );
};

// Vista principal Cronología
const V6Cronologia = ({data, onPick, dark}) => {
  // Agrupar frentes por mes de entrega (ff). Los que no tienen ff se dejan en un bucket "Sin fecha"
  const porMes = {};  // key = "YYYY-MM" o "sin-fecha"
  const sinFecha = [];
  data.forEach(it => {
    if (it.rec === 1) return; // recurrentes no se muestran en cronología
    const m = parseMesFF(it.ff);
    if (!m) {
      sinFecha.push(it);
    } else {
      const key = `${m.year}-${String(m.month).padStart(2,'0')}`;
      (porMes[key] = porMes[key] || {year:m.year, month:m.month, items:[]}).items.push(it);
    }
  });

  // Ordenar los meses cronológicamente
  const mesesOrd = Object.entries(porMes)
    .sort((a,b) => a[0].localeCompare(b[0]))
    .map(([k, v]) => v);

  const totalProgramados = data.filter(i => i.rec !== 1 && parseMesFF(i.ff)).length;
  const totalRecurrentes = data.filter(i => i.rec === 1).length;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {/* Info header de la vista */}
      <div style={{padding:"8px 12px",borderRadius:8,background:"var(--surface-alt)",border:"1px solid var(--border)",fontSize:11,color:"var(--text-muted)",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <span>📅 Frentes agrupados por <strong style={{color:"var(--text)"}}>mes de entrega</strong> (Fecha Final)</span>
        <span>·</span>
        <span><strong style={{color:"var(--text)"}}>{totalProgramados}</strong> frentes con fecha programada</span>
        {sinFecha.length > 0 && (<><span>·</span><span><strong style={{color:"#d97706"}}>{sinFecha.length}</strong> sin fecha definida</span></>)}
        {totalRecurrentes > 0 && (<><span>·</span><span><strong style={{color:"#0d9488"}}>{totalRecurrentes}</strong> recurrentes (operación continua, no se muestran)</span></>)}
      </div>

      {mesesOrd.length === 0 && sinFecha.length === 0 && (
        <div style={{padding:24,textAlign:"center",color:"var(--text-subtle)",fontStyle:"italic",borderRadius:10,border:"1px solid var(--border)",background:"var(--surface)"}}>
          No hay frentes que coincidan con los filtros aplicados
        </div>
      )}

      {/* Meses ordenados cronológicamente */}
      {mesesOrd.map(({year, month, items}) => (
        <CronoMesNode key={`${year}-${month}`} year={year} month={month} items={items} onPick={onPick}/>
      ))}

      {/* Frentes sin fecha al final, agrupados como bloque aparte */}
      {sinFecha.length > 0 && (
        <CronoSinFechaNode items={sinFecha} onPick={onPick}/>
      )}

      {/* Análisis de cuellos de botella al final del tab */}
      <BottleneckAnalysis data={data} onPick={onPick} dark={dark}/>
    </div>
  );
};

const CronoSinFechaNode = ({items, onPick}) => {
  const [open, setOpen] = useState(false);
  const color = "#d97706";
  const planMap = {};
  items.forEach(it => {
    if (!planMap[it.plan]) planMap[it.plan] = {cod: it.cod, items: []};
    planMap[it.plan].items.push(it);
  });
  const planes = Object.entries(planMap).sort((a,b) => b[1].items.length - a[1].items.length);
  return (
    <div>
      <button onClick={()=>setOpen(!open)} style={{
        width:"100%",textAlign:"left",padding:"12px 16px",borderRadius:12,
        background:`linear-gradient(90deg, ${color}18 0%, var(--surface) 100%)`,
        border:`1px solid ${color}40`,cursor:"pointer",color:"var(--text)",transition:"all .15s"
      }} onMouseEnter={e=>e.currentTarget.style.borderColor=color}
         onMouseLeave={e=>e.currentTarget.style.borderColor=`${color}40`}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{color,transform:open?"rotate(90deg)":"none",transition:"transform .15s",display:"inline-block",fontSize:14,fontWeight:700}}>▸</span>
          <span style={{fontSize:22}}>⚠️</span>
          <span style={{flex:1,fontSize:15,fontWeight:700,color}}>Sin fecha definida</span>
          <span style={{fontSize:10,color:"var(--text-muted)",fontWeight:500,fontVariantNumeric:"tabular-nums",padding:"2px 8px",borderRadius:4,background:`${color}15`,border:`1px solid ${color}30`}}>
            {planes.length} {planes.length===1?"plan":"planes"} · {items.length} frentes
          </span>
        </div>
      </button>
      {open && (
        <div style={{marginTop:10,paddingLeft:16,display:"flex",flexDirection:"column",gap:8}}>
          {planes.map(([plan, info]) => (
            <CronoPlanNode key={plan} plan={plan} cod={info.cod} items={info.items} onPick={onPick}/>
          ))}
        </div>
      )}
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════
// BLOQUE 5d2: ANÁLISIS DE CUELLOS DE BOTELLA (BottleneckAnalysis)
// Componente final del tab Cronología
// ═══════════════════════════════════════════════════════════════

// Capacidad histórica demostrada (base para ratio)
const CAPACIDAD_MES = 6;

// Colores de fase para el gráfico apilado (mismo esquema del ciclo de vida)
const FASE_KEYS_ORDEN = [
  {k:"No Definido",         short:"ND",  color:"#94a3b8"},
  {k:"Levantamiento",       short:"Lev", color:"#a855f7"},
  {k:"Análisis y Diseño",   short:"A/D", color:"#6366f1"},
  {k:"Cola",                short:"Col", color:"#64748b"},
  {k:"En Desarrollo",       short:"Des", color:"#0ea5e9"},
  {k:"Pruebas Internas",    short:"PI",  color:"#f59e0b"},
  {k:"Pruebas Funcionales", short:"PF",  color:"#f97316"},
  {k:"Completada",          short:"OK",  color:"#10b981"}
];

// Tarjeta resumen con número grande
const BottleneckKpi = ({label, value, unit, color, onClick, items}) => (
  <button onClick={onClick} disabled={!items || !items.length} style={{
    flex:1, minWidth:150, padding:"14px 16px", borderRadius:10,
    background: `linear-gradient(135deg, ${color}20 0%, var(--surface) 100%)`,
    border: `1px solid ${color}40`,
    cursor: items && items.length ? "pointer" : "default",
    color:"var(--text)", textAlign:"left", transition:"all .15s"
  }} onMouseEnter={e => { if (items && items.length) { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = "translateY(-1px)"; } }}
     onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.transform = "none"; }}>
    <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:".05em",color:color,fontWeight:700,marginBottom:4}}>{label}</div>
    <div style={{display:"flex",alignItems:"baseline",gap:6}}>
      <span style={{fontSize:28,fontWeight:800,fontVariantNumeric:"tabular-nums",color:"var(--text)"}}>{value}</span>
      {unit && <span style={{fontSize:11,color:"var(--text-muted)",fontWeight:500}}>{unit}</span>}
    </div>
  </button>
);

// Drawer-lite para mostrar lista de frentes al clickear una KPI
const FrentesList = ({title, items, onClose, onPick}) => (
  <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} style={{width:"min(520px,100%)",background:"var(--bg)",borderLeft:"1px solid var(--border)",height:"100vh",overflow:"auto"}}>
      <div style={{padding:16,borderBottom:"1px solid var(--border)",position:"sticky",top:0,background:"var(--bg)",zIndex:1,display:"flex",alignItems:"center",gap:8}}>
        <h3 style={{fontSize:14,fontWeight:700,color:"var(--text)",margin:0,flex:1}}>{title}</h3>
        <span style={{fontSize:11,color:"var(--text-muted)"}}>{items.length} frentes</span>
        <button onClick={onClose} style={{background:"transparent",border:"none",color:"var(--text-muted)",cursor:"pointer",fontSize:18,padding:"0 4px"}}>✕</button>
      </div>
      <div style={{padding:12,display:"flex",flexDirection:"column",gap:6}}>
        {items.map(({dias, it}, idx) => (
          <button key={idx} onClick={()=>{onPick(it); onClose();}} style={{
            textAlign:"left",padding:"8px 12px",borderRadius:8,background:"var(--surface)",
            border:"1px solid var(--border)",cursor:"pointer",color:"var(--text)",transition:"all .15s"
          }} onMouseEnter={e=>e.currentTarget.style.borderColor="var(--border-hover)"}
             onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <span style={{fontSize:10,padding:"2px 6px",borderRadius:4,background: dias<=30?"rgba(225,29,72,0.15)":"rgba(217,119,6,0.15)",color: dias<=30?"#e11d48":"#d97706",fontWeight:700}}>{dias}d</span>
              <span style={{fontSize:10,color:"var(--accent)",fontWeight:700,fontFamily:"ui-monospace,monospace"}}>{it.cod}</span>
              <span style={{fontSize:10,color:EC[it.est]||"var(--text-muted)",fontWeight:600}}>{it.est}</span>
            </div>
            <div style={{fontSize:12,color:"var(--text)",lineHeight:1.3}}>{it.fr}</div>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const BottleneckAnalysis = ({data, onPick, dark}) => {
  const [listOpen, setListOpen] = useState(null);

  const today = new Date();
  const parseDMY = (s) => {
    if (!s) return null;
    const p = String(s).split("-");
    if (p.length !== 3) return null;
    return new Date(2000 + parseInt(p[2]), MESES_MAP[p[1]], parseInt(p[0]));
  };

  // Frentes programados (no recurrentes, con ff)
  const programados = data.filter(i => i.rec !== 1 && i.ff && parseDMY(i.ff));

  // ═══ Capa 1: Demanda apilada por fase × mes ═══
  const porMes = {};  // key "YYYY-MM"
  programados.forEach(it => {
    const ff = parseDMY(it.ff);
    const key = `${ff.getFullYear()}-${String(ff.getMonth()).padStart(2,'0')}`;
    if (!porMes[key]) porMes[key] = {year: ff.getFullYear(), month: ff.getMonth(), byFase: {}};
    porMes[key].byFase[it.est] = (porMes[key].byFase[it.est] || 0) + 1;
  });
  const chartData = Object.keys(porMes).sort().map(k => {
    const {year, month, byFase} = porMes[k];
    const row = {mes: `${MESES_ES[month].slice(0,3)} ${String(year).slice(2)}`, total: 0};
    FASE_KEYS_ORDEN.forEach(f => {
      row[f.k] = byFase[f.k] || 0;
      row.total += row[f.k];
    });
    return row;
  });

  // ═══ Capa 2: Radar de riesgo ═══
  const fasesTempranas = ["No Definido","Levantamiento","Análisis y Diseño","Cola"];
  const riesgoCritico = [];
  const riesgoModerado = [];
  programados.forEach(it => {
    const ff = parseDMY(it.ff);
    const dias = Math.floor((ff - today) / (1000*60*60*24));
    if (dias <= 0) return;
    if (fasesTempranas.includes(it.est)) {
      if (dias <= 30) riesgoCritico.push({dias, it});
      else if (dias <= 60) riesgoModerado.push({dias, it});
    }
  });
  riesgoCritico.sort((a,b) => a.dias - b.dias);
  riesgoModerado.sort((a,b) => a.dias - b.dias);

  // ═══ Capa 3: Tarjetas resumen ═══
  // Ratio del peor mes (el de más demanda)
  let worstMes = {mes: "—", ratio: 0, total: 0};
  chartData.forEach(row => {
    const ratio = row.total / CAPACIDAD_MES;
    if (ratio > worstMes.ratio) worstMes = {mes: row.mes, ratio, total: row.total};
  });

  // Tooltip personalizado
  const CustomTooltip = ({active, payload, label}) => {
    if (!active || !payload || !payload.length) return null;
    const total = payload.reduce((s, p) => s + (p.value || 0), 0);
    return (
      <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",fontSize:11,color:"var(--text)",boxShadow:"0 4px 12px rgba(0,0,0,0.15)"}}>
        <div style={{fontWeight:700,marginBottom:4,color:"var(--text)"}}>{label} · {total} frentes</div>
        {payload.slice().reverse().filter(p => p.value > 0).map(p => (
          <div key={p.name} style={{display:"flex",alignItems:"center",gap:6,fontSize:10,color:"var(--text-muted)"}}>
            <span style={{width:8,height:8,borderRadius:2,background:p.color}}/>
            <span style={{flex:1}}>{p.name}</span>
            <span style={{fontWeight:600,color:"var(--text)"}}>{p.value}</span>
          </div>
        ))}
        <div style={{borderTop:"1px solid var(--border)",marginTop:6,paddingTop:4,fontSize:9,color:"var(--text-subtle)"}}>
          Capacidad: {CAPACIDAD_MES}/mes · Exceso: {Math.max(0, total - CAPACIDAD_MES)}
        </div>
      </div>
    );
  };

  return (
    <section style={{marginTop:32,paddingTop:24,borderTop:"2px solid var(--border)"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
        <span style={{fontSize:22}}>🔍</span>
        <h2 style={{fontSize:16,fontWeight:700,color:"var(--text)",margin:0}}>Análisis de Cuellos de Botella</h2>
        <span style={{fontSize:11,color:"var(--text-muted)",marginLeft:"auto"}}>Demanda mensual · Presión del pipeline · Flujo cronológico</span>
      </div>

      {/* Gráfico de barras apiladas: demanda mensual por fase */}
      <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,padding:"16px 12px 8px",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:8,padding:"0 8px",gap:8,flexWrap:"wrap"}}>
          <h3 style={{fontSize:12,fontWeight:700,color:"var(--text)",margin:0,textTransform:"uppercase",letterSpacing:".04em"}}>Demanda mensual por fase del ciclo de vida</h3>
          <span style={{fontSize:10,color:"var(--text-muted)"}}>Línea punteada = capacidad histórica ({CAPACIDAD_MES}/mes)</span>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{top:10,right:16,left:0,bottom:8}}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark?"#334155":"#e2e8f0"} vertical={false}/>
            <XAxis dataKey="mes" tick={{fontSize:11,fill:dark?"#94a3b8":"#64748b"}} axisLine={{stroke:dark?"#334155":"#cbd5e1"}}/>
            <YAxis tick={{fontSize:11,fill:dark?"#94a3b8":"#64748b"}} axisLine={{stroke:dark?"#334155":"#cbd5e1"}}/>
            <Tooltip
              cursor={{fill: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"}}
              content={({active, payload, label}) => {
                if (!active || !payload || !payload.length) return null;
                const total = payload.reduce((s, p) => s + (p.value || 0), 0);
                return (
                  <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",fontSize:11,color:"var(--text)",boxShadow:"0 4px 12px rgba(0,0,0,0.15)"}}>
                    <div style={{fontWeight:700,marginBottom:4,color:"var(--text)"}}>{label} · {total} frentes</div>
                    {payload.slice().reverse().filter(p => p.value > 0).map(p => (
                      <div key={p.name} style={{display:"flex",alignItems:"center",gap:6,fontSize:10,color:"var(--text-muted)"}}>
                        <span style={{width:8,height:8,borderRadius:2,background:p.color}}/>
                        <span style={{flex:1}}>{p.name}</span>
                        <span style={{fontWeight:600,color:"var(--text)"}}>{p.value}</span>
                      </div>
                    ))}
                    <div style={{borderTop:"1px solid var(--border)",marginTop:6,paddingTop:4,fontSize:9,color:total > CAPACIDAD_MES ? "#e11d48" : "var(--text-subtle)"}}>
                      Capacidad: {CAPACIDAD_MES}/mes · Exceso: {Math.max(0, total - CAPACIDAD_MES)}
                    </div>
                  </div>
                );
              }}
            />
            <Legend wrapperStyle={{fontSize:10,paddingTop:8}} iconSize={10}/>
            <ReferenceLine y={CAPACIDAD_MES} stroke="#e11d48" strokeDasharray="4 4" strokeWidth={2}
              label={{value:`Capacidad ${CAPACIDAD_MES}`, fill:"#e11d48", fontSize:10, position:"right"}}/>
            {FASE_KEYS_ORDEN.map(f => (
              <RBar key={f.k} dataKey={f.k} stackId="a" fill={f.color} name={f.k}/>
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div style={{fontSize:10,color:"var(--text-muted)",padding:"4px 8px 0",lineHeight:1.5}}>
          <strong style={{color:"var(--text)"}}>Lectura:</strong> La altura total es la demanda del mes. Lo que queda <strong style={{color:"#e11d48"}}>sobre la línea roja</strong> es exceso sobre la capacidad del equipo. Los segmentos en colores claros (fases tempranas) son los que tienen <strong>más riesgo de no cumplirse</strong> a tiempo: aún deben recorrer varias fases antes de la fecha de entrega.
        </div>
      </div>

      {/* Presión por fase del pipeline (snapshot de hoy) */}
      {(() => {
        const totPorFase = {};
        data.filter(i => i.rec !== 1).forEach(it => {
          totPorFase[it.est] = (totPorFase[it.est] || 0) + 1;
        });
        return (
          <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 16px",marginBottom:16}}>
            <h3 style={{fontSize:12,fontWeight:700,color:"var(--text)",margin:"0 0 10px",textTransform:"uppercase",letterSpacing:".04em"}}>Presión por fase del pipeline · Hoy</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8}}>
              {FASE_KEYS_ORDEN.map(f => {
                const n = totPorFase[f.k] || 0;
                return (
                  <div key={f.k} style={{padding:"10px 12px",borderRadius:8,background:`${f.color}12`,border:`1px solid ${f.color}30`,borderLeft:`3px solid ${f.color}`}}>
                    <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:".04em",color:f.color,fontWeight:700}}>{f.k}</div>
                    <div style={{fontSize:22,fontWeight:800,fontVariantNumeric:"tabular-nums",color:"var(--text)"}}>{n}</div>
                  </div>
                );
              })}
            </div>
            <div style={{fontSize:10,color:"var(--text-muted)",marginTop:10,lineHeight:1.5}}>
              <strong style={{color:"var(--text)"}}>Lectura:</strong> A medida que los frentes avanzan en el ciclo, esta presión se desplaza de izquierda a derecha. Si <strong>No Definido</strong> es muy grande, significa capacidad bloqueada. Si <strong>Pruebas Funcionales</strong> crece, habrá dependencia del equipo funcional externo.
            </div>
          </div>
        );
      })()}

      {/* Capa 2: Flujo de transiciones entre fases a lo largo del tiempo */}
      {(() => {
        // Matriz: mes de entrega × fase en la que está hoy el frente
        // Interpretación: los frentes que entregan en un mes dado están hoy en estas fases
        // → muestra cómo se acumulará la presión en el pipeline
        const phaseFlow = {};
        FASE_KEYS_ORDEN.forEach(f => { phaseFlow[f.k] = {}; });
        chartData.forEach(row => {
          FASE_KEYS_ORDEN.forEach(f => {
            phaseFlow[f.k][row.mes] = row[f.k] || 0;
          });
        });
        const meses = chartData.map(r => r.mes);
        if (!meses.length) return null;

        // Max value para escala de opacidad
        const maxVal = Math.max(
          ...Object.values(phaseFlow).flatMap(obj => Object.values(obj))
        ) || 1;

        return (
          <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 16px",overflow:"hidden"}}>
            <h3 style={{fontSize:12,fontWeight:700,color:"var(--text)",margin:"0 0 12px",textTransform:"uppercase",letterSpacing:".04em"}}>Flujo de transiciones entre fases · Cronológico</h3>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"separate",borderSpacing:"2px",fontSize:11,minWidth:500}}>
                <thead>
                  <tr>
                    <th style={{position:"sticky",left:0,zIndex:2,padding:"6px 10px",background:"var(--surface-alt)",textAlign:"left",fontWeight:600,color:"var(--text-muted)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em",minWidth:140,whiteSpace:"nowrap"}}>Fase actual</th>
                    {meses.map(m => (
                      <th key={m} style={{padding:"6px 10px",background:"var(--surface-alt)",textAlign:"center",fontWeight:600,color:"var(--text-muted)",fontSize:10,whiteSpace:"nowrap",minWidth:70}}>{m}</th>
                    ))}
                    <th style={{padding:"6px 10px",background:"var(--surface-alt)",textAlign:"center",fontWeight:700,color:"var(--text)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em"}}>Σ</th>
                  </tr>
                </thead>
                <tbody>
                  {FASE_KEYS_ORDEN.map(f => {
                    const row = phaseFlow[f.k] || {};
                    const total = meses.reduce((s, m) => s + (row[m]||0), 0);
                    return (
                      <tr key={f.k}>
                        <td style={{position:"sticky",left:0,zIndex:1,padding:"6px 10px",background:"var(--surface)",color:f.color,fontWeight:700,fontSize:11,borderLeft:`3px solid ${f.color}`,borderRight:"1px solid var(--border)",whiteSpace:"nowrap"}}>
                          {f.k}
                        </td>
                        {meses.map(m => {
                          const v = row[m] || 0;
                          const intensity = v ? v / maxVal : 0;
                          const bg = v === 0 ? (dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.03)")
                                   : `${f.color}${Math.round((0.15 + intensity*0.65)*255).toString(16).padStart(2,'0')}`;
                          return (
                            <td key={m} title={`${v} ${f.k} que entregan en ${m}`} style={{
                              padding:"6px 10px", textAlign:"center", background: bg,
                              color: v === 0 ? "var(--text-subtle)" : (intensity > 0.3 ? "#fff" : f.color),
                              fontWeight: v === 0 ? 400 : 700,
                              fontVariantNumeric:"tabular-nums", fontSize:11
                            }}>
                              {v || ""}
                            </td>
                          );
                        })}
                        <td style={{padding:"6px 10px",textAlign:"center",background:"var(--surface-alt)",color:"var(--text)",fontWeight:700,fontVariantNumeric:"tabular-nums"}}>{total}</td>
                      </tr>
                    );
                  })}
                  {/* Fila TOTAL por mes */}
                  <tr style={{borderTop:"1px solid var(--border)"}}>
                    <td style={{position:"sticky",left:0,padding:"8px 10px",background:"var(--surface-alt)",color:"var(--text)",fontWeight:700,fontSize:10,textTransform:"uppercase",letterSpacing:".04em"}}>Total</td>
                    {meses.map(m => {
                      const t = FASE_KEYS_ORDEN.reduce((s, f) => s + (phaseFlow[f.k][m]||0), 0);
                      const excesso = t > CAPACIDAD_MES;
                      return (
                        <td key={m} style={{padding:"8px 10px",textAlign:"center",background:"var(--surface-alt)",color: excesso ? "#e11d48" : "var(--text)",fontWeight:700,fontVariantNumeric:"tabular-nums"}} title={excesso ? `Sobre capacidad histórica (${CAPACIDAD_MES}/mes)` : `Dentro de capacidad`}>
                          {t || ""}{excesso && <span style={{fontSize:9,marginLeft:3}}>⚠</span>}
                        </td>
                      );
                    })}
                    <td style={{padding:"8px 10px",textAlign:"center",background:"var(--surface-alt)",color:"var(--text)",fontWeight:700,fontVariantNumeric:"tabular-nums"}}>{chartData.reduce((s,r)=>s+r.total,0)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{fontSize:10,color:"var(--text-muted)",marginTop:10,lineHeight:1.5}}>
              <strong style={{color:"var(--text)"}}>Lectura:</strong> Cada celda muestra cuántos frentes <em>en esa fase hoy</em> tienen su entrega programada para <em>ese mes</em>. La intensidad del color refleja la concentración. La fila <strong>Total</strong> marca en <strong style={{color:"#e11d48"}}>rojo</strong> los meses que superan la capacidad histórica de {CAPACIDAD_MES} frentes/mes.
            </div>
          </div>
        );
      })()}
    </section>
  );
};


// ═══════════════════════════════════════════════════════════════
// BLOQUE 5d: VISTA EQUIPO (V5) — RH con tabla + filtros + 3 cols
// ═══════════════════════════════════════════════════════════════
const RH_DATA = [
  {n:"Giovanni Alexander Baron Mejia",rol:"Líder de Equipo",tipo:"Contratista",short:"Giovanni Baron"},
  {n:"Raul Eduardo Gonzalez Leon",rol:"Apoyo Transversal",tipo:"Contratista",short:"Raul Gonzalez"},
  {n:"Liliana Borda Parra",rol:"Apoyo Transversal",tipo:"Planta",short:"Liliana Borda"},
  {n:"Miguel Angel Quintero Lopez",rol:"Apoyo Transversal",tipo:"Planta",short:"Miguel Quintero"},
  {n:"Martha Cecilia Calderon Castro",rol:"Apoyo Transversal",tipo:"Planta",short:"Martha Calderon"},
  {n:"Martha Ines Lizarazo Torres",rol:"Apoyo Transversal",tipo:"Planta",short:"Martha Lizarazo"},
  {n:"John Jairo Fernando Cruz Garzon",rol:"Apoyo Transversal",tipo:"Planta",short:"John Cruz"},
  {n:"Diego Alfonso Pedroza Castro",rol:"Ingeniero de Datos",tipo:"Contratista",short:"Diego Pedroza"},
  {n:"Oscar Javier Sosa Parada",rol:"Ingeniero de Datos",tipo:"Contratista",short:"Oscar Sosa"},
  {n:"Diego Alejandro Sanchez Bernal",rol:"Analista Req. Datos",tipo:"Contratista",short:"Diego Sanchez"},
  {n:"Edward Heiler Giraldo Carvajal",rol:"Analista Req. Datos",tipo:"Contratista",short:"Heiler Giraldo"},
  {n:"Juan Fernando Herrera Martinez",rol:"Analista de Requerimientos",tipo:"Contratista",short:"Juan Herrera"},
  {n:"Miguel Angel Torres Rodriguez",rol:"Desarrollador Líder",tipo:"Contratista",short:"Miguel Torres"},
  {n:"Jhon Jairo Gonzalez Melo",rol:"Desarrollador",tipo:"Contratista",short:"Jhon Gonzalez"},
  {n:"Daniel Enrique Paez Puentes",rol:"Desarrollador",tipo:"Contratista",short:"Daniel Paez"},
  {n:"Wilmer Gustavo Mogollon Duque",rol:"Desarrollador",tipo:"Contratista",short:"Wilmer Mogollon"},
  {n:"Jorge Andres Alvarado Gomez",rol:"Desarrollador",tipo:"Contratista",short:"Jorge Alvarado"},
  {n:"Marisol Ferro Lopez",rol:"Desarrollador",tipo:"Contratista",short:"Marisol Ferro"},
  {n:"Nelson David Barriga Castellanos",rol:"Desarrollador",tipo:"Contratista",short:"Nelson Barriga"},
  {n:"Johann Mauricio Carrillo Mayo",rol:"Desarrollador",tipo:"Contratista",short:"Johann Carrillo"},
  {n:"Juan Carlos Pelaez Reyes",rol:"Desarrollador",tipo:"Contratista",short:"Juan Pelaez"},
  {n:"John Alexander Morales Chaguala",rol:"Analista de Aplicaciones",tipo:"Contratista",short:"John Morales"},
  {n:"Hector Heli Ariza Torres",rol:"Analista de Aplicaciones",tipo:"Contratista",short:"Hector Ariza"},
  {n:"Edwin Molano Suarez",rol:"Analista de Aplicaciones",tipo:"Contratista",short:"Edwin Molano"},
  {n:"Diego Armando Morales Gutierrez",rol:"Analista de Aplicaciones",tipo:"Contratista",short:"Diego Morales"},
  {n:"Carlos Andres Mora Llanos",rol:"Analista de Aplicaciones",tipo:"Contratista",short:"Carlos Mora"},
  {n:"Carlos Manuel Garcia Rendon",rol:"Analista de Aplicaciones",tipo:"Contratista",short:"Carlos Garcia"},
  {n:"Maria del Pilar Martinez Peralta",rol:"Analista de Aplicaciones",tipo:"Contratista",short:"Maria Martinez"},
  {n:"Yeferson Alexander Ladino Cuervo",rol:"Analista de Aplicaciones",tipo:"Contratista",short:"Yeferson Ladino"},
  {n:"Lazaro Reyes Romero",rol:"Analista de Aplicaciones",tipo:"Contratista",short:"Lazaro Reyes"},
  {n:"Diana Carolina delPilar Velandia Moreno",rol:"Analista de Aplicaciones",tipo:"Contratista",short:"Diana Velandia"},
  {n:"Martha Elizabeth Tovar Peña",rol:"Analista de Aplicaciones",tipo:"Contratista",short:"Martha Tovar"},
  {n:"Oscar Ramiro Correa Linares",rol:"Analista de Aplicaciones",tipo:"Contratista",short:"Oscar Correa"}
];

const CASOS_KPIS = {total:12921,cerrados:12541,abiertos:380,pctCierre:97.06,promMes:1174.6,medHrsAten:0.4,medHrsCierre:72};
const CASOS_MES = [
  {mes:"May 25",casos:652},{mes:"Jun 25",casos:969},{mes:"Jul 25",casos:1394},{mes:"Ago 25",casos:1092},
  {mes:"Sep 25",casos:1477},{mes:"Oct 25",casos:1182},{mes:"Nov 25",casos:1219},{mes:"Dic 25",casos:1149},
  {mes:"Ene 26",casos:1233},{mes:"Feb 26",casos:1632},{mes:"Mar 26",casos:922}
];
const CASOS_APPS = [
  {app:"SIRBE WEB",casos:7435,pct:57.54},{app:"IOPS",casos:1686,pct:13.05},{app:"AZDIGITAL",casos:1556,pct:12.04},
  {app:"SEVEN",casos:1466,pct:11.35},{app:"KACTUS",casos:232,pct:1.80},{app:"KACTUS WEB",casos:135,pct:1.04},
  {app:"COMISARIAS",casos:117,pct:0.91},{app:"SIRBE",casos:80,pct:0.62},{app:"MDS",casos:62,pct:0.48},{app:"OTRO",casos:37,pct:0.29}
];
const CASOS_ESP = [
  {esp:"Diego Morales",casos:1882,pct:14.57},{esp:"Carlos García",casos:1872,pct:14.49},
  {esp:"María Martínez",casos:1601,pct:12.39},{esp:"Yeferson Ladino",casos:1540,pct:11.92},
  {esp:"Carlos Mora",casos:1527,pct:11.82},{esp:"Héctor Ariza",casos:1007,pct:7.79},
  {esp:"Edwin Molano",casos:917,pct:7.10},{esp:"Óscar Correa",casos:688,pct:5.32},
  {esp:"Diana Velandia",casos:652,pct:5.05},{esp:"Martha Tovar",casos:607,pct:4.70},
  {esp:"Daniel Páez",casos:217,pct:1.68},{esp:"Nelson Barriga",casos:141,pct:1.09},
  {esp:"Lázaro Reyes",casos:119,pct:0.92},{esp:"Ángela Agudelo*",casos:115,pct:0.89},
  {esp:"John Morales",casos:17,pct:0.13}
];
const CASOS_SVC = [
  {svc:"Unificación de Información",casos:2700,pct:20.9},
  {svc:"Anulaciones/Cambios (<50)",casos:1966,pct:15.22},
  {svc:"Cambios Documento/Nombres",casos:1398,pct:10.82},
  {svc:"Anulaciones/Cambios (>50)",casos:568,pct:4.40},
  {svc:"Configuración",casos:564,pct:4.36},
  {svc:"Registro de Seguimiento",casos:549,pct:4.25},
  {svc:"Ajustar Proyección de Pago",casos:484,pct:3.75},
  {svc:"Parametrización",casos:482,pct:3.73},
  {svc:"Cambio",casos:395,pct:3.06},
  {svc:"Ajustar Obligaciones",casos:352,pct:2.72}
];

// Agrupamiento de colaboradores por rol funcional
const RH_GROUPS = [
  {
    key: "liderazgo",
    label: "Liderazgo & Apoyo Transversal",
    icon: "🎯",
    color: "#4f46e5",
    roles: ["Líder de Equipo", "Apoyo Transversal"]
  },
  {
    key: "datos",
    label: "Ingeniería de Datos",
    icon: "📊",
    color: "#0d9488",
    roles: ["Ingeniero de Datos"]
  },
  {
    key: "analistas_req",
    label: "Analistas de Requerimientos",
    icon: "📝",
    color: "#7c3aed",
    roles: ["Analista Req. Datos", "Analista de Requerimientos"]
  },
  {
    key: "desarrollo",
    label: "Desarrollo",
    icon: "💻",
    color: "#0284c7",
    roles: ["Desarrollador Líder", "Desarrollador"]
  },
  {
    key: "analistas_apps",
    label: "Analistas de Aplicaciones",
    icon: "🛠️",
    color: "#d97706",
    roles: ["Analista de Aplicaciones"]
  }
];

const RHGroupBlock = ({group, personas, startIdx=0}) => {
  const [open, setOpen] = useState(false);
  if (!personas.length) return null;
  const totalPlanes = personas.reduce((a,p)=>a+p.planes, 0);
  const totalResp = personas.reduce((a,p)=>a+p.nResp, 0);
  const totalEjec = personas.reduce((a,p)=>a+p.nEjec, 0);
  return (
    <div style={{borderRadius:10,border:"1px solid var(--border)",overflow:"hidden",background:"var(--surface)"}}>
      {/* Encabezado del grupo (clickeable) */}
      <button onClick={()=>setOpen(!open)} style={{
        width:"100%",textAlign:"left",padding:"10px 14px",
        background:`linear-gradient(90deg, ${group.color}18 0%, var(--surface) 100%)`,
        border:"none",borderBottom: open ? "1px solid var(--border)" : "none",
        cursor:"pointer",color:"var(--text)",display:"flex",alignItems:"center",gap:10
      }}>
        <span style={{color:group.color,transform:open?"rotate(90deg)":"none",transition:"transform .15s",display:"inline-block",fontSize:12,fontWeight:700}}>▸</span>
        <span style={{fontSize:18}}>{group.icon}</span>
        <span style={{flex:1,fontSize:13,fontWeight:700,color:group.color}}>{group.label}</span>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <span style={{fontSize:10,color:"var(--text-muted)",fontVariantNumeric:"tabular-nums",padding:"2px 8px",borderRadius:4,background:`${group.color}15`,border:`1px solid ${group.color}30`}}>
            {personas.length} pers · {totalPlanes} pl · {totalResp} resp · {totalEjec} ejec
          </span>
        </div>
      </button>
      {open && (
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead>
              <tr style={{background:"var(--surface-alt)"}}>
                <th style={{padding:"8px 10px",textAlign:"center",fontWeight:600,color:"var(--text)",borderBottom:"1px solid var(--border)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em",width:40}}>#</th>
                <th style={{padding:"8px 12px",textAlign:"left",fontWeight:600,color:"var(--text)",borderBottom:"1px solid var(--border)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em"}}>Colaborador</th>
                <th style={{padding:"8px 12px",textAlign:"left",fontWeight:600,color:"var(--text)",borderBottom:"1px solid var(--border)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em"}}>Rol</th>
                <th style={{padding:"8px 12px",textAlign:"left",fontWeight:600,color:"var(--text)",borderBottom:"1px solid var(--border)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em"}}>Vinculación</th>
                <th style={{padding:"8px 12px",textAlign:"right",fontWeight:600,color:"var(--text)",borderBottom:"1px solid var(--border)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em"}} title="Planes donde el colaborador es Responsable del Plan">Planes a Cargo</th>
                <th style={{padding:"8px 12px",textAlign:"right",fontWeight:600,color:"var(--text)",borderBottom:"1px solid var(--border)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em"}}>Resp. Frente</th>
                <th style={{padding:"8px 12px",textAlign:"right",fontWeight:600,color:"var(--text)",borderBottom:"1px solid var(--border)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em"}}>Ejec. Frente</th>
                <th style={{padding:"8px 12px",textAlign:"right",fontWeight:600,color:"var(--text)",borderBottom:"1px solid var(--border)",fontSize:10,textTransform:"uppercase",letterSpacing:".04em"}} title="Suma simple: planes + resp + ejec">Σ carga</th>
              </tr>
            </thead>
            <tbody>
              {personas.map((p, idx) => {
                const sumCarga = (p.planes||0) + (p.nResp||0) + (p.nEjec||0);
                return (
                  <tr key={p.n} style={{borderBottom:"1px solid var(--border)",background: idx%2?"transparent":"var(--surface-alt)"}}>
                    <td style={{padding:"7px 10px",textAlign:"center",color:"var(--text-muted)",fontWeight:600,fontVariantNumeric:"tabular-nums",fontSize:10}}>{startIdx+idx+1}</td>
                    <td style={{padding:"7px 12px",color:"var(--text)",fontWeight:500}}>{p.n}</td>
                    <td style={{padding:"7px 12px",color:"var(--text-muted)"}}>{p.rol}</td>
                    <td style={{padding:"7px 12px"}}>
                      <span style={{fontSize:10,padding:"2px 6px",borderRadius:4,fontWeight:600,
                        background: p.tipo==="Planta"?"rgba(13,148,136,0.15)":"rgba(217,119,6,0.15)",
                        color: p.tipo==="Planta"?"#0d9488":"#d97706"
                      }}>{p.tipo}</span>
                    </td>
                    <td style={{padding:"7px 12px",textAlign:"right",fontVariantNumeric:"tabular-nums",color:"var(--text)",fontWeight:600}}>{p.planes || "—"}</td>
                    <td style={{padding:"7px 12px",textAlign:"right",fontVariantNumeric:"tabular-nums",color:p.nResp>15?"#e11d48":"var(--text)",fontWeight:600}}>{p.nResp || "—"}</td>
                    <td style={{padding:"7px 12px",textAlign:"right",fontVariantNumeric:"tabular-nums",color:"var(--text-muted)"}}>{p.nEjec || "—"}</td>
                    <td style={{padding:"7px 12px",textAlign:"right",fontVariantNumeric:"tabular-nums",color:"var(--text)",fontWeight:700,background:"var(--surface-alt)"}}>{sumCarga}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const RHTableGrouped = ({filtered}) => {
  // Distribuir personas filtradas en sus grupos
  const byGroup = {};
  RH_GROUPS.forEach(g => { byGroup[g.key] = []; });
  filtered.forEach(p => {
    const g = RH_GROUPS.find(grp => grp.roles.includes(p.rol));
    if (g) byGroup[g.key].push(p);
  });

  if (filtered.length === 0) {
    return (
      <div style={{padding:24,textAlign:"center",color:"var(--text-subtle)",fontStyle:"italic",borderRadius:10,border:"1px solid var(--border)",background:"var(--surface)"}}>
        Sin resultados con los filtros aplicados
      </div>
    );
  }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {(() => {
        let acc = 0;
        return RH_GROUPS.map(g => {
          const start = acc;
          acc += byGroup[g.key].length;
          return <RHGroupBlock key={g.key} group={g} personas={byGroup[g.key]} startIdx={start}/>;
        });
      })()}
    </div>
  );
};

const V5 = ({dark}) => {
  const [sub, setSub] = useState("rh");
  const [fRol, setFRol] = useState("Todos");
  const [fTipo, setFTipo] = useState("Todos");
  const [fSearch, setFSearch] = useState("");

  const tooltipBg = dark ? "#0f172a" : "#ffffff";
  const tooltipBorder = dark ? "#334155" : "#e2e8f0";
  const tooltipText = dark ? "#e2e8f0" : "#0f172a";
  const axisColor = dark ? "#94a3b8" : "#64748b";
  const gridColor = dark ? "#334155" : "#cbd5e1";

  const roles = [...new Set(RH_DATA.map(p=>p.rol))].sort();
  const tipos = [...new Set(RH_DATA.map(p=>p.tipo))];

  // Normaliza nombres del CSV para resolver typos conocidos respecto al catálogo RH_DATA
  const normalizeName = (raw) => {
    const n = (raw || "").trim();
    const fixes = {
      "Johanm Mauricio Carrillo Mayo": "Johann Mauricio Carrillo Mayo",
      "John Morales Chaguala":         "John Alexander Morales Chaguala"
    };
    return fixes[n] || n;
  };

  // Cálculos por persona
  // Planes: número de planes donde aparece como Responsable de Plan (catálogo PLAN_RESP, total 26)
  // Resp. Frente: frentes donde aparece como Responsable Frente en el CSV
  // Ejec. Frente: frentes donde aparece como Ejecutor Frente en el CSV
  const stats = RH_DATA.map(p => {
    const asResp = DATA.filter(d => normalizeName(d.resp) === p.n);
    const asEjec = DATA.filter(d => normalizeName(d.ejec) === p.n);
    const planesComoResp = Object.values(PLAN_RESP).filter(r => r === p.n).length;
    return {
      ...p,
      planes: planesComoResp,
      nResp: asResp.length,
      nEjec: asEjec.length
    };
  });

  const filtered = stats.filter(p => {
    if (fRol !== "Todos" && p.rol !== fRol) return false;
    if (fTipo !== "Todos" && p.tipo !== fTipo) return false;
    if (fSearch && !p.n.toLowerCase().includes(fSearch.toLowerCase())) return false;
    return true;
  });

  const planta = RH_DATA.filter(p=>p.tipo==="Planta").length;
  const contr  = RH_DATA.filter(p=>p.tipo==="Contratista").length;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>setSub("rh")} style={{
          padding:"8px 16px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",
          background: sub==="rh"?"#4f46e5":"var(--surface)",
          color: sub==="rh"?"#fff":"var(--text-muted)",
          border: sub==="rh"?"1px solid transparent":"1px solid var(--border)",
          boxShadow: sub==="rh"?"0 2px 4px rgba(0,0,0,.1)":"none"
        }}>👥 Recurso Humano</button>
        <button onClick={()=>setSub("sop")} style={{
          padding:"8px 16px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",
          background: sub==="sop"?"#4f46e5":"var(--surface)",
          color: sub==="sop"?"#fff":"var(--text-muted)",
          border: sub==="sop"?"1px solid transparent":"1px solid var(--border)",
          boxShadow: sub==="sop"?"0 2px 4px rgba(0,0,0,.1)":"none"
        }}>🛠️ Soporte & Casos</button>
      </div>

      {sub==="rh" && (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {/* KPIs */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12}}>
            <KPI label="Total" value={RH_DATA.length} accent="#4f46e5"/>
            <KPI label="Planta" value={planta} accent="#0d9488"/>
            <KPI label="Contratistas" value={contr} accent="#d97706"/>
            <KPI label="Mostrando" value={filtered.length} accent="var(--text)"/>
          </div>

          {/* Filtros */}
          <div style={{padding:12,borderRadius:10,background:"var(--surface)",border:"1px solid var(--border)",display:"flex",flexWrap:"wrap",gap:10,alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <Search size={14} color="var(--text-muted)"/>
              <input type="text" placeholder="Buscar por nombre..." value={fSearch} onChange={e=>setFSearch(e.target.value)} style={{
                fontSize:12,padding:"5px 10px",borderRadius:6,
                background:"var(--surface-alt)",border:"1px solid var(--border)",color:"var(--text)",outline:"none",minWidth:200
              }}/>
            </div>
            <select value={fRol} onChange={e=>setFRol(e.target.value)} style={{
              fontSize:12,padding:"5px 10px",borderRadius:6,
              background:"var(--surface-alt)",border:"1px solid var(--border)",color:"var(--text)",outline:"none",cursor:"pointer"
            }}>
              <option>Todos</option>
              {roles.map(r => <option key={r}>{r}</option>)}
            </select>
            <select value={fTipo} onChange={e=>setFTipo(e.target.value)} style={{
              fontSize:12,padding:"5px 10px",borderRadius:6,
              background:"var(--surface-alt)",border:"1px solid var(--border)",color:"var(--text)",outline:"none",cursor:"pointer"
            }}>
              <option>Todos</option>
              {tipos.map(t => <option key={t}>{t}</option>)}
            </select>
            {(fRol!=="Todos"||fTipo!=="Todos"||fSearch) && (
              <button onClick={()=>{setFRol("Todos");setFTipo("Todos");setFSearch("")}} style={{
                fontSize:11,padding:"5px 10px",borderRadius:6,background:"transparent",border:"1px solid var(--border)",
                color:"var(--accent)",cursor:"pointer",fontWeight:600
              }}>Limpiar</button>
            )}
          </div>

          {/* Tabla agrupada por rol */}
          <RHTableGrouped filtered={filtered} />
        </div>
      )}

      {sub==="sop" && (
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12}}>
            <KPI label="Casos totales" value={CASOS_KPIS.total.toLocaleString()} accent="#4f46e5"/>
            <KPI label="Cerrados" value={CASOS_KPIS.cerrados.toLocaleString()} sub={`${CASOS_KPIS.pctCierre}% cierre`} accent="#059669"/>
            <KPI label="Abiertos" value={CASOS_KPIS.abiertos} accent="#d97706"/>
            <KPI label="Mediana cierre (h)" value={CASOS_KPIS.medHrsCierre} accent="#0d9488"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(360px,1fr))",gap:16}}>
            <div style={{padding:16,borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)"}}>
              <h4 style={{fontSize:12,fontWeight:600,color:"var(--text)",marginBottom:8}}>Casos por mes</h4>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={CASOS_MES}>
                  <XAxis dataKey="mes" tick={{fontSize:10,fill:axisColor}} stroke={gridColor}/>
                  <YAxis tick={{fontSize:10,fill:axisColor}} stroke={gridColor}/>
                  <Tooltip contentStyle={{background:tooltipBg,border:`1px solid ${tooltipBorder}`,borderRadius:8,fontSize:12,color:tooltipText}}/>
                  <RBar dataKey="casos" fill="#4f46e5" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{padding:16,borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)"}}>
              <h4 style={{fontSize:12,fontWeight:600,color:"var(--text)",marginBottom:8}}>Top aplicaciones</h4>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={CASOS_APPS} layout="vertical" margin={{left:10}}>
                  <XAxis type="number" tick={{fontSize:10,fill:axisColor}} stroke={gridColor}/>
                  <YAxis type="category" dataKey="app" tick={{fontSize:10,fill:axisColor}} width={100} stroke={gridColor}/>
                  <Tooltip contentStyle={{background:tooltipBg,border:`1px solid ${tooltipBorder}`,borderRadius:8,fontSize:12,color:tooltipText}}/>
                  <RBar dataKey="casos" fill="#0d9488" radius={[0,4,4,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{padding:16,borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)"}}>
              <h4 style={{fontSize:12,fontWeight:600,color:"var(--text)",marginBottom:8}}>Top especialistas</h4>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={CASOS_ESP} layout="vertical" margin={{left:10}}>
                  <XAxis type="number" tick={{fontSize:10,fill:axisColor}} stroke={gridColor}/>
                  <YAxis type="category" dataKey="esp" tick={{fontSize:10,fill:axisColor}} width={120} stroke={gridColor}/>
                  <Tooltip contentStyle={{background:tooltipBg,border:`1px solid ${tooltipBorder}`,borderRadius:8,fontSize:12,color:tooltipText}}/>
                  <RBar dataKey="casos" fill="#7c3aed" radius={[0,4,4,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{padding:16,borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)"}}>
              <h4 style={{fontSize:12,fontWeight:600,color:"var(--text)",marginBottom:8}}>Top servicios</h4>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={CASOS_SVC} layout="vertical" margin={{left:10}}>
                  <XAxis type="number" tick={{fontSize:10,fill:axisColor}} stroke={gridColor}/>
                  <YAxis type="category" dataKey="svc" tick={{fontSize:10,fill:axisColor}} width={180} stroke={gridColor}/>
                  <Tooltip contentStyle={{background:tooltipBg,border:`1px solid ${tooltipBorder}`,borderRadius:8,fontSize:12,color:tooltipText}}/>
                  <RBar dataKey="casos" fill="#d97706" radius={[0,4,4,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// BLOQUE 6: APP — header con porcentajes por estado, filtro 4+4
// ═══════════════════════════════════════════════════════════════

// Strip horizontal de % por estado
// Strip combinado: cuadros con % + filtro interactivo en el header
const StateFilterStrip = ({data, estFilter, setEst}) => {
  const total = data.length || 1;
  const counts = {};
  data.forEach(d => { counts[d.est] = (counts[d.est]||0)+1; });

  const Card = ({s, mini=false}) => {
    const active = estFilter === s.key;
    const n = counts[s.key] || 0;
    const pct = Math.round(n/total*100);
    const c = EC[s.key];
    const disabled = n === 0;
    // Tono de fondo distinto para mini (tono oscuro en lugar de blanco translúcido)
    const bgIdle   = mini ? "rgba(0,0,0,0.22)"  : "rgba(255,255,255,0.08)";
    const bgHover  = mini ? "rgba(0,0,0,0.32)"  : "rgba(255,255,255,0.14)";
    const bgDis    = mini ? "rgba(0,0,0,0.12)"  : "rgba(255,255,255,0.04)";
    const borderClr = mini ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.12)";
    return (
      <button
        onClick={() => disabled ? null : setEst(active ? null : s.key)}
        disabled={disabled}
        title={disabled ? `${s.key}: sin frentes` : `Filtrar por ${s.key} (${n} frentes)`}
        style={{
          width:"100%", textAlign:"left",
          padding: mini ? "5px 8px" : "7px 9px",
          borderRadius: mini ? 6 : 8,
          background: active ? c : (disabled ? bgDis : bgIdle),
          border: active ? `1px solid ${c}` : `1px solid ${borderClr}`,
          color:"#fff",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.45 : 1,
          transition:"all .15s",
          boxShadow: active ? `0 4px 14px ${c}66` : "none",
          display:"block"
        }}
        onMouseEnter={e => { if (!disabled && !active) e.currentTarget.style.background = bgHover; }}
        onMouseLeave={e => { if (!disabled && !active) e.currentTarget.style.background = bgIdle; }}
      >
        <div style={{display:"flex",alignItems:"center",gap:5,marginBottom: mini ? 1 : 4}}>
          <span style={{
            width: mini ? 14 : 18, height: mini ? 14 : 18, borderRadius:9999,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize: mini ? 8 : 9, fontWeight:700,color:"#fff",
            background: active ? "rgba(255,255,255,0.25)" : c,
            flex:"0 0 auto"
          }}>{s.id}</span>
          <span style={{fontSize: mini ? 9 : 10, opacity: mini ? 0.75 : 0.9, fontWeight:500, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", minWidth:0}}>{s.key}</span>
        </div>
        <div style={{display:"flex",alignItems:"baseline",gap:5}}>
          <span style={{fontSize: mini ? 12 : 18, fontWeight:700, fontVariantNumeric:"tabular-nums", color: active ? "#fff" : c}}>{pct}%</span>
          <span style={{fontSize: mini ? 8 : 10, opacity:0.7, fontVariantNumeric:"tabular-nums"}}>({n})</span>
        </div>
      </button>
    );
  };

  // Fila con cuadros distribuidos uniformemente y flechas entre ellos
  const FRow = ({items, withArrows, mini=false}) => (
    <div style={{display:"flex", alignItems:"stretch", gap:6, width:"100%"}}>
      {items.flatMap((s, i) => {
        const out = [<div key={`b${s.id}`} style={{flex:1, minWidth:0, display:"flex"}}><Card s={s} mini={mini}/></div>];
        if (withArrows && i < items.length-1) {
          out.push(<span key={`a${i}`} style={{flex:"0 0 auto", color:"rgba(255,255,255,0.4)", fontSize:16, fontWeight:600, alignSelf:"center"}}>→</span>);
        }
        return out;
      })}
    </div>
  );

  const row1 = LIFECYCLE.slice(0,4);
  const row2 = LIFECYCLE.slice(4,8);
  const row3 = LIFECYCLE_BRANCH;

  return (
    <div style={{marginTop:14}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
        <span style={{fontSize:10,textTransform:"uppercase",letterSpacing:".06em",opacity:0.65,fontWeight:600}}>Distribución y filtro por estado del ciclo de vida</span>
        {estFilter && (
          <button onClick={()=>setEst(null)} style={{fontSize:10,background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",cursor:"pointer",fontWeight:600,marginLeft:"auto",padding:"3px 10px",borderRadius:6}}>✕ Limpiar filtro</button>
        )}
      </div>

      {/* Estados principales del flujo (jerarquía mayor) */}
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        <FRow items={row1} withArrows={true}/>
        <FRow items={row2} withArrows={true}/>
      </div>

      {/* Mini-rótulo + estados paralelos (jerarquía menor) */}
      <div style={{marginTop:10,paddingTop:8,borderTop:"1px dashed rgba(255,255,255,0.1)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5}}>
          <span style={{fontSize:9,textTransform:"uppercase",letterSpacing:".06em",opacity:0.45,fontWeight:600}}>Paralelos al flujo · no son secuenciales</span>
        </div>
        <FRow items={row3} withArrows={false} mini={true}/>
      </div>
    </div>
  );
};

export default function App() {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState("planes");
  const [estFilter, setEst] = useState(null);
  const [showLife, setShowLife] = useState(false);
  const [picked, setPicked] = useState(null);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // Filtrado combinado: por estado y por búsqueda de texto (busca en frente, plan, cod, responsable y ejecutor)
  const filtered = useMemo(() => {
    let out = DATA;
    if (estFilter) out = out.filter(i => i.est === estFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter(i =>
        (i.fr || "").toLowerCase().includes(q) ||
        (i.plan || "").toLowerCase().includes(q) ||
        (i.cod || "").toLowerCase().includes(q) ||
        (i.resp || "").toLowerCase().includes(q) ||
        (i.ejec || "").toLowerCase().includes(q) ||
        (i.area || "").toLowerCase().includes(q)
      );
    }
    return out;
  }, [estFilter, search]);
  const t = T(dark);

  const tabs = [
    {id:"planes",     label:"Planes",     icon:"📊"},
    {id:"areas",      label:"Áreas SDIS", icon:"🏛️"},
    {id:"cronologia", label:"Cronología", icon:"📅"},
    {id:"analisis",   label:"Análisis",   icon:"🔍"},
    {id:"equipo",     label:"Equipo",     icon:"👥"}
  ];

  // CSS variables aplicadas al wrapper raíz (responde al toggle)
  const cssVars = {
    "--bg": t.bg, "--surface": t.surface, "--surface-alt": t.surfaceAlt, "--surface-hover": t.surfaceHover,
    "--text": t.text, "--text-muted": t.textMuted, "--text-subtle": t.textSubtle,
    "--border": t.border, "--border-hover": t.borderHover,
    "--accent": t.accent, "--accent-bg": t.accentBg
  };

  return (
    <div style={{...cssVars, background:t.bg, color:t.text, minHeight:"100vh", transition:"background .2s, color .2s",
      fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"}}>
      {/* HEADER */}
      <header style={{background:t.headerBg, color:t.headerText, borderBottom:`1px solid ${dark?"#1e293b":"#3730a3"}`}}>
        <div style={{maxWidth:1280, margin:"0 auto", padding:"20px"}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16}}>
            <div style={{minWidth:0}}>
              <h1 style={{fontSize:22,fontWeight:700,letterSpacing:"-.01em",margin:0}}>Hoja de Ruta Interactiva 2026</h1>
              <p style={{fontSize:12,opacity:0.75,margin:"2px 0 0"}}>TeamSIIx · Subdirección de Investigación e Información · SDIS Bogotá</p>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
              {(tab==="planes"||tab==="areas"||tab==="cronologia") && (
                searchOpen ? (
                  <div style={{display:"inline-flex",alignItems:"center",gap:4,padding:"4px 8px 4px 10px",borderRadius:8,background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)"}}>
                    <Search size={14} style={{color:"rgba(255,255,255,0.7)",flexShrink:0}}/>
                    <input
                      autoFocus
                      type="text"
                      value={search}
                      onChange={e=>setSearch(e.target.value)}
                      placeholder="Buscar plan, frente, responsable..."
                      style={{
                        background:"transparent",border:"none",outline:"none",
                        color:"#fff",fontSize:12,padding:"2px 4px",
                        minWidth:220,fontFamily:"inherit"
                      }}
                      onKeyDown={e => { if (e.key === "Escape") { setSearch(""); setSearchOpen(false); } }}
                    />
                    <button onClick={()=>{setSearch(""); setSearchOpen(false);}} title="Cerrar búsqueda" style={{
                      display:"inline-flex",alignItems:"center",justifyContent:"center",
                      width:22,height:22,borderRadius:4,
                      background:"transparent",color:"rgba(255,255,255,0.7)",border:"none",
                      cursor:"pointer",fontSize:14,lineHeight:1,flexShrink:0
                    }}>✕</button>
                  </div>
                ) : (
                  <button onClick={()=>setSearchOpen(true)} title="Buscar" style={{
                    display:"inline-flex",alignItems:"center",justifyContent:"center",width:36,height:36,borderRadius:8,
                    background:"rgba(255,255,255,0.1)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",
                    cursor:"pointer",transition:"background .15s"
                  }} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.2)"}
                     onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
                    <Search size={16}/>
                  </button>
                )
              )}
              <button onClick={()=>setShowLife(true)} style={{
                display:"inline-flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:8,
                background:"rgba(255,255,255,0.1)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",
                fontSize:12,fontWeight:500,cursor:"pointer",transition:"background .15s"
              }} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.2)"}
                 onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
                <Activity size={14}/> Ciclo de vida
              </button>
              <button onClick={()=>setDark(!dark)} title={dark?"Modo claro":"Modo oscuro"} style={{
                display:"inline-flex",alignItems:"center",justifyContent:"center",width:36,height:36,borderRadius:8,
                background:"rgba(255,255,255,0.1)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",
                cursor:"pointer",transition:"background .15s"
              }} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.2)"}
                 onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
                {dark ? <Sun size={16}/> : <Moon size={16}/>}
              </button>
            </div>
          </div>

          {/* KPIs principales del portafolio */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:8,marginTop:18}}>
            <div style={{padding:"8px 12px",borderRadius:8,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)"}}>
              <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:".05em",opacity:0.7}}>Planes</div>
              <div style={{fontSize:18,fontWeight:700,fontVariantNumeric:"tabular-nums"}}>{new Set(DATA.map(i=>i.plan)).size}</div>
            </div>
            <div style={{padding:"8px 12px",borderRadius:8,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)"}}>
              <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:".05em",opacity:0.7}}>Frentes</div>
              <div style={{fontSize:18,fontWeight:700,fontVariantNumeric:"tabular-nums"}}>{DATA.length}</div>
            </div>
            {(() => {
              const act = DATA.filter(i => ["En Desarrollo","Pruebas Internas","Pruebas Funcionales"].includes(i.est)).length;
              return (
                <div style={{padding:"8px 12px",borderRadius:8,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)"}} title="Frentes en estados operativos: Desarrollo, Pruebas Internas y Pruebas Funcionales">
                  <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:".05em",opacity:0.7}}>🎯 Activos</div>
                  <div style={{fontSize:18,fontWeight:700,fontVariantNumeric:"tabular-nums"}}>{act}</div>
                </div>
              );
            })()}
            {(() => {
              const comp = DATA.filter(i => i.est === "Completada").length;
              return (
                <div style={{padding:"8px 12px",borderRadius:8,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)"}} title="Frentes finalizados a satisfacción">
                  <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:".05em",opacity:0.7}}>✅ Completados</div>
                  <div style={{fontSize:18,fontWeight:700,fontVariantNumeric:"tabular-nums"}}>{comp}</div>
                </div>
              );
            })()}
            <div style={{padding:"8px 12px",borderRadius:8,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)"}} title="Colaboradores del equipo TeamSIIx">
              <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:".05em",opacity:0.7}}>👥 Equipo</div>
              <div style={{fontSize:18,fontWeight:700,fontVariantNumeric:"tabular-nums"}}>{RH_DATA.length}</div>
            </div>
          </div>

          {/* Strip combinado: cuadros con % que actúan como filtro */}
          <StateFilterStrip data={DATA} estFilter={estFilter} setEst={setEst}/>
        </div>
      </header>

      {/* TABS */}
      <div style={{background:"var(--surface)",borderBottom:"1px solid var(--border)",position:"sticky",top:0,zIndex:30}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 12px",display:"flex",gap:4,overflowX:"auto"}}>
          {tabs.map(tt => (
            <button key={tt.id} onClick={()=>setTab(tt.id)} style={{
              padding:"12px 16px",fontSize:12,fontWeight:600,whiteSpace:"nowrap",
              border:"none",borderBottom: tab===tt.id ? `2px solid ${t.accent}` : "2px solid transparent",
              background:"transparent",
              color: tab===tt.id ? t.accent : t.textMuted,
              cursor:"pointer",transition:"color .15s"
            }}>
              <span style={{marginRight:6}}>{tt.icon}</span>{tt.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENIDO */}
      <main style={{maxWidth:1280,margin:"0 auto",padding:"20px 16px"}}>
        {(estFilter || search) && (tab==="planes"||tab==="areas"||tab==="cronologia") && (
          <div style={{marginBottom:16,padding:"8px 12px",borderRadius:8,background:"var(--accent-bg)",border:"1px solid var(--border)",fontSize:12,color:"var(--accent)"}}>
            Mostrando <span style={{fontWeight:700}}>{filtered.length}</span> frente{filtered.length!==1?"s":""}
            {estFilter && <> en estado <span style={{fontWeight:700}}>{estFilter}</span></>}
            {search && <> que coinciden con "<span style={{fontWeight:700}}>{search}</span>"</>}
          </div>
        )}
        {tab==="planes"     && <V2 data={filtered} onPick={setPicked}/>}
        {tab==="areas"      && <V3 data={filtered} onPick={setPicked}/>}
        {tab==="cronologia" && <V6Cronologia data={filtered} onPick={setPicked} dark={dark}/>}
        {tab==="analisis"   && <V4Analisis data={DATA} dark={dark}/>}
        {tab==="equipo"     && <V5 dark={dark}/>}
      </main>

      <footer style={{borderTop:"1px solid var(--border)",padding:"16px",textAlign:"center",fontSize:10,color:"var(--text-subtle)"}}>
        v11 · TeamSIIx · {DATA.length} frentes · {new Set(DATA.map(i=>i.plan)).size} planes
      </footer>

      {showLife && <LifecycleModal onClose={()=>setShowLife(false)}/>}
      {picked && <Drawer item={picked} onClose={()=>setPicked(null)}/>}
    </div>
  );
}

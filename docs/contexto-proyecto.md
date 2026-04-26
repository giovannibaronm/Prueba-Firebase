# Contexto persistente del proyecto

Este documento funciona como memoria externa del proyecto. Si el chat se reinicia, se compacta el contexto o una nueva sesion de Codex/VS Code necesita retomar el trabajo, leer este archivo primero.

Mantener este archivo actualizado cuando cambien arquitectura, rutas, variables de entorno, integraciones, despliegue, decisiones tecnicas o pendientes relevantes.

## Resumen

Aplicacion Next.js desplegada en Firebase App Hosting, conectada a GitHub y con integraciones de prueba hacia Firestore y Azure DevOps.

Objetivo de aprendizaje: entender una base full-stack moderna con frontend React/JSX, backend en rutas API de Next.js, base de datos Firebase/Firestore, despliegue automatico desde GitHub y consumo de APIs externas del lado servidor.

## Repositorio

- GitHub: https://github.com/giovannibaronm/Prueba-Firebase
- Rama principal: `main`
- Deploy: Firebase App Hosting

## Arquitectura

```text
Navegador
  -> React / JSX
  -> Next.js App Router
  -> API Routes del servidor
  -> Firebase Admin / Azure DevOps REST API
  -> Firestore / Azure Boards
```

## Rutas principales

- `/`
  - Home de aprendizaje.
  - Formulario simple que guarda dos campos en Firestore.
  - Boton de prueba para consultar Work Items de Azure DevOps.
  - Descargas de datos Azure DevOps en JSON crudo, JSON organizado y CSV del arbol.

- `/TeamSIIx`
  - Tablero JSX importado desde `hoja_ruta_2026_v44.jsx`.
  - Usa React client component, `lucide-react` y `recharts`.

- `/api/registros`
  - Backend para leer y crear registros en Firestore.
  - Usa `lib/firebase-admin.js`.

- `/api/azure-devops/workitems`
  - Backend para consultar Azure DevOps.
  - Lee Work Items, comentarios y relaciones de jerarquia.
  - Devuelve:
    - `raw`: respuesta cruda de Azure DevOps.
    - `workItems`: datos normalizados.
    - `tree`: arbol organizado por relaciones padre/hijo.

## Variables de entorno

### Firebase

- `FIREBASE_PROJECT_ID`
  - ID del proyecto Firebase/GCP.
  - En App Hosting, Firebase tambien inyecta variables propias como `FIREBASE_CONFIG`.

### Azure DevOps

- `AZDO_ORG`
  - Organizacion Azure DevOps.
  - Valor actual en `apphosting.yaml`: `SecretariaIntegracionSocial`

- `AZDO_PROJECT`
  - Proyecto Azure DevOps.
  - Valor actual en `apphosting.yaml`: `Fabrica de datos`

- `AZDO_LIMIT`
  - Cantidad de Work Items a traer.
  - Valor actual: `50`

- `AZDO_TOKEN`
  - Personal Access Token de Azure DevOps.
  - Permiso minimo: `Work Items: Read`.
  - No debe guardarse en GitHub.
  - Configurar como variable runtime del backend en Firebase App Hosting.

## Azure DevOps

La integracion actual consulta los ultimos Work Items modificados del proyecto.

Flujo:

1. Ejecuta WIQL para obtener IDs.
2. Llama `workitemsbatch` con `$expand: "Relations"` para traer campos y relaciones.
3. Para cada Work Item consulta hasta 3 comentarios recientes.
4. Normaliza campos estandar.
5. Extrae campos no estandar en `customFields`.
6. Construye un arbol usando relaciones:
   - `System.LinkTypes.Hierarchy-Forward`
   - `System.LinkTypes.Hierarchy-Reverse`

Campos normalizados actualmente:

- `id`
- `type`
- `title`
- `state`
- `assignedTo`
- `changedDate`
- `createdDate`
- `description`
- `priority`
- `startDate`
- `dueDate`
- `targetDate`
- `tags`
- `customFields`
- `relations`
- `comments`

Nota: si un padre no esta dentro de los 50 Work Items consultados, el hijo puede aparecer como raiz temporal. Para precision completa, una mejora futura seria traer padres faltantes automaticamente o consultar por una raiz especifica.

## Firestore

Coleccion actual:

- `registros`

Uso:

- Demo de dos campos desde la home.
- Escritura y lectura pasan por backend Next.js, no directo desde el navegador.

Reglas actuales:

- `firestore.rules` bloquea acceso directo cliente.
- La app usa Firebase Admin SDK en servidor.

## Archivos clave

- `app/page.jsx`
  - UI principal.
  - Formulario Firestore.
  - Prueba Azure DevOps.
  - Descargas JSON/CSV.

- `app/api/azure-devops/workitems/route.js`
  - Integracion Azure DevOps.
  - Normalizacion de campos.
  - Construccion del arbol.

- `app/api/registros/route.js`
  - API Firestore.

- `lib/firebase-admin.js`
  - Inicializacion Firebase Admin.

- `app/TeamSIIx/page.jsx`
  - Tablero TeamSIIx.

- `apphosting.yaml`
  - Configuracion Firebase App Hosting.
  - No guardar secretos aqui.

- `.env.example`
  - Plantilla de variables.

## Historial de hitos

- Se creo proyecto Next.js con React/JSX.
- Se configuro Firebase App Hosting desde GitHub.
- Se agrego `package-lock.json` porque App Hosting exige lockfile.
- Se integro tablero TeamSIIx como ruta `/TeamSIIx`.
- Se conecto Azure DevOps mediante API route del servidor.
- Se agrego consulta de Work Items y comentarios.
- Se aumento limite a 50 Work Items.
- Se agrego arbol de jerarquia.
- Se corrigio error Azure DevOps 400 por usar `fields` junto con `$expand`.
- Se agregaron descargas:
  - JSON crudo.
  - JSON organizado.
  - CSV del arbol.
- Se agrego extraccion automatica de campos personalizados en `customFields`.

## Pendientes sugeridos

- Crear ruta dedicada `/DevOps` para separar la prueba de la home.
- Integrar Azure DevOps dentro del tablero `/TeamSIIx`.
- Traer padres faltantes automaticamente para mejorar el arbol.
- Agregar filtros por tipo, estado, responsable y texto.
- Guardar snapshot/cache en Firestore para consultas rapidas.
- Convertir el proyecto a TypeScript.
- Separar componentes grandes en archivos menores.
- Agregar autenticacion antes de exponer vistas internas.

## Regla de mantenimiento

Cada vez que se haga un cambio relevante, actualizar este archivo en el mismo commit o en un commit inmediatamente posterior.

Cambios que deben registrarse:

- Nuevas rutas.
- Nuevas variables de entorno.
- Nuevas integraciones.
- Cambios de arquitectura.
- Decisiones tecnicas importantes.
- Errores de despliegue resueltos.
- Pendientes importantes.

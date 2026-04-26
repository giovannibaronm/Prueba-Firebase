# Hola Firebase Next

Aplicacion full-stack minima para aprender las capas principales:

- Frontend: React con JSX en `app/page.jsx`.
- Tablero TeamSIIx: ruta `/TeamSIIx` en `app/TeamSIIx/page.jsx`.
- Backend: API route de Next.js en `app/api/registros/route.js`.
- Base de datos: Cloud Firestore usando Firebase Admin en `lib/firebase-admin.js`.

## Crear Firebase

1. Entra a <https://console.firebase.google.com/>.
2. Crea un proyecto.
3. Activa **Firestore Database**.
4. Copia el ID del proyecto.

## Variables de entorno

Crea un archivo `.env.local` basado en `.env.example`:

```bash
FIREBASE_PROJECT_ID=tu-proyecto-firebase
```

Para correr localmente, tienes dos caminos:

- Usar Google Application Default Credentials con `gcloud auth application-default login`.
- O crear una service account y definir `GOOGLE_APPLICATION_CREDENTIALS` apuntando al JSON local.

No subas credenciales a GitHub.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Luego abre <http://localhost:3000>.

## Subir a GitHub

```bash
git add .
git commit -m "Crear app Next con Firebase"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/hola-firebase-next.git
git push -u origin main
```

## Conectar con Firebase App Hosting

1. En Firebase Console, abre **App Hosting**.
2. Crea un backend.
3. Conecta GitHub y elige este repositorio.
4. Usa `main` como rama live.
5. Deja la raiz de la app como `/`.
6. Configura `FIREBASE_PROJECT_ID` como variable de entorno si Firebase no la detecta automaticamente.
7. Finaliza y despliega.

App Hosting hara un nuevo despliegue cuando hagas push a `main`.

## Notas de aprendizaje

- `app/page.jsx` es un componente cliente: maneja inputs, estado y llamadas `fetch`.
- `app/api/registros/route.js` es backend: valida datos y habla con Firestore.
- `lib/firebase-admin.js` inicializa Firebase Admin en el servidor.
- `firestore.rules` bloquea acceso directo desde clientes. La escritura pasa por el backend.
- `apphosting.yaml` configura recursos de App Hosting sin guardar secretos en el repo.

## Azure DevOps

La home incluye un boton de prueba para traer Work Items y sus ultimos comentarios desde Azure DevOps.

Configura estas variables:

```bash
AZDO_ORG=tu-organizacion
AZDO_PROJECT=tu-proyecto
AZDO_LIMIT=10
AZDO_TOKEN=tu-token-con-permiso-work-items-read
```

`AZDO_TOKEN` debe agregarse como variable de entorno runtime en Firebase App Hosting o en tu entorno local. No lo guardes en GitHub.

Para probar rapido en Firebase Console, abre tu backend de App Hosting, entra a configuracion de variables de entorno y agrega `AZDO_TOKEN` como variable runtime. Luego vuelve a desplegar el backend desde App Hosting.

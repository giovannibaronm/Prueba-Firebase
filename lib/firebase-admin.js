import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export function getDb() {
  if (!getApps().length) {
    initializeApp(getFirebaseAdminConfig());
  }

  return getFirestore();
}

function getFirebaseAdminConfig() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (serviceAccountJson) {
    return {
      credential: cert(JSON.parse(serviceAccountJson)),
      projectId,
    };
  }

  return {
    credential: applicationDefault(),
    projectId,
  };
}

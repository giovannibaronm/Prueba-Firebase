import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

const COLLECTION = "registros";

export async function GET() {
  try {
    const snapshot = await getDb()
      .collection(COLLECTION)
      .orderBy("creadoEn", "desc")
      .limit(20)
      .get();

    const registros = snapshot.docs.map((doc) => ({
      id: doc.id,
      campo1: doc.data().campo1 ?? "",
      campo2: doc.data().campo2 ?? "",
    }));

    return NextResponse.json({ registros });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudieron leer los registros de Firestore." },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const campo1 = cleanText(body.campo1);
    const campo2 = cleanText(body.campo2);

    if (!campo1 || !campo2) {
      return NextResponse.json(
        { error: "Los dos campos son obligatorios." },
        { status: 400 },
      );
    }

    const doc = await getDb().collection(COLLECTION).add({
      campo1,
      campo2,
      creadoEn: new Date(),
    });

    return NextResponse.json(
      {
        id: doc.id,
        campo1,
        campo2,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo guardar el registro en Firestore." },
      { status: 500 },
    );
  }
}

function cleanText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, 80);
}

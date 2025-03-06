import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, unsubscribe } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    await resend.contacts.update({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      unsubscribed: unsubscribe,
    });

    return NextResponse.json({ message: unsubscribe ? "Désinscription réussie" : "Réinscription réussie" }, { status: 200 });
  } catch (error) {
    console.error("Erreur Resend:", error);
    return NextResponse.json({ error: "Erreur Resend" }, { status: 500 });
  }
}
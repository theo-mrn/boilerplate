import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email requis" }, { status: 400 });
  }

  try {
    const contact = await resend.contacts.get({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });
    
    return NextResponse.json({ unsubscribed: contact?.data?.unsubscribed ?? false }, { status: 200 });
  } catch (error) {
    console.error("Erreur Resend:", error);
    return NextResponse.json({ error: "Erreur Resend" }, { status: 500 });
  }
}
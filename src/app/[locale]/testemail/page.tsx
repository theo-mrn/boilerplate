"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function TestEmailPage() {
  const { data: session } = useSession();
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      checkSubscription(session.user.email);
    }
  }, [session]);

  async function checkSubscription(email: string) {
    try {
      const res = await fetch(`/api/resend/subscription-status?email=${email}`);
      const data = await res.json();
      setSubscribed(!data.unsubscribed); // Si `unsubscribed` est `false`, alors il est abonné
    } catch (error) {
      console.error("Erreur lors de la vérification de l'abonnement", error);
    }
  }

  async function toggleSubscription() {
    if (!session?.user?.email) return;

    setLoading(true);
    setMessage("");

    const newStatus = !subscribed;

    const res = await fetch("/api/resend/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email, unsubscribe: !newStatus }),
    });

    if (res.ok) {
      setSubscribed(newStatus);
      setMessage(newStatus ? "Vous êtes maintenant abonné." : "Vous êtes désinscrit.");
    } else {
      setMessage("Erreur lors de la mise à jour de votre abonnement.");
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-xl font-bold text-center mb-4">Gestion de l'abonnement</h1>

        {session ? (
          <>
            <p className="text-center mb-2">
              Statut : {subscribed === null ? "Chargement..." : subscribed ? "Abonné ✅" : "Désinscrit ❌"}
            </p>
            <button
              onClick={toggleSubscription}
              disabled={loading}
              className={`p-2 w-full rounded-md text-white ${subscribed ? "bg-red-500" : "bg-green-500"}`}
            >
              {loading ? "Mise à jour..." : subscribed ? "Se désinscrire" : "S'abonner"}
            </button>
          </>
        ) : (
          <p className="text-center text-gray-500">Veuillez vous connecter.</p>
        )}

        {message && <p className="text-center mt-2 text-sm">{message}</p>}
      </div>
    </div>
  );
}
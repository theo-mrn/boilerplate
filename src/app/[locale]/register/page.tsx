"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      // Connexion automatique après l'inscription
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Erreur lors de la connexion automatique");
        setLoading(false);
        return;
      }

      router.push("/account");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-green-500 p-6 rounded-lg shadow-md w-80">
        <h1 className="text-xl font-bold text-center mb-4">Inscription</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleRegister} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-md mb-2"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-md mb-2"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <div className="text-center my-3 text-gray-500">Ou</div>

        <button
          onClick={() => signIn("google")}
          className="bg-red-500 text-white p-2 rounded-md w-full"
        >
          Connexion avec Google
        </button>
      </div>
    </div>
  );
}
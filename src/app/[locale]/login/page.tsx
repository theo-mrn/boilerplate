"use client";
import { Header } from "@/components/sections/Headerwithoutconnection";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou mot de passe incorrect");
      } else {
        router.push("/account");
        router.refresh();
      }
    } catch {
      setError("Une erreur est survenue");
    }

    setLoading(false);
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/account" });
  };

  return (
    <div className="grid lg:grid-cols-2 w-full min-h-screen">
      <Header name="Login" />
      {/* Image Section */}
      <div className="relative hidden lg:block">
        <Image
          src="/placeholder.svg"
          alt="Login illustration"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Form Section */}
      <div className="flex items-center justify-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>

          {error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} type="button">
              <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Login with Google
            </Button>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
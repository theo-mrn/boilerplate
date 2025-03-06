import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
          },
        });

        if (!user || !user.password) return null;

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) return null;

        // Ne pas renvoyer le mot de passe
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login', // Page d'erreur d'authentification
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
    async signIn({ user }) {
      if (!user.email) return true;
      
      try {
        await resend.contacts.create({
          email: user.email,
          audienceId: process.env.RESEND_AUDIENCE_ID!,
          unsubscribed: false,
        });
        console.log(`Utilisateur ajouté à Resend: ${user.email}`);
      } catch (error) {
        console.error("Erreur lors de l'ajout à Resend", error);
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Empêcher la redirection vers la page de connexion
      if (url.startsWith(baseUrl)) {
        if (url.includes('/login')) {
          return baseUrl + '/account';
        }
        return url;
      } else if (url.startsWith('/')) {
        return baseUrl + url;
      }
      return baseUrl;
    },
  },
  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        // Admin 1
        if (
          email === process.env.ADMIN1_EMAIL &&
          password === process.env.ADMIN1_PASSWORD
        ) {
          return {
            id: "1",
            email: process.env.ADMIN1_EMAIL,
            name: process.env.ADMIN1_NAME,
            role: "admin",
          };
        }

        // Admin 2
        if (
          email === process.env.ADMIN2_EMAIL &&
          password === process.env.ADMIN2_PASSWORD
        ) {
          return {
            id: "2",
            email: process.env.ADMIN2_EMAIL,
            name: process.env.ADMIN2_NAME,
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  trustHost: true,
});

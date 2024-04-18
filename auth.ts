import NextAuth, { NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";

export const config : NextAuthConfig = {
  providers: [github({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  })],
  basePath: "/api/auth",
  callbacks: {
    authorized({request, auth}) {
      try {
        const { pathname } = request.nextUrl;
        if (pathname === "/protected-page") return !! auth;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    jwt({token, trigger, session}) {
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
  },
};

export const {handlers, auth, signIn, signOut} = NextAuth(config);
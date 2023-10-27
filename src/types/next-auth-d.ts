import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      userId?: string | null;
      bookmarks?: number[];
    } & DefaultSession["user"];
  }
}

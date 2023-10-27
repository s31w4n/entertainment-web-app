import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@user.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials not provided");
        }

        const client = await connectToDatabase();
        const userCollection = client
          .db("entertainment-web-app")
          .collection("users");
        const user = await userCollection.findOne({ email: credentials.email });

        console.log("logs the user ", user);

        if (!user) {
          client.close();
          throw new Error("User not found");
        }

        if (credentials.password.trim().length === 0) {
          client.close();
          throw new Error("Can't be empty");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        );

        if (!isValid) {
          client.close();
          throw new Error("Wrong password");
        }

        client.close();
        return user as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("jwt callback: ", { token, user, session });
      if (user) {
        return {
          ...token,
          userId: user.id,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("session callback: ", { token, user, session });
      return {
        ...session,
        user: {
          ...session.user,
          userId: token.id,
        },
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/auth";

export const authOptions = {
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
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // pass in userId and user bookmarks to token
      if (user) {
        return {
          ...token,
          userId: user._id,
          bookmarks: user.bookmarks,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // pass in userId and user bookmarks to session
      return {
        ...session,
        user: {
          ...session.user,
          userId: token.userId,
          bookmarks: token.bookmarks,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

import { connectToDatabase } from "@/lib/db";
import { verifyPassword, hashPassword } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next/types";
import * as jwt from "jsonwebtoken";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;

  const client = await connectToDatabase();
  const userCollection = client.db("entertainment-web-app").collection("users");
  const user = await userCollection.findOne({ email: email });

  if (!user) {
    client.close();
    throw new Error("User not found");
  }

  if (password.trim().length === 0) {
    client.close();
    throw new Error("Can't be empty");
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    client.close();
    throw new Error("Wrong password");
  }

  client.close();

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("Something went wrong!");
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, secret, {
    expiresIn: "3d",
  });

  res.status(201).json({
    userId: user.id.toString(),
    token: token,
    bookmarks: user.bookmarks,
  });
}

export default handler;

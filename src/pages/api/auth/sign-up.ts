import { connectToDatabase } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next/types";
import * as jwt from "jsonwebtoken";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email, password } = data;

  if (!email || !email.includes("@")) {
    res.status(422).json({
      message: "Invalid email",
      field: "email",
    });
    return;
  }

  if (!password || password.trim().length < 8) {
    res.status(422).json({
      message: "Minimum 8 characters long",
      field: "password",
    });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db("entertainment-web-app");

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User exists already!", field: "email" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  try {
    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
      bookmarks: [],
    });

    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
      throw new Error("Something went wrong!");
    }

    const token = jwt.sign(
      { userId: result.insertedId, email: email },
      secret,
      { expiresIn: "3d" },
    );

    res.status(201).json({
      message: "Created user!",
      status: "success",
      token,
      userId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Signing up failed, please try again.",
      status: "error",
    });
  } finally {
    client.close();
  }
}

export default handler;

import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next/types";
import { verifyPassword } from "@/lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email, password } = data;

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
  return {
    email: user.email,
    id: user._id.toString(),
    bookmarks: user.bookmarks,
  };
}

export default handler;

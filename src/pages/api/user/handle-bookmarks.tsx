import { NextApiRequest, NextApiResponse } from "next/types";
import { connectToDatabase } from "@/lib/db";
import { Session, getServerSession } from "next-auth";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session: Session | null = await getServerSession(req, res, authOptions);

  if (!session) {
    res
      .status(401)
      .json({ message: "User is not authenticated", status: "error" });
    return;
  }

  const userEmail = session.user?.email;

  const client = await connectToDatabase();
  const userCollection = client
    .db("entertainment-web-app")
    .collection("users");
  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found!", status: "error" });
    client.close();
    return;
  }

  if (req.method === "GET") {
    client.close();
    res.status(200).json(user.bookmarks);
  }

  if (req.method === "POST") {
    const title = req.body.title;

    await userCollection.updateOne(
      { email: userEmail },
      { $addToSet: { bookmarks: title } },
    );

    client.close();
    res
      .status(200)
      .json({ message: "Added to getBookmarks", status: "success" });
  }

  if (req.method === "DELETE") {
    const title = req.body.title;

    await userCollection.updateOne(
      { email: userEmail },
      { $pull: { bookmarks: title } },
    );

    client.close();
    res
      .status(200)
      .json({ message: "Removed from bookmarks", status: "success" });
  }
}

export default handler;

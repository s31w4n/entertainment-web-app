import { connectToDatabase } from "@/lib/db";
import {  getServerSession } from "next-auth";

async function handler(req, res) {
  const session = await getServerSession(req, res);

  if (!session) {
    res
      .status(401)
      .json({ message: "User is not authenticated", status: "error" });
    return;
  }

  const userEmail = session.user?.email;

  const client = await connectToDatabase();
  const userCollection = client.db("entertainment-web-app").collection("users");
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
    const id = req.body.id;

    await userCollection.updateOne(
      { email: userEmail },
      { $addToSet: { bookmarks: id } },
    );

    client.close();
    res.status(200).json({ message: "Added to bookmarks", status: "success" });
  }

  if (req.method === "DELETE") {
    const id = req.body.id;

    await userCollection.updateOne(
      { email: userEmail },
      { $pull: { bookmarks: id } },
    );

    client.close();
    res
      .status(200)
      .json({ message: "Removed from bookmarks", status: "success" });
  }
}

export default handler;

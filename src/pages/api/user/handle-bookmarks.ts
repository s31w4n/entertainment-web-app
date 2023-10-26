import { NextApiRequest, NextApiResponse } from "next/types";
import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, itemId, operation } = req.body;

  const client = await connectToDatabase();
  const userCollection = client.db("entertainment-web-app").collection("users");
  const user = await userCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    res.status(404).json({ message: "User not found!", status: "error" });
    client.close();
    return;
  }

  if (req.method === "POST") {
    try {
      if (operation === "push") {
        // Add itemId to user's bookmarks
        await userCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $addToSet: { bookmarks: itemId } },
        );
        client.close();
        res
          .status(200)
          .json({ message: "Added to bookmarks", status: "success" });
      } else {
        // Remove itemId from user's bookmarks
        await userCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $pull: { bookmarks: itemId } },
        );
        client.close();
        res
          .status(200)
          .json({ message: "Removed from bookmarks", status: "success" });
      }
      if (!user) {
        res.status(404).json({ message: "User not found!", status: "error" });
        client.close();
        return;
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: "Something went wrong!", status: "error" });
      client.close();
      return;
    }
  }
}

export default handler;

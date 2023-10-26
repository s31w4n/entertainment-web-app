import { connectToDatabase } from "@/lib/db";
import User from "@/models/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectToDatabase();
  const { userId, itemId, operation } = req.body;

  if (req.method === "PUT") {
    try {
      let user;

      if (operation === "push") {
        user = await User.findByIdAndUpdate(userId, {
          $push: { bookmarks: itemId },
        });
      } else {
        user = await User.findByIdAndUpdate(userId, {
          $pull: { bookmarks: itemId },
        });
      }
      if (!user) {
        return res
          .status(400)
          .json({ success: false, msg: "Something went wrong, try again" });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, msg: "Could not bookmark, try agin" });
    }

    return res.status(200).json({ success: true, msg: "Bookmarked" });
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import User from "@/models/users";
import * as jsw from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectToDatabase();
  const { email, password } = req.body;

  if (req.method === "POST") {
    let existingUser;

    try {
      existingUser = await User.findOne({ email: email });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Logging in failed, please try again later.",
      });
    }

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials, could not log you in.",
      });
    }

    let isValidPassword = false;
    try {
      isValidPassword = await verifyPassword(password, existingUser.password);
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Could not log you in, please check your credentials and try again",
      });
    }

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials, could not log you in.",
      });
    }

    let token;

    try {
      let secret = process.env.SECRET;
      if (!secret) {
        throw new Error();
      }
      token = jsw.sign(
        { userId: existingUser.id, email: existingUser.email },
        secret,
        { expiresIn: "1h" },
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Logging in failed, please try again.",
      });
    }

    res.status(201).json({
      userId: existingUser.id,
      token: token,
      bookmarks: existingUser.bookmarks,
    });
  }
}

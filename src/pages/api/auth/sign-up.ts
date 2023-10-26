import { connectToDatabase } from "@/lib/db";
import User from "@/models/users";
import { hashPassword } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import * as jsw from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectToDatabase();
  const { email, password } = req.body;

  if (req.method === "POST") {
    let existingUser;

    let hashedPassword;
    try {
      hashedPassword = await hashPassword(password);
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Could not create user, please try again",
      });
    }

    try {
      existingUser = await User.findOne({ email: email });
    } catch (error) {
      return res.status(400).json({
        success: false,
        msg: "Signing up failed, please try again later",
      });
    }

    if (existingUser) {
      return res.status(422).json({
        success: false,
        msg: "User exists already, please login instead.",
      });
    }

    try {
      const user = await User.create({
        email,
        password: hashedPassword,
        bookmarks: [],
      });

      let token;
      try {
        let secret = process.env.SECRET;
        if (!secret) {
          throw new Error();
        }
        token = jsw.sign({ userId: user.id, email: user.email }, secret, {
          expiresIn: "1h",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: "Signing up failed, please try again.",
        });
      }

      return res.status(201).json({
        userId: user.id,
        token: token,
        bookmarks: user.bookmarks,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Signing up failed, please try again.",
      });
    }
  }
}

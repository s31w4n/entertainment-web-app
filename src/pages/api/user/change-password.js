import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" });
    return;
  }

  const userEmail = session.user?.email;
  const oldPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const userCollection = client.db("entertainment-web-app").collection("users");
  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res
      .status(403)
      .json({ message: "Invalid Password!", field: "currentPassword" });
    client.close();
    return;
  }

  if (newPassword.trim().length === 0) {
    res.status(403).json({ message: `Can't be empty`, field: "newPassword" });
    client.close();
    return;
  }

  if (newPassword.length < 7) {
    res
      .status(403)
      .json({ message: "Minimum 8 characters long", field: "newPassword" });
    client.close();
    return;
  }

  if (oldPassword === newPassword) {
    res
      .status(403)
      .json({ message: "Choose a new password!", field: "newPassword" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } },
  );

  client.close();
  res
    .status(200)
    .json({ message: "Password updated successfully!", status: "success" });
}

export default handler;

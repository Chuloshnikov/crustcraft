import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions"; 
import { UserInfo } from "@/models/UserInfo";   
import mongoose from "mongoose";

export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }

  await mongoose.connect(process.env.MONGODB_URI as string);
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return !!userInfo.admin;
}
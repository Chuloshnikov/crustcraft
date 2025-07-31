import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions"; 
import { UserInfo } from "@/models/UserInfo";   
import { connectToDB } from "../mongoose";

export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }

  await connectToDB();
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return !!userInfo.admin;
}
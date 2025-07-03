import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions"; // путь к настройкам next-auth
import { UserInfo } from "@/models/UserInfo";           // путь к mongoose модели User

export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return !!userInfo.admin;
}
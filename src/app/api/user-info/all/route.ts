import { authOptions } from "@/lib/auth/authOptions";
import { connectToDB } from "@/lib/mongoose";
import { isAdmin } from "@/lib/server/isAdmin";
import { UserInfo } from "@/models/UserInfo";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const requesterEmail = session?.user?.email;

    if (!requesterEmail) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admin = await isAdmin();

    if (!admin) {
      return Response.json({ error: 'You are not an admin' }, { status: 403 });
    }

    await connectToDB();

    // All users
    const users = await UserInfo.find({ email: { $ne: requesterEmail } });

    return Response.json(users);
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
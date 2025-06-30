import { authOptions } from "@/lib/auth/authOptions";
import { connectToDB } from "@/lib/mongoose";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";

import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    try {
      await connectToDB();
      const body = await req.json();
      const { name, email,  } = body;
  
      if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
            return Response.json({ error: 'User with this email already exists' }, { status: 400 });
            } else {
                const newUser = await User.create({ email, name });
                if (newUser) {
                    await UserInfo.create({email});
                }
                return Response.json(newUser);
            }
        }

    } catch (error) {
      console.error('Error:', error);
      return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

export async function GET() {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
        return Response.json({});
    }
    return Response.json(
        await UserInfo.findOne({email})
    )
}
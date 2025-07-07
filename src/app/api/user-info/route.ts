import { authOptions } from "@/lib/auth/authOptions";
import { connectToDB } from "@/lib/mongoose";
import { UserInfo } from "@/models/UserInfo";

import { getServerSession } from "next-auth";


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userEntry = session?.user?.email;

    if (!userEntry) {
      return Response.json({ error: 'You need to be authenticated' }, { status: 401 });
    }


    await connectToDB();

    const {
      email,
      firstName,
      lastName,
      avatarUrl,
      dateOfBirth,
      address,
      phone,
      admin
    } = await req.json();

    
    const existingUser = await UserInfo.findOne({ email });

    if (!existingUser) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    if (userEntry !== email) {
      return Response.json({ error: 'You do not have permission' }, { status: 403 });
    }

    existingUser.set({
      firstName,
      lastName,
      avatarUrl,
      dateOfBirth,
      address,
      phone,
      admin
    });

    await existingUser.save();

    return Response.json({ message: 'User updated successfully', user: existingUser }, { status: 200 });

  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    

    return Response.json(
        await UserInfo.findOne({email})
    )
}

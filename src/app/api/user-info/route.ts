import { authOptions } from "@/lib/auth/authOptions";
import { connectToDB } from "@/lib/mongoose";
import { isAdmin } from "@/lib/server/isAdmin";
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

export async function PUT(req: Request) {
    try {
        await connectToDB();
        const admin = await isAdmin();
        if (admin) {
            const {_id, ...data} = await req.json();
            await UserInfo.findByIdAndUpdate(_id, data);
            return Response.json({ message: 'User info updated' }, { status: 200 });
        } else {
             return Response.json({ message: 'Not an Admin' }, { status: 401 });
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
    

    return Response.json(
        await UserInfo.findOne({email})
    )
}

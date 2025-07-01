import { authOptions } from "@/lib/auth/authOptions";
import { connectToDB } from "@/lib/mongoose";
import { UserInfo } from "@/models/UserInfo";

import { getServerSession } from "next-auth";


export async function POST(req: Request) {
    try {
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
        const session = await getServerSession(authOptions);
        const userEntry = session?.user?.email;
        if (!userEntry) {
            return Response.json({ error: 'You need to be authenticated' }, { status: 404 });
        }

        const existingUser = await UserInfo.findOne({ email });
            if (existingUser && userEntry === email) {
                existingUser.set({
                     email,
                    firstName,
                    lastName,
                    avatarUrl,
                    dateOfBirth,
                    address,
                    phone,
                    admin
                });
                await existingUser.save();
            } else {
                return Response.json({ error: 'You do not have permission' }, { status: 400 });
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
        return Response.json({ error: 'You need to be authenticated' }, { status: 400 });
    }
    return Response.json(
        await UserInfo.findOne({email})
    )
}
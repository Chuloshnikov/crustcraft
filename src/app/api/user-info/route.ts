import { authOptions } from "@/lib/auth/authOptions";
import { connectToDB } from "@/lib/mongoose";
import { UserInfo } from "@/models/UserInfo";

import { getServerSession } from "next-auth";





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
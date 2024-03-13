import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import {User} from "@/models/User";
import { getServerSession } from "next-auth";

export async function GET() {
    mongoose.connect(process.env.MONGODB_URL);
    const users = await User.find();
    return Response.json(users);
}


export async function PUT(req) {
    mongoose.connect(process.env.MONGODB_URL);
    const {_id, ...data} = await req.json();
    const session = await getServerSession(authOptions);
    await User.findByIdAndUpdate(_id, data);

    return Response.json(true);
}
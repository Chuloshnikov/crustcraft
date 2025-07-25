import { NextResponse } from 'next/server';
import { Order } from '@/models/Order';
import { connectToDB } from '@/lib/mongoose';
import { authOptions } from "@/lib/auth/authOptions";
import {getServerSession} from "next-auth";
import { isAdmin } from '@/lib/server/isAdmin';


export async function GET(req: Request) {
  await connectToDB();

  const session = await getServerSession(authOptions);
 
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  const post = await Order.findById(_id) as string | null;

   if (_id) {
    return Response.json( await Order.findById(_id) );
  }

  if (admin) {
    return Response.json( await Order.find() );
  }

  if (userEmail) {
    return Response.json( await Order.find({userEmail}) );
  }
  return NextResponse.json(post);
}


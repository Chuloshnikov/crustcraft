import { connectToDB } from "@/lib/mongoose";
import { MenuItem } from "@/models/MenuItem";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDB();
  
  const searchQuery = req.nextUrl.searchParams.get('query');
  
  if (!searchQuery || searchQuery.trim() === '') {
    return Response.json([]);
  }

  try {
    const items = await MenuItem.find({
      name: { $regex: searchQuery, $options: 'i' }
    }).select('-__v -createdAt -updatedAt').lean();

    return Response.json(items);
  } catch (error) {
    console.error('Search error:', error);
    return Response.json([], { status: 500 });
  }
}
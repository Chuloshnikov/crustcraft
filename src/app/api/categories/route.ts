import { isAdmin } from "@/lib/server/isAdmin";
import { Category } from "@/models/Category";
import { connectToDB } from "@/lib/mongoose";

export async function POST(req: Request) {
    await connectToDB();
    const {name} = await req.json();
    if (await isAdmin()) {
        const categoryDoc = await Category.create({name});
        return Response.json(categoryDoc);
    } else {
        return Response.json({});
    }
    
}

export async function PUT(req: Request) {
    await connectToDB();
    const { _id, name } = await req.json();
    if (await isAdmin()) {
        await Category.updateOne({_id}, {name});
    }
    
    return Response.json(true);
}

export async function GET() {
    await connectToDB();
    return Response.json(
        await Category.find()
    )
}

export async function DELETE(req: Request) {
    await connectToDB();
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (await isAdmin()) {
      await Category.deleteOne({_id});
    }
    return Response.json(true);
  }
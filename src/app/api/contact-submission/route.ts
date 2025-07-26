import ContactSubmission from "@/models/ContactSubmission";
import { connectToDB } from '@/lib/mongoose';
import { contactFormSchema } from '@/lib/validation';


export async function POST(req: Request) {
  await connectToDB();
  
  try {
    const data = await req.json();
    const validatedData = contactFormSchema.parse(data);
    
    const submission = await ContactSubmission.create({
      ...validatedData,
      status: 'new',
      createdAt: new Date()
    });
    
    return Response.json({
      success: true,
      message: 'Thank you for your submission!',
      data: submission
    });
    
  } catch (error) {
    console.error('Submission error:', error);
    return Response.json({
      success: false,
      message: error instanceof Error ? error.message : 'Submission failed'
    }, { status: 400 });
  }
}
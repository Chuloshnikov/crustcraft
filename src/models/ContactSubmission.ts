import mongoose, { Document, Schema } from 'mongoose';

interface IContactSubmission extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  newsletter: boolean;
  createdAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, default: 'general' },
  message: { type: String, required: true },
  newsletter: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const ContactSubmission = mongoose.models.ContactSubmission || 
  mongoose.model<IContactSubmission>('ContactSubmission', ContactSubmissionSchema);

export default ContactSubmission;
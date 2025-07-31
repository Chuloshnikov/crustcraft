"use server"
import { MenuItemForm } from '@/components/profile/menu-items/MenuItemForm';
import { Category } from '@/models/Category';
import mongoose from 'mongoose';

export default async function NewItem() {

  await mongoose.connect(process.env.MONGODB_URI as string);
  const categories = JSON.parse(JSON.stringify( await Category.find()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <MenuItemForm
        mode="create" 
        categories={categories} 
        onSuccessRedirect="/profile" 
        />
    </div>
  )
}

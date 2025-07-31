"use server"
import { MenuItemForm } from '@/components/profile/menu-items/MenuItemForm';
import { connectToDB } from '@/lib/mongoose';
import { isAdmin } from '@/lib/server/isAdmin';
import { Category } from '@/models/Category';
import { redirect } from 'next/navigation';

export default async function NewItem() {

  await connectToDB();
  const categories = JSON.parse(JSON.stringify( await Category.find()));


  const admin = isAdmin();

  if (!admin) {
    redirect('/profile');
  }


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

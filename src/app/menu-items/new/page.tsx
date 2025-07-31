"use server"
import { MenuItemForm } from '@/components/profile/menu-items/MenuItemForm';
import { Category } from '@/models/Category';

export default async function NewItem() {
  
  
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

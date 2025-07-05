"use server"
import { MenuItemForm } from "@/components/profile/menu-items/MenuItemForm";
import { Category } from "@/models/Category";
import { MenuItem } from "@/models/MenuItem";



export default async function EditItem({ params }: { params: { id: string } }) {

  const { id } = params;

  const categories = JSON.parse(JSON.stringify( await Category.find()));
  const item = JSON.parse(JSON.stringify( await MenuItem.findById(id)));


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <MenuItemForm
        itemId={id}
        mode="edit"
        initialData={item}
        categories={categories}
        onSuccessRedirect="/admin/menu-items"
      />
    </div>
  )
}

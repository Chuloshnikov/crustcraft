import { MenuItemForm } from "@/components/profile/menu-items/MenuItemForm";
import { Category } from "@/models/Category";



export default async function EditItem({ params }: { params: { id: string } }) {

  const categories = JSON.parse(JSON.stringify( await Category.find()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <MenuItemForm
        itemId={params.id}
        mode="edit"
        initialData={{
          image: "/path/to/image.jpg",
          name: "Margherita Pizza",
          description: "Classic pizza with tomato and mozzarella",
          basePrice: "12.99",
          category: "1",
          sizes: [
            { name: "Small", price: 0 },
            { name: "Medium", price: 2 },
            { name: "Large", price: 4 }
          ],
          extraIngredients: [
            { name: "Extra Cheese", price: 1.5 },
            { name: "Pepperoni", price: 2 }
          ]
        }}
        categories={categories}
        onSuccessRedirect="/admin/menu-items"
      />
    </div>
  )
}

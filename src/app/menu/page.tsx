"use server"
import MenuContainer from "@/components/menu/MenuContainer";
import { Category } from "@/models/Category";

export default async function MenuPage() {
  const categories = JSON.parse(JSON.stringify(await Category.find()));
  return (
    <div className="min-h-screen bg-gray-50">
      <MenuContainer categories={categories} />
    </div>
  )
}
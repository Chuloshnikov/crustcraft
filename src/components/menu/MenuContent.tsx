"use client"

import { Button } from "@/components/ui/button";
import MenuItemCard from "./MenuItemCard";
import { ICategory, ClientMenuItem } from "@/types/cart";

interface MenuContentProps {
  items: ClientMenuItem[];
  categories: ICategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  isLoading: boolean;
}

export default function MenuContent({
  items,
  categories,
  selectedCategory,
  onCategoryChange,
  isLoading
}: MenuContentProps) {
  if (isLoading) {
    return <div className="text-center py-12">Loading menu items...</div>;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryFilters 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={onCategoryChange}
        />
        
        <MenuItemsGrid items={items} />
      </div>
    </section>
  );
}

function CategoryFilters({
  categories,
  selectedCategory,
  onSelect
}: {
  categories: ICategory[];
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      <Button
        onClick={() => onSelect("all")}
        variant={selectedCategory === "all" ? "default" : "outline"}
        className={selectedCategory === "all" ? "bg-orange-500 text-white" : ""}
      >
        Show all
      </Button>
      {categories.map(category => (
        <Button
          key={category._id}
          onClick={() => onSelect(category._id)}
          variant={selectedCategory === category._id ? "default" : "outline"}
          className={selectedCategory === category._id ? "bg-orange-500 text-white" : ""}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}

function MenuItemsGrid({ items }: { items: ClientMenuItem[] }) {
  if (items.length === 0) {
    return <p className="text-center text-gray-500">No items found</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(item => (
        <MenuItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}
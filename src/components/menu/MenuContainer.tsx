"use client"

import { useEffect, useState, useMemo } from "react";
import MenuContent from "@/components/menu/MenuContent";
import MenuHero from "@/components/menu/MenuHero";
import { ICategory } from "@/models/Category";
import { ClientMenuItem } from "../../../types/cart";

interface MenuContainerProps {
  categories: ICategory[];
}

export default function MenuContainer({ categories }: MenuContainerProps) {
  const [menuItems, setMenuItems] = useState<ClientMenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const response = await fetch('/api/menu-items');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Failed to load menu items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenuItems();
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = searchQuery 
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      const matchesCategory = selectedCategory === "all" 
        ? true 
        : item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchQuery, selectedCategory]);

  return (
    <>
      <MenuHero search={searchQuery} onSearchChange={setSearchQuery} />
      <MenuContent
        items={filteredItems}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        isLoading={isLoading}
      />
    </>
  );
}
"use client"

import MenuContent from "@/components/menu/MenuContent";
import MenuHero from "@/components/menu/MenuHero";
import { ICategory } from "@/models/Category";
import { IExtraPrice } from "@/models/MenuItem";
import { useEffect, useState,  useMemo } from "react";

interface MenuItemWithCategory {
  _id: string;
  name: string;
  description: string;
  popular?: boolean;
  category: string ;
  basePrice: number;
  sizes?: IExtraPrice[];
  extraIngredients?: IExtraPrice[];
  createdAt?: Date;
  updatedAt?: Date;

}

const MenuContainer = ({ categories }: { categories: ICategory[] }) => {
  const [allMenuItems, setAllMenuItems] = useState<MenuItemWithCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем все товары один раз
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/menu-items');
        const data = await res.json();
        setAllMenuItems(data);
      } catch (error) {
        console.error('Error loading menu items:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Мемоизированная фильтрация
  const filteredItems = useMemo(() => {
    let result = [...allMenuItems];

    // Фильтрация по поиску
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(query)
      );
    }

    // Фильтрация по категории
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
    }

    return result;
  }, [allMenuItems, searchQuery, selectedCategory]);

  // Группировка по категориям
  const itemsByCategory = useMemo(() => {
    const grouped: Record<string, MenuItemWithCategory[]> = {};

    // Создаем записи для всех категорий
    categories.forEach(cat => {
      grouped[cat._id] = [];
    });

    // Добавляем "Все" категории
    grouped['all'] = allMenuItems;

    // Распределяем товары по категориям
    filteredItems.forEach(item => {
      const categoryId = typeof item.category === 'object' 
        ? item.category._id 
        : item.category;
      
      if (grouped[categoryId]) {
        grouped[categoryId].push(item);
      }
    });

    return grouped;
  }, [filteredItems, categories, allMenuItems]);

  return (
    <>
      <MenuHero 
        search={searchQuery} 
        setSearch={setSearchQuery} 
      />
      <MenuContent
        menuItems={filteredItems}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isLoading={isLoading}
      />
    </>
  );
};

export default MenuContainer;
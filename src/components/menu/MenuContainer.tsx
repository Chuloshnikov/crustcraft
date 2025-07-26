"use client"

import MenuContent from "@/components/menu/MenuContent";
import MenuHero from "@/components/menu/MenuHero";
import { ICategory } from "@/models/Category";
import { useEffect, useState } from "react";

const MenuContainer = ({categories}: {categories: ICategory}) => {
  const [menuItems, setMenuItems] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [search, setSearch] = useState('');
  

  useEffect(() => {

  },[])

  return (
    <>
        <MenuHero search={search} setSearch={setSearch}/>
        <MenuContent selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories}/>
    </>
  )
}

export default MenuContainer;
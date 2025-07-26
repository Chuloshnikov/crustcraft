"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Plus, Minus } from "lucide-react"
import Image from "next/image"
import { ICategory } from "@/models/Category"
import { ClientMenuItem } from "../../../types/cart"
import MenuItemCard from "./MenuItemCard"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  popular?: boolean
  vegetarian?: boolean
  spicy?: boolean
  new?: boolean
}


const MenuContent = (
  {
    categories,
    selectedCategory, 
    setSelectedCategory,
    menuItems,
    isLoading
  }: {
    categories: ICategory[], 
    selectedCategory: string, 
    setSelectedCategory: (value: string) => void,
    menuItems: ClientMenuItem[],
    isLoading: boolean
  }) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const filteredItems = menuItems.filter((item) => selectedCategory === "all" || item.category === selectedCategory)


  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId)
      } else {
        newFavorites.add(itemId)
      }
      return newFavorites
    })
  }


  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button
          className={`${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                : "border-orange-200 text-orange-600 hover:bg-orange-50"
          }`}
          >
            Show all
          </Button>
          {categories.map((category) => (
            <Button
              key={category._id}
              variant={selectedCategory === category._id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                  : "border-orange-200 text-orange-600 hover:bg-orange-50"
              }`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                @
              </Badge>
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredItems.map((item) => (
            <MenuItemCard key={item._id} item={item}/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MenuContent;
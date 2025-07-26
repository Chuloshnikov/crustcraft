"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ClientMenuItem } from "../../../types/cart"

interface MenuItemCardProps {
  item: ClientMenuItem
  cart: { [key: number]: number }
  favorites: Set<number>
  onAddToCart: (itemId: number) => void
  onRemoveFromCart: (itemId: number) => void
  onToggleFavorite: (itemId: number) => void
}

const MenuItemCard = ({
  item,
}: MenuItemCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
      <div className="relative">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={300}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {item.popular && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">Popular</Badge>
          )}
        </div>

      </div>

      <CardContent className="p-6">

        <h3 className="font-bold text-lg mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

    
       
      </CardContent>
    </Card>
  )
}

export default MenuItemCard;
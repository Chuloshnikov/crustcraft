"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ClientMenuItem } from "../../../types/cart";

interface MenuItemCardProps {
  item: ClientMenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={item.image || "/placeholder-food.jpg"}
          alt={item.name}
          fill
          className="object-cover rounded-t-lg hover:scale-125 duration-300"
        />
        
        {item.popular && (
          <Badge className="absolute top-2 left-2 bg-orange-500">
            Popular
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-orange-600">${item.basePrice.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
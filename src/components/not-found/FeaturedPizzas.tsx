import React from 'react'
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { Button } from '../ui/button';

const FeaturedPizzas = () => {

    const featuredPizzas = [
    {
      name: "Margherita Classic",
      price: "$18.99",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Pepperoni Supreme",
      price: "$22.99",
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Meat Lovers",
      price: "$26.99",
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=200",
    },
  ];
  
  return (
    <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">While You&apos;re Here, Check Out Our Favorites</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPizzas.map((pizza, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className="relative">
                    <Image
                      src={pizza.image || "/placeholder.svg"}
                      alt={pizza.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 cursor-pointer" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{pizza.rating}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{pizza.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-orange-600">{pizza.price}</span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                      >
                        Order Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
    </div>
  )
}

export default FeaturedPizzas;
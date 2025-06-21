import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const pizzas = [
  {
    id: 1,
    name: "Margherita Classic",
    description: "Fresh tomatoes, mozzarella, basil",
    price: "$18.99",
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=300",
    popular: true,
  },
  {
    id: 2,
    name: "Pepperoni Supreme",
    description: "Pepperoni, cheese, tomato sauce",
    price: "$22.99",
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=300",
    popular: false,
  },
  {
    id: 3,
    name: "Veggie Delight",
    description: "Bell peppers, mushrooms, olives",
    price: "$20.99",
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=300",
    popular: false,
  },
  {
    id: 4,
    name: "Meat Lovers",
    description: "Pepperoni, sausage, ham, bacon",
    price: "$26.99",
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=300",
    popular: true,
  },
]


const BestSellersSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-orange-600 font-semibold mb-2">CHECK OUT</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Best Sellers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most loved pizzas, crafted with the finest ingredients and perfected over years of culinary
            expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pizzas.map((pizza) => (
            <Card
              key={pizza.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={"/pizza1.jpg"}
                  alt={pizza.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {pizza.popular && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </div>
                )}
                <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{pizza.rating}</span>
                  <span className="text-sm text-gray-500">(120+ reviews)</span>
                </div>

                <h3 className="font-bold text-lg mb-2">{pizza.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{pizza.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">{pizza.price}</span>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-orange-200 text-orange-600 hover:bg-orange-50 px-8">
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BestSellersSection;
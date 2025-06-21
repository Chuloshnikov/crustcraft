import { Button } from '@/components/ui/button';
import React from 'react';
import BestSellersCard from './BestSellersCard';
import Link from 'next/link';

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
          {pizzas.map((pizza, index) => (
            <BestSellersCard key={index} pizza={pizza}/>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={"/menu"}>
            <Button variant="outline" size="lg" className="cursor-pointer border-orange-200 text-orange-600 hover:bg-orange-50 px-8">
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BestSellersSection;
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, ArrowLeft, Pizza, MapPin, Phone, Menu, Heart, Star, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const NotFoundContent = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const popularLinks = [
    { name: "Our Menu", href: "/menu", icon: Menu, description: "Browse our delicious pizzas" },
    { name: "Order Online", href: "/order", icon: Pizza, description: "Place your order now" },
    { name: "Locations", href: "/contact", icon: MapPin, description: "Find us near you" },
    { name: "About Us", href: "/about", icon: Heart, description: "Our story and values" },
  ]

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
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Redirect to menu with search query
      window.location.href = `/menu?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <section className="py-20 min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Hero */}
          <div className="mb-12">
            {/* Large 404 with Pizza Illustration */}
            <div className="relative mb-8">
              <div className="text-9xl sm:text-[12rem] font-bold text-orange-200 select-none">
                4
                <span className="relative inline-block">
                  0
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 w-20 h-20 sm:w-32 sm:h-32 rounded-full flex items-center justify-center animate-spin-slow">
                      <Pizza className="h-10 w-10 sm:h-16 sm:w-16 text-white" />
                    </div>
                  </div>
                </span>
                4
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Oops! This Page Got Lost</h1>
            <p className="text-xl text-gray-600 mb-2">
              Looks like this page took a wrong turn on the way to your table!
            </p>
            <p className="text-gray-500">
              Don't worry, our pizzas are still hot and ready. Let's get you back on track.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for pizzas, menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-2 border-orange-200 focus:border-orange-500 rounded-full"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {popularLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <link.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{link.name}</h3>
                    <p className="text-gray-600 text-sm">{link.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Featured Pizzas */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">While You're Here, Check Out Our Favorites</h2>
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

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              onClick={() => window.history.back()}
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50 px-8"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
              <p className="text-orange-100 mb-6">
                Our team is here to help you find what you're looking for or answer any questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>(555) 123-PIZZA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Open until 10PM</span>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/contact">
                  <Button variant="secondary" size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Fun Message */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 italic">"Even when you're lost, you're never far from great pizza!" 🍕</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFoundContent;
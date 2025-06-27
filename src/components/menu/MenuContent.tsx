"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Plus, Minus } from "lucide-react"
import Image from "next/image"

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


const MenuContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const categories = [
    { id: "all", name: "All Items", count: 24 },
    { id: "pizza", name: "Pizzas", count: 12 },
    { id: "appetizers", name: "Appetizers", count: 6 },
    { id: "salads", name: "Salads", count: 4 },
    { id: "pasta", name: "Pasta", count: 5 },
    { id: "desserts", name: "Desserts", count: 3 },
    { id: "beverages", name: "Beverages", count: 8 },
  ]

  const menuItems: MenuItem[] = [
    // Pizzas
    {
      id: 1,
      name: "Margherita Classic",
      description: "Fresh tomatoes, mozzarella cheese, basil leaves, olive oil on our signature crust",
      price: 18.99,
      category: "pizza",
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=300&width=300",
      popular: true,
      vegetarian: true,
    },
    {
      id: 2,
      name: "Pepperoni Supreme",
      description: "Premium pepperoni, mozzarella cheese, tomato sauce with our special blend of herbs",
      price: 22.99,
      category: "pizza",
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      popular: true,
    },
    {
      id: 3,
      name: "Spicy Diavola",
      description: "Spicy salami, hot peppers, mozzarella, tomato sauce, chili oil",
      price: 24.99,
      category: "pizza",
      rating: 4.7,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      spicy: true,
    },
    {
      id: 4,
      name: "Veggie Garden",
      description: "Bell peppers, mushrooms, olives, onions, tomatoes, fresh herbs",
      price: 20.99,
      category: "pizza",
      rating: 4.6,
      reviews: 78,
      image: "/placeholder.svg?height=300&width=300",
      vegetarian: true,
    },
    {
      id: 5,
      name: "Meat Lovers Deluxe",
      description: "Pepperoni, sausage, ham, bacon, ground beef, extra cheese",
      price: 28.99,
      originalPrice: 32.99,
      category: "pizza",
      rating: 4.9,
      reviews: 203,
      image: "/placeholder.svg?height=300&width=300",
      popular: true,
    },
    {
      id: 6,
      name: "BBQ Chicken Ranch",
      description: "Grilled chicken, BBQ sauce, red onions, cilantro, ranch drizzle",
      price: 25.99,
      category: "pizza",
      rating: 4.8,
      reviews: 145,
      image: "/placeholder.svg?height=300&width=300",
      new: true,
    },

    // Appetizers
    {
      id: 7,
      name: "Garlic Breadsticks",
      description: "Fresh baked breadsticks with garlic butter, herbs, and marinara sauce",
      price: 8.99,
      category: "appetizers",
      rating: 4.5,
      reviews: 67,
      image: "/placeholder.svg?height=300&width=300",
      popular: true,
      vegetarian: true,
    },
    {
      id: 8,
      name: "Buffalo Wings",
      description: "Crispy chicken wings tossed in spicy buffalo sauce, served with ranch",
      price: 12.99,
      category: "appetizers",
      rating: 4.7,
      reviews: 92,
      image: "/placeholder.svg?height=300&width=300",
      spicy: true,
    },
    {
      id: 9,
      name: "Mozzarella Sticks",
      description: "Golden fried mozzarella sticks with marinara dipping sauce",
      price: 9.99,
      category: "appetizers",
      rating: 4.4,
      reviews: 55,
      image: "/placeholder.svg?height=300&width=300",
      vegetarian: true,
    },

    // Salads
    {
      id: 10,
      name: "Caesar Salad",
      description: "Romaine lettuce, parmesan cheese, croutons, caesar dressing",
      price: 11.99,
      category: "salads",
      rating: 4.4,
      reviews: 45,
      image: "/placeholder.svg?height=300&width=300",
      vegetarian: true,
    },
    {
      id: 11,
      name: "Mediterranean Salad",
      description: "Mixed greens, olives, feta cheese, tomatoes, cucumber, balsamic vinaigrette",
      price: 13.99,
      category: "salads",
      rating: 4.6,
      reviews: 38,
      image: "/placeholder.svg?height=300&width=300",
      vegetarian: true,
    },

    // Pasta
    {
      id: 12,
      name: "Spaghetti Carbonara",
      description: "Classic carbonara with pancetta, eggs, parmesan, black pepper",
      price: 16.99,
      category: "pasta",
      rating: 4.7,
      reviews: 82,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 13,
      name: "Penne Arrabbiata",
      description: "Penne pasta in spicy tomato sauce with garlic and red peppers",
      price: 14.99,
      category: "pasta",
      rating: 4.5,
      reviews: 64,
      image: "/placeholder.svg?height=300&width=300",
      vegetarian: true,
      spicy: true,
    },

    // Desserts
    {
      id: 14,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with molten center, served with vanilla ice cream",
      price: 7.99,
      category: "desserts",
      rating: 4.9,
      reviews: 134,
      image: "/placeholder.svg?height=300&width=300",
      popular: true,
      vegetarian: true,
    },
    {
      id: 15,
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
      price: 8.99,
      category: "desserts",
      rating: 4.8,
      reviews: 98,
      image: "/placeholder.svg?height=300&width=300",
      vegetarian: true,
    },

    // Beverages
    {
      id: 16,
      name: "Fresh Lemonade",
      description: "House-made lemonade with fresh lemons and mint",
      price: 3.99,
      category: "beverages",
      rating: 4.6,
      reviews: 56,
      image: "/placeholder.svg?height=300&width=300",
      vegetarian: true,
    },
    {
      id: 17,
      name: "Italian Soda",
      description: "Sparkling water with your choice of fruit syrup",
      price: 4.99,
      category: "beverages",
      rating: 4.3,
      reviews: 34,
      image: "/placeholder.svg?height=300&width=300",
      vegetarian: true,
    },
  ]

  const filteredItems = menuItems.filter((item) => selectedCategory === "all" || item.category === selectedCategory)

  const addToCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId]--
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

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

  const getTotalItems = () => Object.values(cart).reduce((sum, count) => sum + count, 0)
  const getTotalPrice = () =>
    Object.entries(cart).reduce((sum, [itemId, count]) => {
      const item = menuItems.find((item) => item.id === Number.parseInt(itemId))
      return sum + (item?.price || 0) * count
    }, 0)

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                  : "border-orange-200 text-orange-600 hover:bg-orange-50"
              }`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
            >
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
                  {item.new && <Badge className="bg-green-500 text-white">New</Badge>}
                  {item.vegetarian && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Vegetarian
                    </Badge>
                  )}
                  {item.spicy && (
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      🌶️ Spicy
                    </Badge>
                  )}
                </div>

                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.has(item.id) ? "text-red-500 fill-red-500" : "text-gray-600"
                    } hover:text-red-500`}
                  />
                </button>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{item.rating}</span>
                  <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                </div>

                <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-orange-600">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                {/* Cart Controls */}
                {cart[item.id] ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-semibold">{cart[item.id]}</span>
                      <Button size="sm" variant="outline" onClick={() => addToCart(item.id)} className="w-8 h-8 p-0">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm font-semibold text-orange-600">
                      ${(item.price * cart[item.id]).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <Button
                    onClick={() => addToCart(item.id)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating Cart */}
        {getTotalItems() > 0 && (
          <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-6 border max-w-sm z-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Your Order</h3>
              <Badge className="bg-orange-500">{getTotalItems()} items</Badge>
            </div>

            <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
              {Object.entries(cart).map(([itemId, count]) => {
                const item = menuItems.find((item) => item.id === Number.parseInt(itemId))
                if (!item) return null
                return (
                  <div key={itemId} className="flex justify-between text-sm">
                    <span>
                      {count}x {item.name}
                    </span>
                    <span>${(item.price * count).toFixed(2)}</span>
                  </div>
                )
              })}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total:</span>
                <span className="text-orange-600">${getTotalPrice().toFixed(2)}</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default MenuContent;
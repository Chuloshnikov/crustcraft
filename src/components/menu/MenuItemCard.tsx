"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useState, ChangeEvent } from "react"
import { toast } from "sonner"
import { useCart } from "@/hooks/useCart"
import { ClientMenuItem } from "../../../types/cart"
import { IExtraPrice } from "@/models/MenuItem"


interface MenuItemCardProps {
  item: ClientMenuItem
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart()
  const [showOptions, setShowOptions] = useState(false)
  const [selectedSize, setSelectedSize] = useState<IExtraPrice | null>(
    item.sizes && item.sizes.length > 0 ? item.sizes[0] : null
  )
  const [selectedExtras, setSelectedExtras] = useState<IExtraPrice[]>([])

  const hasOptions = (item.sizes?.length || 0) > 0 || 
                    (item.extraIngredients?.length || 0) > 0
  const basePrice = item.basePrice || 0

  const handleAddToCart = () => {
    if (hasOptions && !showOptions) {
      setShowOptions(true)
      return
    }
    
    addToCart(item, selectedSize || undefined, selectedExtras)
    toast.success(`${item.name} added to cart!`)
    setShowOptions(false)
  }

  const handleExtraToggle = (extra: IExtraPrice, checked: boolean) => {
    if (checked) {
      setSelectedExtras(prev => [...prev, extra])
    } else {
      setSelectedExtras(prev => prev.filter(e => e._id !== extra._id))
    }
  }

  const calculateTotalPrice = () => {
    let total = basePrice
    if (selectedSize) total += selectedSize.price
    if (selectedExtras.length > 0) {
      total += selectedExtras.reduce((sum, extra) => sum + extra.price, 0)
    }
    return total
  }

  return (
    <>
      {/* Modal for options */}
      {showOptions && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowOptions(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <Card className="border-0">
              <div className="relative aspect-video">
                <Image
                  src={item.image || "/placeholder-food.jpg"}
                  alt={item.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              
              <CardContent className="p-4 space-y-4">
                <h3 className="font-bold text-xl">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                
                {/* Size Selection */}
                {(item.sizes?.length || 0) > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Select size</h4>
                    <div className="space-y-2">
                      {item.sizes?.map(size => (
                        <Label key={size._id} className="flex items-center gap-2">
                          <Input
                            type="radio"
                            name="size"
                            checked={selectedSize?._id === size._id}
                            onChange={() => setSelectedSize(size)}
                            className="w-4 h-4"
                          />
                          <span className="capitalize">{size.name}</span>
                          <span className="ml-auto">+${size.price.toFixed(2)}</span>
                        </Label>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Extras Selection */}
                {(item.extraIngredients?.length || 0) > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Extra ingredients</h4>
                    <div className="space-y-2">
                      {item.extraIngredients?.map(extra => (
                        <Label key={extra._id} className="flex items-center gap-2">
                          <Input
                            type="checkbox"
                            checked={selectedExtras.some(e => e._id === extra._id)}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => 
                              handleExtraToggle(extra, e.target.checked)
                            }
                            className="w-4 h-4"
                          />
                          <span className="capitalize">{extra.name}</span>
                          <span className="ml-auto">+${extra.price.toFixed(2)}</span>
                        </Label>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-xl font-bold text-orange-600">
                    ${calculateTotalPrice().toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <Button 
                    className="cursor-pointer"
                      variant="outline" 
                      onClick={() => setShowOptions(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddToCart}
                      className="cursor-pointer bg-orange-500 hover:bg-orange-600"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      {/* Product Card */}
      <Card className="hover:shadow-lg transition-shadow duration-300 relative">
        {item.popular && (
          <Badge className="absolute top-2 left-2 bg-orange-500 z-10">
            Popular
          </Badge>
        )}
        
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={item.image || "/placeholder-food.jpg"}
            alt={item.name}
            fill
            className="object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-1">{item.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{item.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-orange-600">
              {hasOptions ? (
                <span>From ${basePrice.toFixed(2)}</span>
              ) : (
                <span>${basePrice.toFixed(2)}</span>
              )}
            </span>
            
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="cursor-pointer bg-orange-500 hover:bg-orange-600"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
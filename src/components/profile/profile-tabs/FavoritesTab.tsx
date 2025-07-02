import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';



const FavoritesTab = () => {
    
    const favoriteItems = [
        {
          name: "Margherita Classic",
          price: "$18.99",
          rating: 4.8,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          name: "Pepperoni Supreme",
          price: "$22.99",
          rating: 4.9,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          name: "Meat Lovers",
          price: "$26.99",
          rating: 4.9,
          image: "/placeholder.svg?height=100&width=100",
        },
      ];


  return (
     <TabsContent value="favorites">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-orange-600" />
                  Favorite Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteItems.map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="w-full h-32 object-cover"
                        />
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                        >
                          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-orange-600">{item.price}</span>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                          >
                            Order Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
    </TabsContent>
  )
}

export default FavoritesTab;
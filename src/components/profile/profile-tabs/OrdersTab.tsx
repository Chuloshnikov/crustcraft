import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Calendar, ShoppingBag } from 'lucide-react';
import React from 'react'

const OrdersTab = () => {

    const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      items: ["Margherita Classic", "Pepperoni Supreme"],
      total: 41.98,
      status: "Delivered",
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      items: ["Meat Lovers", "Caesar Salad"],
      total: 38.98,
      status: "Delivered",
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      items: ["Veggie Delight", "Garlic Breadsticks"],
      total: 29.98,
      status: "Delivered",
    },
  ];


  return (
      <TabsContent value="orders">
        <Card className="shadow-lg border-0">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-orange-600" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-lg">#{order.id}</span>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {order.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(order.date).toLocaleDateString()}</span>
                          </div>
                          <div className="text-sm text-gray-600">{order.items.join(", ")}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">${order.total.toFixed(2)}</div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                          >
                            Reorder
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

export default OrdersTab;
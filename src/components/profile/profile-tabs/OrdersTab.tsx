"use client"

import { cartProductPrice } from '@/app/providers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { IOrder } from '@/models/Order';
import { Calendar, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const OrdersTab = () => {
  const [recentOrders, setRecentOrders] = useState<IOrder[] | null>(null);
  const [loadingOrders, setLoadingOrders] = useState(true);
  console.log(loadingOrders)

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch('/api/orders').then(res => {
      res.json().then(orders => {
        setRecentOrders(orders.reverse());
        setLoadingOrders(false);
      })
    })
  }


     const totalPrice = (order: IOrder) => {
        let subtotal = 0;
        if (order?.cartProducts) {
          for (const product of order?.cartProducts) {
            subtotal += cartProductPrice(product);
          }
        }

        const deliveryFee = 5
        const total = subtotal + deliveryFee

        return total;
     }

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
                {loadingOrders && (
                  <div>Loading orders...</div>
                )}
                <div className="space-y-4">
                  {!!recentOrders && (
                    <div className='flex items-center justify-center'>
                      <p className='font-semibold text-gray-500'>You have no orders yet</p>
                    </div>
                  )}
                  {recentOrders && recentOrders.map((order: IOrder) => (
                    <Link
                    key={order._id}
                    href={`/orders/${order._id}`}
                    >
                    <div
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-lg">#{order._id}</span>
                            <Badge variant="secondary" className={` text-white ${order.paid ? "bg-green-500" : "bg-red-400"}`}>
                              {order.paid ? "Paid" : "Not paid"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(order.createdAt as Date).toLocaleDateString()}</span>
                          </div>
                          <div className="text-sm text-gray-600">{order.cartProducts.map(item => (
                            <div key={item._id}>
                              {item.name}
                            </div>
                          ))}
                        </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">${totalPrice(order).toFixed(2)}</div>
                          <Link
                          href={"/menu"}
                          >
                            <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer mt-2 border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                          >
                            Reorder
                          </Button>
                          </Link>
                         
                        </div>
                      </div>
                    </div>
                    </Link>
                  ))}
                </div>
            </CardContent>
        </Card>
    </TabsContent>
  )
}

export default OrdersTab;
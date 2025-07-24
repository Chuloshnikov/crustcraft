"use client"

import { useState, useEffect, useContext } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import OrderAddressDisplay from "./OrderAddressDisplay"
import { LoadingContent } from "../loading/LoadingContent"
import { CheckCircle, Clock, Truck, Phone, Receipt, MapPin, Calendar, CreditCard, Pizza } from "lucide-react"
import Link from "next/link"
import OrderProduct from "./OrderProduct"
import { CartContext } from "@/app/providers"


interface OrderContentProps {
  orderId: string
}

const OrderContent = ({ orderId }: OrderContentProps) => {
    const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
    if (orderId) {
      setLoadingOrder(true);
      fetch('/api/orders?_id='+orderId).then(res => {
        res.json().then(orderData => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      })
    }
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }


  const cartProductPrice = (product): number => {
    let price = product.basePrice
    if (product.size) {
      price += product.size.price
    }
    if (product.extras) {
      for (const extra of product.extras) {
        price += extra.price
      }
    }
    return price * product.quantity
  }

  // Calculate totals
  let subtotal = 0
  if (order?.cartProducts) {
    for (const product of order.cartProducts) {
      subtotal += cartProductPrice(product)
    }
  }
  const deliveryFee = 5
  const total = subtotal + deliveryFee

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "confirmed":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-100",
          text: "Order Confirmed",
          description: "Your order has been confirmed and is being prepared",
        }
      case "preparing":
        return {
          icon: Clock,
          color: "text-orange-600",
          bgColor: "bg-orange-100",
          text: "Preparing",
          description: "Our chefs are preparing your delicious order",
        }
      case "on-the-way":
        return {
          icon: Truck,
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          text: "On the Way",
          description: "Your order is on its way to you",
        }
      default:
        return {
          icon: Clock,
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          text: "Processing",
          description: "We're processing your order",
        }
    }
  }

  if (loadingOrder) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <LoadingContent />
          </div>
        </div>
      </section>
    )
  }

  if (!order) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-8">We couldn&apos;t find the order you&apos;re looking for.</p>
            <Link href="/menu">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                Back to Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const statusInfo = getStatusInfo(order.status)
  const StatusIcon = statusInfo.icon

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
                <Pizza className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Order Confirmation</h1>
            </div>

            {/* Status Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusInfo.bgColor} mb-4`}>
              <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
              <span className={`font-semibold ${statusInfo.color}`}>{statusInfo.text}</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Thank you for your order!</h2>
              <p className="text-gray-600">{statusInfo.description}</p>
              <p className="text-gray-600">We will call you when your order is on the way.</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-orange-600" />
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.cartProducts.map((product) => (
                      <OrderProduct key={product._id} product={product} price={cartProductPrice(product)} />
                    ))}
                  </div>

                  <Separator className="my-6" />

                  {/* Order Summary */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        Delivery:
                      </span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total:</span>
                      <span className="text-orange-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Info Sidebar */}
            <div className="space-y-6">
              {/* Order Info */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    Order Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Order ID</div>
                    <div className="font-semibold">#{order._id}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Order Date</div>
                    <div className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Estimated Delivery</div>
                    <div className="font-semibold text-orange-600">
                      {new Date(order.estimatedDelivery).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Payment Method
                    </div>
                    <div className="font-semibold">{order.paymentMethod}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-orange-600" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <OrderAddressDisplay order={order} />
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-orange-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Phone Number</div>
                      <div className="font-semibold">{order.phone}</div>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-sm text-orange-800">
                        We'll call you 5-10 minutes before delivery to confirm you're available.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link href="/menu">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                    Order Again
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button
                    variant="outline"
                    className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    View Order History
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default OrderContent;
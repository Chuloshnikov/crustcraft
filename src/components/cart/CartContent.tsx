"use client"

import { useContext, useState, useEffect } from "react";
import { CartContext, cartProductPrice } from "@/app/providers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CartProduct from "@/components/cart/CartProduct";
import AddressInputs from "@/components/cart/AddressInputs";
import { ShoppingCart, CreditCard, Truck, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { LoadingContent } from "../loading/LoadingContent";
import { redirect } from "next/navigation";
import { UserInfoProps } from "../../../types/types";
import { DeliveryInfoFieldsTypes } from "../../../types/cart";
import { AddressFields, validateAddress } from "@/lib/validation";

const deliveryFee = 5

const CartContent = () => {
  const cart = useContext(CartContext);
  const { data: session, status } = useSession();
  const [changeAddressLoading, setChangeAddressLoading] = useState(false);
  const emptyUserInfo: UserInfoProps = {
  email: "",
  firstName: "",
  lastName: "",
  avatarUrl: "",
  phone: "",
  address: "",
  dateOfBirth: "",
  admin: false
};
  const [userInfo, setUserInfo] = useState<UserInfoProps>(emptyUserInfo);

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfoFieldsTypes>({
    phone: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof AddressFields, string>>>({});

  console.log(deliveryInfo);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user-info")
        .then((response) => response.json())
        .then((data) => setUserInfo(data));
    }
  }, [status]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 😔');
      }
    }
  }, []);

  if (!cart) return null

  const { cartProducts, removeCartProduct } = cart


  const subtotal = cartProducts.reduce((acc, p) => acc + cartProductPrice(p), 0)
  const total = subtotal + deliveryFee

  async function proceedToCheckout(ev: React.FormEvent) {
    ev.preventDefault()
    setIsLoading(true)

    const address = {
      address: userInfo.address,
      phone: userInfo.phone,
    };

    const promise = new Promise<void>((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({address, cartProducts }),
      })
        .then(async (response) => {
          if (response.ok) {
            const redirectUrl = await response.json()
            resolve()
            window.location.href = redirectUrl
          } else {
            reject(new Error("Checkout failed"))
          }
        })
        .catch(reject)
    })

    toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    })

    promise.finally(() => setIsLoading(false))
  }


  function handleChangeDeliveryData() {
    setChangeAddressLoading(true);
    const errors = validateAddress(deliveryInfo);
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0 || formErrors) {
      toast.error("Please fill in all required fields correctly.");
      setChangeAddressLoading(false);
      return;
    }

    if (Object.keys(errors).length === 0) {
      const fullAddress = `${deliveryInfo.streetAddress}, ${deliveryInfo.city} ${deliveryInfo.postalCode}`.trim();
      setUserInfo((prev) => ({ ...prev, address: fullAddress, phone: deliveryInfo.phone }));
    }
    setChangeAddressLoading(false);
  }

  //status loading and redirect

    if (status === "loading") {
      return <LoadingContent />;
    }
  
    if (status === "unauthenticated") {
      redirect("/login");
    }
  

  if (cartProducts.length === 0) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven&apos;t added any delicious items to your cart yet!</p>
            <Link href="/menu">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 text-lg">
                Browse Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <p className="text-gray-600">Review your order and proceed to checkout</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-orange-600" />
                    Order Items ({cartProducts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                      <CartProduct
                        key={index}
                        product={product}
                        onRemove={() => removeCartProduct(index)}
                        price={cartProductPrice(product)}
                      />
                    ))}
                  </div>

                  <Separator className="my-6" />

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

            <div className="lg:col-span-1">
              <Card className="shadow-lg border-0 sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-orange-600" />
                    Checkout
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={proceedToCheckout} className="space-y-6">
                    <AddressInputs 
                    addressFields={deliveryInfo} 
                    setAddressFields={setDeliveryInfo} 
                    addressLoading={changeAddressLoading} 
                    changeAddress={handleChangeDeliveryData}
                    />

                    {/*delivery Info*/}

                    <div className="flex flex-col gap-2 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                      <p className="text-xs font-semibold text-gray-500">
                        Please pay attention to the correctness of the delivery address, 
                        the delivery service is not responsible for delivery to the wrong address.
                      </p>
                      <div className="flex flex-col text-base text-gray-700">
                        <div>customer: <span>{session?.user.name}</span> </div>
                        <div>phone: <span>{userInfo.phone}</span></div>
                        <div>Address: <span>{userInfo.address}</span></div>
                      </div>
                    </div>

                    <Separator />

                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                        <div className="text-2xl font-bold text-orange-600">${total.toFixed(2)}</div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="cursor-pointer w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white h-12 text-lg font-semibold"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <>
                          <CreditCard className="h-5 w-5 mr-2" />
                          Pay ${total.toFixed(2)}
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-xs text-gray-500">Secure payment powered by Stripe</p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartContent
import { authOptions } from "@/lib/auth/authOptions";
import { connectToDB } from "@/lib/mongoose";
import {IExtraPrice, MenuItem} from "@/models/MenuItem";
import {Order} from "@/models/Order";
import {getServerSession} from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  await connectToDB();

  const {cartProducts, address} = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  for (const cartProduct of cartProducts) {

    const productInfo = await MenuItem.findById(cartProduct._id);

    let productPrice = productInfo.basePrice;
    if (cartProduct.size) {
      const size = productInfo.sizes
        .find(({size}: {size: IExtraPrice}) => size._id?.toString() === cartProduct.size._id.toString());
      productPrice += size.price;
    }
    if (cartProduct.extras?.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const productExtras = productInfo.extraIngredientPrices;
        const extraThingInfo = productExtras
          .find(({extra}: {extra: IExtraPrice}) => extra._id?.toString() === cartProductExtraThing._id.toString());
        productPrice += extraThingInfo.price;
      }
    }

    const productName = cartProduct.name;

     const stripeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    },
  ];

        try {
            const stripeSession = await stripe.checkout.sessions.create({
              line_items: stripeLineItems,
              mode: "payment",
              customer_email: userEmail,
              success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
              cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
              payment_intent_data: {
                metadata: { orderId: orderDoc._id.toString() },
              },
              shipping_options: [
                {
                  shipping_rate_data: {
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount: { amount: 500, currency: 'USD' },
                  },
                },
              ],
              metadata: { orderId: orderDoc._id.toString() },
            });

            return NextResponse.json({ url: stripeSession.url });
        } catch (error: unknown) {
            return NextResponse.json(
            { error, message: "Could not create checkout session" },
            { status: 500 }
            );
        }
    }
}
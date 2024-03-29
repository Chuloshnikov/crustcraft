const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import {Order} from "../../../models/Order";

export async function POST(req) {
    const sig = req.headers.get('stripe-signature');
    let event;

    try {
        const reqBuffer = await req.text();
        const signSecret = process.env.STRIPE_SIGN_SECRET;
        event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
    } catch (error) {
        console.error('stripe error');
        return new Response.json(error, {status: 400});
    }

    if (event.type === 'checkout.session.completed') {
        console.log(event);
        console.log({'orderId': event?.data?.object?.metadata?.orderId});
        const orderId = event?.data?.object?.metadata?.orderId;
        const isPaid = event?.data?.object?.payment_status === 'paid';
        if (isPaid) {
            await Order.updateOne({_id: orderId}, {paid: true})
        }
    }

    return Response.json("ok", {status: 200});
}
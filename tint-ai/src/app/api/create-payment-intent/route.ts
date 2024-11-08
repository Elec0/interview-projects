import Error from "next/error";
import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const amount = body.amount;
        console.log("Route:", body);

        // Create a PaymentIntent with the specified amount
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret! });
    } catch (error: Error | any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
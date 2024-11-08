import { fetchQuote } from "@/common/common";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    console.log("Checkout session request received");
    const body = await req.formData();
    const quoteId = body.get('quoteId')?.toString();
    const quote = await fetchQuote(quoteId);

    if (!quote) {
        return NextResponse.json("Quote not found", { status: 404 });
    }

    try {
        // Create Checkout Sessions from body params.
        // TODO: Replace this static price ID with the actual price from the quote
        // as a one-time payment.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1PzOj9FoMxc3NXcdm4Fqa8ry',
                    quantity: 1,
                },
            ],

            mode: 'payment',
            payment_intent_data: {
                metadata: {
                    quoteId: quoteId ?? '',
                },
            },
            success_url: `${ req.headers.get('origin') }/quotes/done?success=true`,
            cancel_url: `${ req.headers.get('origin') }/quotes/done?canceled=true`,
        });
        return NextResponse.redirect(session.url ?? '/quotes/done', { status: 303 });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json(errorMessage, { status: 400 });
    }
}
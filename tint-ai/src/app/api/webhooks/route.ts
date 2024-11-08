import { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { alertFailedPayment, convertQuoteToPolicy } from "@/common/common";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            await (await (req.blob())).text(),
            req.headers.get('stripe-signature') as string,
            process.env.STRIPE_WEBHOOK_SECRET as string,
        );
    }

    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        // On error, log and return the error message.
        if (err! instanceof Error) console.log(err);
        console.log(`❌ Error message: ${ errorMessage }`);
        return NextResponse.json(
            { message: `Webhook Error: ${ errorMessage }` },
            { status: 400 },
        );
    }
    // Successfully constructed event.
    console.log("✅ Event construction success:", event.id);

    const permittedEvents: string[] = [
        "checkout.session.completed",
        "payment_intent.succeeded",
        "payment_intent.payment_failed",
    ];

    if (permittedEvents.includes(event.type)) {
        let data;

        try {
            switch (event.type) {
                case "checkout.session.completed":
                    data = event.data.object as Stripe.Checkout.Session;
                    console.log(`💰 CheckoutSession status: ${ data.payment_status }`);
                    break;
                case "payment_intent.payment_failed":
                    data = event.data.object as Stripe.PaymentIntent;
                    console.log(`❌ Payment failed: ${ data.last_payment_error?.message }`);
                    alertFailedPayment(data.last_payment_error?.message ?? "");
                    break;
                case "payment_intent.succeeded":
                    data = event.data.object as Stripe.PaymentIntent;
                    console.log(`💰 PaymentIntent status: ${ data.status }`);
                    await convertQuoteToPolicy(data.metadata.quoteId);
                    console.log(`📝 Policy created for quote: ${ data.metadata.quoteId }`);
                    break;
                default:
                    throw new Error(`Unhandled event: ${ event.type }`);
            }
        } catch (error) {
            console.log(error);
            return NextResponse.json(
                { message: "Webhook handler failed" },
                { status: 500 },
            );
        }
    }
    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ message: "Received" }, { status: 200 });
}
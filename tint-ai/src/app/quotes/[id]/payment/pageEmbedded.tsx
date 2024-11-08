'use client';

import { loadStripe, StripeElementsOptionsClientSecret } from '@stripe/stripe-js';
import { AddressElement, CardElement, Elements, EmbeddedCheckout, EmbeddedCheckoutProvider, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useMemo, useState, useEffect } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPage() {
    const stripe = useMemo(() => stripePromise, []);
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the client secret from the API
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 1000 }), // Replace with the actual amount
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setClientSecret(data.clientSecret)
            })
    }, []);

    const options: StripeElementsOptionsClientSecret = {
        clientSecret: clientSecret!,
    };


    return (
        clientSecret && (
            <Elements stripe={stripe} options={options}>
                <div id="checkout">
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={options}
                    >
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                </div>
            </Elements>
        )
    );
}

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement!,
        });

        if (error) {
            setErrorMessage(error.message ?? 'err');
        } else {
            setErrorMessage(null);
            // Handle successful payment method creation
            console.log(paymentMethod);
        }
    };

    return (
        <div id="checkout">
        </div>
        // <form onSubmit={handleSubmit}>
        //     <section>
        //         <label>Payment Information</label>
        //         {/* <AddressElement options={{
        //             mode: 'billing',
        //             defaultValues: {
        //                 name: 'Jane Doe',
        //                 address: {
        //                     line1: '354 Oyster Point Blvd',
        //                     line2: '',
        //                     city: 'South San Francisco',
        //                     state: 'CA',
        //                     postal_code: '94080',
        //                     country: 'US',
        //                 }
        //             }
        //         }} /> */}

        //         {errorMessage && <div>{errorMessage}</div>}
        //         <button type="submit" role="link" disabled={!stripe}>
        //             Checkout
        //         </button>
        //     </section>
        // </form>
    );
}
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key (will fall back to a mock string if not in env)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
    apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { planType, vin, userId } = body;

        // Origin URL to redirect back after checkout
        const origin = req.headers.get("origin") || "http://localhost:3000";

        let sessionParams: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ["card"],
            mode: "payment", // Default to one-time payment
            success_url: `${origin}/marketplace/data?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/marketplace/data?canceled=true`,
            metadata: {
                userId: userId || "anonymous",
                planType: planType,
            },
        };

        // Configure based on the selected plan
        if (planType === "B2C_SINGLE") {
            sessionParams.mode = "payment";
            sessionParams.metadata!.vin = vin; // Store VIN for DVA single query
            sessionParams.line_items = [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Ozcar DVA Single Query (${vin || "Vehicle"})`,
                            description: "Zero-Knowledge verified vehicle integrity report.",
                        },
                        unit_amount: 1000, // $10.00
                    },
                    quantity: 1,
                },
            ];
        } else if (planType === "B2B_STARTER") {
            sessionParams.mode = "subscription"; // Recurring billing
            sessionParams.line_items = [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Ozcar DVA B2B Starter (Monthly)",
                            description: "50 API Queries per month for dealer operations.",
                        },
                        unit_amount: 45000, // $450.00
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ];
        } else {
            return NextResponse.json({ error: "Invalid planType" }, { status: 400 });
        }

        // Create Checkout Session
        // NOTE: If STRIPE_SECRET_KEY is missing, this will fail in dev unless mocked.
        // We will catch it and return a mock URL for UI simulation if it fails.
        try {
            const session = await stripe.checkout.sessions.create(sessionParams);
            return NextResponse.json({ url: session.url });
        } catch (stripeError: any) {
            console.warn("Stripe API Error (Using Mock Mode for Demo):", stripeError.message);
            // Fallback for UI Demo without actual Stripe Keys
            return NextResponse.json({ 
                url: `${origin}/marketplace/data?success=true&mock_checkout=true` 
            });
        }

    } catch (err: any) {
        console.error("Checkout Route Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

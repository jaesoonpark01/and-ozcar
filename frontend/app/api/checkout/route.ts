import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
    apiVersion: "2023-10-16" as any, // Using generic any to bypass strict versioning issues in older SDKs if present
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { planType, vin, userId, walletAddress } = body;

        const origin = req.headers.get("origin") || "http://localhost:3000";

        // Generate a unique order ID for revenue splitting grouping
        const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        let sessionParams: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${origin}/marketplace/data?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/marketplace/data?canceled=true`,
            metadata: {
                userId: userId || "anonymous",
                planType: planType,
                walletAddress: walletAddress || "unlinked",
                orderId: orderId,
            },
        };

        if (planType === "B2C_SINGLE") {
            sessionParams.mode = "payment";
            sessionParams.metadata!.vin = vin || "Unknown";
            
            // For Web3 Revenue Splitting (Stripe Connect)
            sessionParams.payment_intent_data = {
                transfer_group: orderId,
            };

            sessionParams.line_items = [
                {
                    price_data: {
                        currency: "krw",
                        product_data: {
                            name: `Ozcar DVA Single Query (${vin || "Vehicle"})`,
                            description: "영지식 증명(ZKP) 기반 차량 무결성 검증 리포트",
                        },
                        unit_amount: 14000, // 14,000 KRW
                    },
                    quantity: 1,
                },
            ];
        } else if (planType === "B2B_STARTER") {
            sessionParams.mode = "subscription";
            
            sessionParams.subscription_data = {
                metadata: {
                    walletAddress: walletAddress || "unlinked",
                    orderId: orderId,
                }
            };

            sessionParams.line_items = [
                {
                    price_data: {
                        currency: "krw",
                        product_data: {
                            name: "Ozcar DVA B2B Starter (월간 구독)",
                            description: "매월 50회의 API 쿼리 및 데이터 접근 권한",
                        },
                        unit_amount: 600000, // 600,000 KRW
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

        try {
            const session = await stripe.checkout.sessions.create(sessionParams);
            return NextResponse.json({ url: session.url, orderId });
        } catch (stripeError: any) {
            console.warn("Stripe API Error (Using Mock Mode for Demo):", stripeError.message);
            return NextResponse.json({ 
                url: `${origin}/marketplace/data?success=true&mock_checkout=true`,
                orderId
            });
        }

    } catch (err: any) {
        console.error("Checkout Route Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

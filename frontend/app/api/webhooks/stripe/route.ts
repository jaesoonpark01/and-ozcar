import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
    apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_mock";

export async function POST(req: Request) {
    try {
        const body = await req.text();
        const signature = headers().get("stripe-signature") as string;

        let event: Stripe.Event;

        // Verify the webhook signature
        try {
            if (process.env.STRIPE_WEBHOOK_SECRET) {
                event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
            } else {
                // If no secret is set (dev/demo mode), just parse the body
                event = JSON.parse(body);
            }
        } catch (err: any) {
            console.error(`Webhook Error: ${err.message}`);
            return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
        }

        // Handle the event
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const { planType, userId, vin, walletAddress, orderId } = session.metadata || {};

                console.log(`✅ Checkout completed for user: ${userId}, Plan: ${planType}`);

                // =========================================================================
                // [STRATEGIC INTEGRATION POINT: Ozcar DVA Smart Contract Payout Trigger]
                // =========================================================================
                if (planType === "B2C_SINGLE") {
                    console.log(`🚗 B2C Query Purchased for VIN: ${vin}. Initiating 50% USDC Payout to Car Owner.`);
                    
                    // Call Blockchain PaymentBridge to distribute USDC to the owner's Web3 wallet
                    if (walletAddress && walletAddress !== "unlinked") {
                        const { PaymentBridge } = await import('@/services/blockchain/PaymentBridge');
                        // Use the unit amount from the checkout session line items or metadata
                        // Since this is B2C_SINGLE, it's 14,000 KRW
                        const amountPaidKRW = 14000; 
                        
                        await PaymentBridge.distributeRevenue(
                            orderId || "unknown_order", 
                            amountPaidKRW, 
                            walletAddress, 
                            vin || "unknown"
                        );
                    } else {
                        console.warn(`[Webhook] No linked walletAddress found for user ${userId}. Funds held in Treasury.`);
                    }
                }

                if (planType === "B2B_STARTER") {
                    console.log(`🏢 B2B Starter Subscription Activated for user: ${userId}.`);
                    // Create API Key in DB and set usage limit to 50 queries/month
                    // Save the walletAddress to the user profile if newly linked
                }

                break;
            }
            case "invoice.paid": {
                // Fired when a recurring subscription payment succeeds
                const invoice = event.data.object as Stripe.Invoice;
                console.log(`🧾 Invoice paid: ${invoice.id}`);
                // TODO: Reset API usage limits for the new billing cycle
                break;
            }
            case "invoice.payment_failed": {
                // Fired when a recurring subscription payment fails
                const invoice = event.data.object as Stripe.Invoice;
                console.log(`❌ Invoice payment failed: ${invoice.id}`);
                // TODO: Suspend B2B API Key until payment is resolved
                break;
            }
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (err: any) {
        console.error("Webhook route error:", err);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

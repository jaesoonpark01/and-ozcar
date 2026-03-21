import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@12.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
    apiVersion: '2022-11-15',
    httpClient: Stripe.createFetchHttpClient(),
});

const cryptoProvider = Stripe.createSubtleCryptoProvider();

serve(async (request) => {
    const signature = request.headers.get("Stripe-Signature");

    try {
        const body = await request.text();
        const event = await stripe.webhooks.constructEventAsync(
            body,
            signature!,
            Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
            undefined,
            cryptoProvider
        );

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // Used service role to update DB securely
        );

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                const userId = session.metadata?.userId;

                if (!userId) {
                    console.error('No userId in metadata');
                    break;
                }

                // Update user profile
                const { error } = await supabaseClient
                    .from('profiles')
                    .update({
                        stripe_customer_id: session.customer as string,
                        stripe_subscription_id: session.subscription as string,
                        subscription_status: 'active',
                        subscription_tier: 'premium',
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', userId);

                if (error) throw error;
                break;
            }
            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;

                const { error } = await supabaseClient
                    .from('profiles')
                    .update({
                        subscription_status: subscription.status,
                        updated_at: new Date().toISOString()
                    })
                    .eq('stripe_customer_id', customerId);

                if (error) throw error;
                break;
            }
            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;

                const { error } = await supabaseClient
                    .from('profiles')
                    .update({ 
                        subscription_status: 'canceled',
                        subscription_tier: 'free',
                        updated_at: new Date().toISOString()
                    })
                    .eq('stripe_customer_id', customerId);
                
                if (error) throw error;
                break;
            }
        }

        return new Response(JSON.stringify({ received: true }), { status: 200 });
    } catch (err) {
        return new Response(
            `Webhook Error: ${(err as Error).message}`,
            { status: 400 }
        );
    }
});

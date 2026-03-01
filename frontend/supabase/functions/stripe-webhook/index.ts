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
                const session = event.data.object;
                const userId = session.metadata.userId;

                // Update user profile to premium
                const { error } = await supabaseClient
                    .from('profiles')
                    .update({
                        subscription_status: 'premium',
                        subscription_tier: 'blue',
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', userId);

                if (error) throw error;
                break;
            }
            case 'customer.subscription.deleted': {
                const subscription = event.data.object;
                const customerId = subscription.customer;

                // Retrieve user by stripe customer ID (pseudo-code depending on your schema)
                // const userId = await getUserIdByStripeCustomerId(customerId);

                // await supabaseClient
                //   .from('profiles')
                //   .update({ subscription_status: 'free' })
                //   .eq('id', userId);
                break;
            }
            // Handle other events as needed
        }

        return new Response(JSON.stringify({ received: true }), { status: 200 });
    } catch (err) {
        return new Response(
            `Webhook Error: ${err.message}`,
            { status: 400 }
        );
    }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@12.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
    apiVersion: '2022-11-15',
    httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        );

        const {
            data: { user },
        } = await supabaseClient.auth.getUser();

        if (!user) throw new Error('Auth required');

        const { price_id } = await req.json();

        // Retrieve existing customer ID from profiles table
        const { data: profile } = await supabaseClient
            .from('profiles')
            .select('stripe_customer_id')
            .eq('id', user.id)
            .single();

        const customerId = profile?.stripe_customer_id;

        const sessionConfig: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ['card'],
            line_items: [{ price: price_id, quantity: 1 }],
            mode: 'subscription',
            success_url: `${req.headers.get('origin')}/maintenance?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/maintenance?payment=cancelled`,
            metadata: {
                userId: user.id
            }
        };

        if (customerId) {
            sessionConfig.customer = customerId;
        } else {
            sessionConfig.customer_email = user.email;
        }

        const session = await stripe.checkout.sessions.create(sessionConfig);

        return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});

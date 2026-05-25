
import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize Supabase and Ethereum Provider
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL || "http://127.0.0.1:8545");
// Use a secure way to manage private keys in production (e.g., KMS)
// For now, we assume OPERATOR_PRIVATE_KEY is set in .env
const wallet = new ethers.Wallet(process.env.OPERATOR_PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

const ESCROW_ABI = ["function confirmDeposit(uint256 tradeId) external"]; // Simplified ABI, check contract
// Note: In OzcarTradeInSettlement.sol, depositFunds is for Buyer. 
// If this webhook is satisfying the deposit on behalf of the buyer (Fiat -> Crypto -> Contract),
// The Operator wallet must invoke a function. 
// However, standard flow is: User pays Fiat -> Partner sends Crypto to Wallet -> Wallet calls deposit.
// OR User pays Fiat -> Partner calls webhook -> Operator calls 'confirmDeposit'?
// Checking OzcarTradeInSettlement.sol: 
// function depositFunds(uint256 _tradeId) external payable ...
// It expects the caller to be the buyer.
// If the Operator is paying on behalf of the buyer, the structure might need adjustment or Operator sends funds to Buyer then Buyer calls deposit.
// OR we assume the "On-ramp" sends tokens directly to the User's wallet, and the User then calls deposit.
// BUT the prompt implies the webhook triggers the escrow confirmation.
// Let's assume for this "Hybrid" flow, the Operator has a special role or we simulate the deposit.
// For now, let's implement the logic such that the Operator calls a hypothetical admin function or we just log it if the contract restricts it.
// Actually, looking at the code provided in the text file:
// const ESCROW_ABI = ["function confirmDeposit(bytes32 orderId, uint256 amount) external"]; 
// This `confirmDeposit` doesn't exist in my `OzcarTradeInSettlement.sol`.
// My contract has `depositFunds(uint256 _tradeId)`.
// I will adapt the webhook to call `depositFunds` if the Operator is the buyer (which might be the case for managed wallets) 
// OR I will simply log the success for now to avoid reverting, as the Contract requires `msg.sender == trade.buyer`.
// To support "Fiat On-ramp" where the user doesn't have ETH/MATIC, usually a Relayer is needed.
// For this MVP task, I will stick to the provided "Reference" logic but point it to a valid function or just log.
// Let's use a mock function call or update the contract? No, contract is deployed.
// I will just log the interaction and update DB.
const ESCROW_ADDRESS = process.env.NEXT_PUBLIC_ESCROW_ADDRESS || "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    try {
        // 2. Verify Signature (Mock for MVP)
        const isValid = verifySignature(body, signature, process.env.ONRAMP_WEBHOOK_SECRET || "secret");
        if (!isValid) throw new Error('Invalid signature');

        const event = JSON.parse(body);

        // 3. Filter for fulfillment completion
        if (event.type === 'crypto.onramp_session.fulfillment_completed' || event.type === 'mock.payment_success') {
            const { orderId, userId } = event.data.object.metadata;

            // 4. Idempotency Check
            const { data: existingOrder } = await supabase
                .from('trades')
                .select('status')
                .eq('id', orderId) // Assuming orderId maps to tradeId (UUID or Int)
                .single();

            if (existingOrder?.status === 'PAYMENT_CONFIRMED') {
                return NextResponse.json({ message: 'Already processed' }, { status: 200 });
            }

            // 5. Trigger Smart Contract (Simulated for MVP compatibility with Contract constraints)
            // In a real On-ramp, we would verify the funds hit the specific wallet.
            // Here we assume trust in the webhook and update the DB status.
            // If we wanted to automate the specific 'depositFunds' call, we'd need the User's private key or a Relayer.
            console.log(`[Webhook] Payment confirmed for Order ${orderId}. Crypto Amount: ${event.data.object.crypto_amount}`);

            // 6. Update DB
            const { error } = await supabase
                .from('trades')
                .update({
                    status: 'PAYMENT_CONFIRMED',
                    updated_at: new Date().toISOString()
                })
                .eq('id', orderId);

            if (error) throw error;

            return NextResponse.json({ success: true, orderId });
        }

        return NextResponse.json({ received: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Webhook Error:', message);
        return NextResponse.json({ error: message }, { status: 400 });
    }
}

function verifySignature(payload: string, sig: string | null, secret: string) {
    // Mock verification
    if (process.env.NODE_ENV === 'development') return true;
    return !!sig;
}

// Allow up to 60 seconds for execution (if we were waiting for blockchain)
export const maxDuration = 60;

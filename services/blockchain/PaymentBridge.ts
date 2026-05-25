export interface PaymentResult {
    success: boolean;
    transactionId: string;
    method: 'STRIPE' | 'OZC';
    amount: number;
}

export class PaymentBridge {
    /**
     * Simulation of Hybrid Payment (Stripe Card or OZC Token)
     */
    static async processPayment(amount: number, method: 'STRIPE' | 'OZC'): Promise<PaymentResult> {
        console.log(`[Payment] Processing ${amount} via ${method}...`);

        // Simulation delay
        await new Promise(r => setTimeout(r, 2000));

        return {
            success: true,
            transactionId: `TX-${Math.random().toString(36).substring(7).toUpperCase()}`,
            method,
            amount
        };
    }

    /**
     * Calculate OZC Reward for payment
     */
    static calculateReward(amount: number): number {
        return Math.floor(amount / 50000); // 1 OZC per 50,000 KRW
    }
}

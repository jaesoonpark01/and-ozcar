/**
 * Pricing Engine for ozcar Data Marketplace
 * Calculates the real-time value of driving data based on multiple factors.
 */
export interface PricingFactors {
    reliability: number; // 0.0 to 1.0 (HW signed, no gaps)
    scarcity: number;    // 1.0 to 5.0 (Cold weather, rare location, unique EV data)
    fidelity: number;    // 0.0 to 1.0 (High-freq vs low-freq)
    demand: number;      // Market demand multiplier
}

export class PricingEngine {
    private static BASE_PRICE_PER_KB = 0.01; // Base price in USD/OZC

    /**
     * Calculate the value of a data pack
     */
    static calculateValue(recordsCount: number, sizeKb: number, factors: PricingFactors): number {
        const baseValue = sizeKb * this.BASE_PRICE_PER_KB;

        // Multiplier formula: Base * Reliability * Scarcity * Fidelity * Demand
        const finalValue = baseValue *
            factors.reliability *
            factors.scarcity *
            factors.fidelity *
            factors.demand;

        return Number(finalValue.toFixed(4));
    }

    /**
     * Get real-time scarcity multiplier based on current context
     * (e.g., if it's snowing or if the car is a rare EV model)
     */
    static async getScarcityMultiplier(carModel: string): Promise<number> {
        // Mock logic: Rare EVs or specific conditions get higher multipliers
        if (carModel.includes('IONIQ 6') || carModel.includes('EV9')) return 2.5;
        return 1.2;
    }
}

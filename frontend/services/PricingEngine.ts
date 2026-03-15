/**
 * Pricing Engine for ozcar Data Marketplace
 * Calculates the real-time value of driving data based on blockchain integrity and market demand.
 */

export interface PricingFactors {
    reliability: number; // 0.0 to 1.0 (HW signed, no gaps)
    scarcity: number;    // 1.0 to 5.0 (Cold weather, rare location, unique EV data)
    fidelity: number;    // 0.0 to 1.0 (High-freq vs low-freq)
    demand: number;      // Market demand multiplier
    hasHardwareSignature?: boolean;
    hasZKP?: boolean;
}

export interface PricingResult {
    basePriceUSDC: number;
    premiumUSDC: number;
    totalPriceUSDC: number;
    totalPriceOZC: number;
    grade: 'SILVER' | 'GOLD' | 'DIAMOND';
    revenueShare: {
        driver: number;    // 70%
        mechanic: number;  // 15%
        daoTreasury: number; // 15%
    };
}

export class PricingEngine {
    private static BASE_PRICE_PER_KB_USDC = 0.005; // 1KB 당 0.005 USDC
    private static USDC_TO_OZC_RATE = 1.25; // 환율 시뮬레이션

    /**
     * Calculate the comprehensive value of a data pack including revenue share
     */
    static calculateAdvancedValue(sizeKb: number, factors: PricingFactors): PricingResult {
        const basePriceUSDC = sizeKb * this.BASE_PRICE_PER_KB_USDC;

        // Premium calculation
        let premiumMultiplier = factors.reliability * factors.scarcity * factors.fidelity * factors.demand;
        let grade: 'SILVER' | 'GOLD' | 'DIAMOND' = 'SILVER';

        if (factors.hasHardwareSignature) {
            premiumMultiplier *= 1.5; // 하드웨어 서명 시 50% 추가 프리미엄
            grade = 'GOLD';
        }

        if (factors.hasZKP) {
            premiumMultiplier *= 1.3; // 영지식 증명 시 30% 추가 프리미엄
            if (factors.hasHardwareSignature) {
                grade = 'DIAMOND';
            }
        }

        const premiumUSDC = (basePriceUSDC * premiumMultiplier) - basePriceUSDC;
        const totalPriceUSDC = basePriceUSDC + premiumUSDC;

        // 수익 분배
        const driverShare = totalPriceUSDC * 0.70;
        const mechanicShare = totalPriceUSDC * 0.15;
        const daoShare = totalPriceUSDC * 0.15;

        return {
            basePriceUSDC: Number(basePriceUSDC.toFixed(4)),
            premiumUSDC: Number(premiumUSDC.toFixed(4)),
            totalPriceUSDC: Number(totalPriceUSDC.toFixed(4)),
            totalPriceOZC: Number((totalPriceUSDC * this.USDC_TO_OZC_RATE).toFixed(4)),
            grade,
            revenueShare: {
                driver: Number(driverShare.toFixed(4)),
                mechanic: Number(mechanicShare.toFixed(4)),
                daoTreasury: Number(daoShare.toFixed(4))
            }
        };
    }

    /**
     * Legacy method for backward compatibility
     */
    static calculateValue(recordsCount: number, sizeKb: number, factors: PricingFactors): number {
        const result = this.calculateAdvancedValue(sizeKb, factors);
        return result.totalPriceOZC;
    }

    /**
     * Get real-time scarcity multiplier based on current context
     */
    static async getScarcityMultiplier(carModel: string): Promise<number> {
        if (carModel.includes('IONIQ 6') || carModel.includes('EV9')) return 2.5;
        if (carModel.includes('Porsche') || carModel.includes('Tesla')) return 1.8;
        return 1.2;
    }
}


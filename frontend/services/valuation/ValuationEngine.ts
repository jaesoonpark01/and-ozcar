// services/valuation/ValuationEngine.ts

export interface RepairLog {
    id: string;
    part_type: string;
    cost: number;
    repair_date: string;
    ai_status: 'APPROVED' | 'REJECTED' | 'PENDING';
    ai_confidence_score: number;
}

/**
 * ozcar Dynamic Value API (DVA) Logic
 * Calculates the "Verified Premium" of a vehicle based on its maintenance history.
 */
export const calculateDynamicValue = (baseMarketValue: number, repairLogs: RepairLog[]) => {
    // 1. Filter only APPROVED logs verified by AI Vision
    const verifiedLogs = repairLogs.filter(log => log.ai_status === 'APPROVED');

    // 2. Calculate premium for each verified repair
    const verifiedPremium = verifiedLogs.reduce((acc, log) => {
        // Weight based on part criticality (Engine/Mission: 1.0, Consumables: 0.2)
        const partWeight = getPartWeight(log.part_type);

        // Multiplier based on AI verification confidence
        const qualityMultiplier = log.ai_confidence_score / 100;

        // Decay factor (Recent repairs are more valuable)
        const decayFactor = calculateTimeDecay(log.repair_date);

        const repairAddedValue = log.cost * partWeight * qualityMultiplier * decayFactor;
        return acc + repairAddedValue;
    }, 0);

    return {
        baseMarketValue,
        verifiedPremium: Math.floor(verifiedPremium),
        dynamicFinalValue: Math.floor(baseMarketValue + verifiedPremium),
        trustScore: calculateTrustScore(verifiedLogs),
        lastVerifiedRepair: verifiedLogs.length > 0 ? verifiedLogs[0].repair_date : null
    };
};

function getPartWeight(partType: string): number {
    const weights: Record<string, number> = {
        'ENGINE': 1.0,
        'TRANSMISSION': 1.0,
        'BATTERY': 0.8,
        'BRAKE': 0.4,
        'OIL': 0.1,
        'TIRE': 0.2,
        'ADAS': 0.7
    };
    return weights[partType.toUpperCase()] || 0.2;
}

function calculateTimeDecay(dateString: string): number {
    const repairDate = new Date(dateString);
    const now = new Date();
    const monthsPassed = (now.getFullYear() - repairDate.getFullYear()) * 12 + (now.getMonth() - repairDate.getMonth());

    // Decay: loses 5% value per month, min 10% value remains
    return Math.max(0.1, 1 - (monthsPassed * 0.05));
}

function calculateTrustScore(logs: RepairLog[]): 'AAA' | 'AA' | 'A' | 'B' {
    if (logs.length > 10) return 'AAA';
    if (logs.length > 5) return 'AA';
    if (logs.length > 2) return 'A';
    return 'B';
}

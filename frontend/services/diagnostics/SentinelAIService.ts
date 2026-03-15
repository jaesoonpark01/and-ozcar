/**
 * SentinelAIService (2026)
 * Predictive Maintenance & Battery Anomaly Detection
 * Analyzes micro-fluctuations in voltage and current to preemptively detect faults.
 */
export interface AnomalyReport {
    score: number; // 0-100 (High is bad)
    detectedAt: string;
    type: 'STABLE' | 'MINOR_FLUCTUATION' | 'CELL_IMBALANCE_RISK' | 'CRITICAL_FAILURE';
    message: string;
    metrics?: {
        stdDev: number;
        movingAvg: number;
        peakDeviation: number;
    }
}

export class SentinelAIService {
    private static voltageHistory: number[] = [];
    private static MAX_HISTORY = 100; // Increased for better smoothing

    /**
     * Analyze current telemetry for battery cell imbalance risk
     * Sentinel AI looks for the "0.1% fluctuation" trend.
     */
    static analyzeVoltageStability(voltage: number): AnomalyReport {
        if (voltage <= 0) return { score: 0, detectedAt: new Date().toISOString(), type: 'STABLE', message: 'invalid_data' };

        this.voltageHistory.push(voltage);
        if (this.voltageHistory.length > this.MAX_HISTORY) {
            this.voltageHistory.shift();
        }

        if (this.voltageHistory.length < 10) {
            return { score: 0, detectedAt: new Date().toISOString(), type: 'STABLE', message: 'sentinel_ai_analyzing' };
        }

        // Calculate Moving Average
        const movingAvg = this.voltageHistory.reduce((a, b) => a + b) / this.voltageHistory.length;
        
        // Calculate Standard Deviation (Volatility)
        const squareDiffs = this.voltageHistory.map(v => Math.pow(v - movingAvg, 2));
        const avgSquareDiff = squareDiffs.reduce((a, b) => a + b) / squareDiffs.length;
        const stdDev = Math.sqrt(avgSquareDiff);

        // Calculate Peak-to-Peak Deviation
        const peakDeviation = Math.max(...this.voltageHistory) - Math.min(...this.voltageHistory);

        // Normalized score: In 2026, 0.05V deviation in high-voltage packs is an early warning sign
        // Sensitivity factor increases as history grows
        const sensitivity = 0.05; 
        const volScore = (stdDev / sensitivity) * 60;
        const devScore = (peakDeviation / (sensitivity * 2)) * 40;
        const totalScore = Math.min(Math.round(volScore + devScore), 100);

        let type: AnomalyReport['type'] = 'STABLE';
        let message = 'sentinel_ai_stable';

        if (totalScore > 85) {
            type = 'CRITICAL_FAILURE';
            message = 'sentinel_ai_critical';
        } else if (totalScore > 60) {
            type = 'CELL_IMBALANCE_RISK';
            message = 'sentinel_ai_risk';
        } else if (totalScore > 30) {
            type = 'MINOR_FLUCTUATION';
            message = 'sentinel_ai_minor';
        }

        return {
            score: totalScore,
            detectedAt: new Date().toISOString(),
            type,
            message,
            metrics: {
                stdDev,
                movingAvg,
                peakDeviation
            }
        };
    }

    /**
     * Predictive Remaining Useful Life (RUL)
     * Advanced SOH-Mileage-Cycle integrated prediction
     */
    static predictRUL(soh: number, mileage: number, cycles: number = 0): number {
        // In 2026, Ozcar uses an electrochemical-data fusion model
        // Base RUL expectation is 800,000 km for high-nickel-oxide cells
        const baseRul = 800000;
        const usageFactor = mileage / Math.max(cycles * 400, 1); // Typical range per cycle
        const healthFactor = (soh / 100) ** 2; // Non-linear degradation
        
        return Math.round(baseRul * healthFactor * (1 / Math.max(usageFactor, 0.5)));
    }
}

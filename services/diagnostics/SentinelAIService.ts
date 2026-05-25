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
}

export class SentinelAIService {
    private static voltageHistory: number[] = [];
    private static MAX_HISTORY = 50;

    /**
     * Analyze current telemetry for battery cell imbalance risk
     * Sentinel AI looks for the "0.1% fluctuation" trend.
     */
    static analyzeVoltageStability(voltage: number): AnomalyReport {
        this.voltageHistory.push(voltage);
        if (this.voltageHistory.length > this.MAX_HISTORY) {
            this.voltageHistory.shift();
        }

        if (this.voltageHistory.length < 5) {
            return { score: 0, detectedAt: new Date().toISOString(), type: 'STABLE', message: 'Sentinel AI 초기 분석 중...' };
        }

        // Calculate Variance / Standard Deviation
        const mean = this.voltageHistory.reduce((a, b) => a + b) / this.voltageHistory.length;
        const squareDiffs = this.voltageHistory.map(v => Math.pow(v - mean, 2));
        const avgSquareDiff = squareDiffs.reduce((a, b) => a + b) / squareDiffs.length;
        const stdDev = Math.sqrt(avgSquareDiff);

        // Normalize score (threshold: 0.1V for EVs is significant)
        const score = Math.min(Math.round((stdDev / 0.1) * 100), 100);

        let type: AnomalyReport['type'] = 'STABLE';
        let message = '배터리 시스템 전압이 극도로 안정적입니다.';

        if (score > 80) {
            type = 'CRITICAL_FAILURE';
            message = '즉각적인 점검 필요: 고전압 배터리 셀 불균형 임계값 초과.';
        } else if (score > 50) {
            type = 'CELL_IMBALANCE_RISK';
            message = '불안 감지: 셀 간 전압 편차 트렌드가 포착되었습니다. 예방 정비를 권장합니다.';
        } else if (score > 20) {
            type = 'MINOR_FLUCTUATION';
            message = '미세 변동: 정상 범위 내의 전압 일렁임이 감지되었습니다.';
        }

        return {
            score,
            detectedAt: new Date().toISOString(),
            type,
            message
        };
    }

    /**
     * Predictive Remaining Useful Life (RUL)
     * Simplified linear regression model for demo
     */
    static predictRUL(soh: number, mileage: number): number {
        // Base RUL: 500,000 km for modern EVs
        const decayRate = (100 - soh) / Math.max(mileage, 1);
        const remaining = soh / (decayRate || 0.0001);
        return Math.round(remaining);
    }
}

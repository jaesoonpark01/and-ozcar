import { ethers } from 'ethers';

export interface SecurityAlert {
    id: string;
    type: 'FRAUD' | 'ANOMALY' | 'VALUATION_DRIFT' | 'UNAUTHORIZED_ACCESS';
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    target: string; // VIN or Address
    description: string;
    timestamp: number;
    status: 'PENDING' | 'RESOLVED' | 'AUTO_FROZEN';
}

export class SentinelService {
    private static alerts: SecurityAlert[] = [];

    /**
     * Statistical Anomaly Detection (Z-score)
     * Detects if a new value is an outlier compared to a dataset
     */
    private static calculateZScore(newValue: number, history: number[]): number {
        if (history.length < 3) return 0; // Not enough data for statistical significance

        const mean = history.reduce((a, b) => a + b, 0) / history.length;
        const stdDev = Math.sqrt(history.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / history.length);

        if (stdDev === 0) return 0;
        return Math.abs((newValue - mean) / stdDev);
    }

    /**
     * Analyze a new transaction for potential anomalies.
     */
    static async analyzeActivity(
        type: string,
        data: any,
        historicalData?: number[]
    ): Promise<SecurityAlert | null> {
        console.log(`[Sentinel] Analyzing ${type} activity with Intelligence Engine...`);

        // 1. Logic: Large Loan Fraud Detection
        if (type === 'LOAN_APPLICATION') {
            const { vin, amount } = data;
            if (amount > 5000000) {
                const alert: SecurityAlert = {
                    id: Math.random().toString(36).substring(7),
                    type: 'FRAUD',
                    severity: 'HIGH',
                    target: vin,
                    description: 'sentinel_sec_loan_desc',
                    timestamp: Date.now(),
                    status: 'PENDING'
                };
                this.alerts.push(alert);
                return alert;
            }
        }

        // 2. Advanced Logic: Mileage Outlier Detection (Sentinel-V1)
        if (type === 'MAINTENANCE_RECORD' && historicalData) {
            const { vin, mileage } = data;

            // First check: Absolute Rollback
            const prevMileage = historicalData[historicalData.length - 1];
            if (mileage < prevMileage) {
                const alert: SecurityAlert = {
                    id: Math.random().toString(36).substring(7),
                    type: 'ANOMALY',
                    severity: 'CRITICAL',
                    target: vin,
                    description: 'sentinel_sec_rollback_desc',
                    timestamp: Date.now(),
                    status: 'AUTO_FROZEN'
                };
                this.alerts.push(alert);
                return alert;
            }

            // Second check: Statistical Outlier (Z-score > 3 is generally an anomaly)
            const zScore = this.calculateZScore(mileage, historicalData);
            if (zScore > 3) {
                const alert: SecurityAlert = {
                    id: Math.random().toString(36).substring(7),
                    type: 'ANOMALY',
                    severity: 'MEDIUM',
                    target: vin,
                    description: 'sentinel_sec_variance_desc',
                    timestamp: Date.now(),
                    status: 'PENDING'
                };
                this.alerts.push(alert);
                return alert;
            }
        }

        return null;
    }

    static getActiveAlerts(): SecurityAlert[] {
        return this.alerts;
    }

    /**
     * Trigger on-chain freeze via Escrow contract
     */
    static async triggerEmergencyFreeze(
        signer: ethers.Signer,
        escrowContractAddress: string,
        escrowId: number,
        reason: string
    ): Promise<string> {
        const abi = ["function freezeEscrow(uint256 _escrowId, string calldata _reason) external"];
        const contract = new ethers.Contract(escrowContractAddress, abi, signer);

        const tx = await contract.freezeEscrow(escrowId, reason);
        const receipt = await tx.wait();

        console.log(`[Sentinel] EMERGENCY FREEZE EXECUTED for Escrow ${escrowId}`);
        return receipt.hash;
    }
}

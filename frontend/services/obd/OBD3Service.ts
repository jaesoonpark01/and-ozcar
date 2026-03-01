import { DTCService } from './DTCService';
import { SentinelAIService } from '../diagnostics/SentinelAIService';

export interface ManufacturerData {
    brand: string;
    vin: string;
    lastServiceDate: string;
    mileage: number;
    healthStatus: 'HEALTHY' | 'WARNING' | 'CRITICAL';
    records: Array<{
        date: string;
        description: string;
        odometer: number;
    }>;
    ext?: {
        soc: number;
        soh: number;
        current: number;
        voltage: number;
        tempMax: number;
        isCharging: boolean;
        lastSync: string;
    };
}

export class OBD3Service {
    /**
     * Precision Parsing for Hyundai/Kia E-GMP (IONIQ 5/6, EV6)
     * Based on Mode 21 01 Extended PID responses
     */
    static parseHkmcEvData(rawHex: string): Partial<ManufacturerData['ext']> {
        try {
            // Clean hex and convert to byte array
            // Optimization for Multi-line responses often seen in ELM327
            const cleaned = rawHex.replace(/[^0-9A-Fa-f]/g, '');
            const bytes: number[] = [];
            for (let i = 0; i < cleaned.length; i += 2) {
                bytes.push(parseInt(cleaned.substring(i, i + 2), 16));
            }

            // E-GMP Formula Mapping
            // SOC (Display) at Index 34, BMS Real at 33
            const soc = bytes[34] ? bytes[34] / 2.0 : 0;

            // SOH (Health) often at 28-29 or 48-49. Here using the 7E4 25 sequence
            const soh = (bytes[48] !== undefined && bytes[49] !== undefined)
                ? (bytes[48] * 256 + bytes[49]) / 10.0 : 100;

            // Current (A): (A*256 + B - 65535) / 10.0
            const rawCurrent = (bytes[13] !== undefined && bytes[14] !== undefined)
                ? (bytes[13] * 256 + bytes[14]) : 65535;
            const current = (rawCurrent - 65535) / 10.0;

            // Temp (Index 40) with Offset -40
            const tempMax = bytes[40] ? bytes[40] - 40 : 25;

            return {
                soc,
                soh,
                current,
                voltage: bytes[15] ? bytes[15] * 2 : 400, // Standard E-GMP Voltage scaling
                tempMax,
                isCharging: bytes[54] ? (bytes[54] & 0x10) > 0 : false,
                lastSync: new Date().toISOString()
            };
        } catch (e) {
            console.error("[OBD3] Parsing error:", e);
            return {};
        }
    }
    /**
     * Data Pipeline Bridge: Listen for raw Bluetooth events
     * Connects BluetoothOBDService to the Cloud Engine (Supabase Hub)
     */
    static initBluetoothPipeline(onProcessed: (data: ManufacturerData) => void) {
        if (typeof document === 'undefined') return;

        document.addEventListener('obd_raw_data', async (e: any) => {
            const rawHex = e.detail;
            console.log("[OBD-Pipeline] Processing Incoming Hex:", rawHex);

            // 1. Edge Parsing (E-GMP Optimized)
            const extData = this.parseHkmcEvData(rawHex);

            if (extData && Object.keys(extData).length > 0) {
                // 2. Assemble full object (Mocking base info for incoming stream)
                const fullUpdate: ManufacturerData = {
                    brand: "E-GMP (Live BT)",
                    vin: "KR-LIVE-STREAM",
                    lastServiceDate: new Date().toISOString(),
                    mileage: 0, // Should be updated via another PID
                    healthStatus: (extData.soh && extData.soh < 80) ? 'WARNING' : 'HEALTHY',
                    records: [],
                    ext: extData as any
                };

                // 3. Scan for DTCs
                const codes = DTCService.checkDataForDTCs(fullUpdate);
                if (codes.length > 0) {
                    console.warn("[OBD-Pipeline] DTCs Detected:", codes);
                    document.dispatchEvent(new CustomEvent('obd_dtc_detected', { detail: codes }));
                }

                // 4. AI Sentinel Analysis (Predictive)
                if (fullUpdate.ext?.voltage) {
                    const aiReport = SentinelAIService.analyzeVoltageStability(fullUpdate.ext.voltage);
                    if (aiReport.type !== 'STABLE') {
                        document.dispatchEvent(new CustomEvent('obd_ai_anomaly', { detail: aiReport }));
                    }
                }

                // 5. Web3 Mining Milestone Check
                // Simulating cumulative mileage increment for demo
                this.cumulativeMileage += 0.5; // Gain 500m per packet
                if (this.cumulativeMileage >= 1000) {
                    document.dispatchEvent(new CustomEvent('obd_mining_milestone', { detail: { mileage: 1000, reward: 50 } }));
                    this.cumulativeMileage = 0; // Reset for next loop
                }

                // 6. Batch/Sync to Supabase Hub
                await this.syncWithSupabase(fullUpdate);

                // 7. Update UI
                onProcessed(fullUpdate);
            }
        });
    }

    private static cumulativeMileage = 0;
    /**
     * Simulation of Manufacturer API Authentication & Consent
     * In production, this would trigger an OAuth2 flow or a proprietary Telematics API call.
     */
    static async requestOwnerConsent(vin: string): Promise<boolean> {
        console.log(`[OBD-III] Requesting data access consent for VIN: ${vin} from original owner...`);
        // Simulate a push notification to the owner's mobile app and their approval
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 1500);
        });
    }

    /**
     * Unified Bridge for Multi-Brand Fleet APIs (Tesla, Hyundai, etc.)
     * Routes calls through the Ozcar API Gateway
     */
    static async fetchManufacturerData(brand: string, vin: string, accessToken?: string): Promise<ManufacturerData> {
        console.log(`[OBD-III] Requesting ${brand} data via Ozcar Gateway...`);

        // If no token provided, fallback to simulation for demo purposes
        if (!accessToken) {
            console.warn(`[OBD-III] No access token provided for ${brand}. Falling back to simulation.`);
            await new Promise(r => setTimeout(r, 1000));
            // Reuse previous simulation logic or return mock
            const mockExt = this.parseHkmcEvData("6101...mock...");
            return {
                brand: `${brand} (Simulated)`,
                vin,
                lastServiceDate: new Date().toISOString().split('T')[0],
                mileage: 30000,
                healthStatus: 'HEALTHY',
                records: [{ date: '2024-02-01', description: 'Simulated Checkup', odometer: 29000 }],
                ext: mockExt as ManufacturerData['ext']
            } as ManufacturerData;
        }

        try {
            const response = await fetch(`/api/obd/manufacturer/${brand.toLowerCase()}?vin=${vin}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) throw new Error(`Gateway returned ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`[OBD-III] Gateway call failed for ${brand}:`, error);
            throw error;
        }
    }

    /**
     * Trigger Sync to Ozcar Supabase DB via backend Route
     */
    static async syncWithSupabase(data: ManufacturerData): Promise<boolean> {
        console.log(`[OBD-III] Syncing ${data.brand} data to Ozcar DB...`);
        try {
            const response = await fetch('/api/obd3/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return response.ok;
        } catch (error) {
            console.error("[OBD-III] Sync Failed:", error);
            return false;
        }
    }
}

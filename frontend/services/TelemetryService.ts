import { supabase } from '../lib/supabase';
import { OfflineSyncService } from './OfflineSyncService';

export interface TelemetryBatch {
    car_id: string;
    session_id: string;
    payload: Array<{
        ts: number;
        p: Record<string, any>;
    }>;
    flags: {
        is_emergency: boolean;
        has_dtc: boolean;
    };
}

export class TelemetryService {
    private static BATCH_THRESHOLD = 50;
    private static HEARTBEAT_INTERVAL = 5000; // 5 seconds

    private static buffer: Array<any> = [];
    private static lastSentCache: Record<string, { value: number; timestamp: number }> = {};
    private static lastBatchSentTime = Date.now();

    /**
     * Process OBD Data with Delta Extraction (Smoothing)
     */
    static async processOBDData(carId: string, sessionId: string, pidName: string, rawValue: number) {
        const now = Date.now();
        const lastEntry = this.lastSentCache[pidName];

        // Configuration for Smoothing (Can be dynamic)
        const deadband = 50; // Minimum change to trigger entry (e.g., RPM)
        const isFirstData = !lastEntry;
        const diff = isFirstData ? 0 : Math.abs(rawValue - lastEntry.value);
        const timePassed = isFirstData ? 0 : (now - lastEntry.timestamp);

        // Core Strategy: Only store if value changes significantly OR heartbeat interval is reached
        if (isFirstData || diff >= deadband || timePassed >= this.HEARTBEAT_INTERVAL) {
            const entry = {
                ts: now,
                p: { [pidName.toLowerCase()]: rawValue }
            };

            this.buffer.push(entry);
            this.lastSentCache[pidName] = { value: rawValue, timestamp: now };
        }

        // Batch Flushing
        if (this.buffer.length >= this.BATCH_THRESHOLD || (now - this.lastBatchSentTime > 2000)) {
            await this.flushBuffer(carId, sessionId);
        }
    }

    /**
     * Send Batched Data to Supabase Edge Function
     */
    private static async flushBuffer(carId: string, sessionId: string) {
        if (this.buffer.length === 0) return;

        const payload = [...this.buffer];
        this.buffer = [];
        this.lastBatchSentTime = Date.now();

        try {
            // Triggering the ingestion handler
            const { data, error } = await supabase.functions.invoke('telemetry-ingestion-handler', {
                body: {
                    car_id: carId,
                    session_id: sessionId,
                    payload,
                    flags: {
                        is_emergency: false,
                        has_dtc: false
                    }
                }
            });

            if (error) throw error;
            console.log('ozcar: Telemetry batch sent successfully', data);

            // Periodically check if there's offline data to sync
            if (Math.random() > 0.8) {
                await OfflineSyncService.syncNow(async (batch) => {
                    const { error } = await supabase.functions.invoke('telemetry-ingestion-handler', { body: batch });
                    return !error;
                });
            }
        } catch (err) {
            console.error('ozcar: Telemetry transmission failed, saving offline', err);
            // Save each item to offline queue
            payload.forEach(item => {
                OfflineSyncService.saveToOfflineQueue({ ...item, car_id: carId });
            });
        }
    }
}

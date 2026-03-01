/**
 * Offline Sync Service for ozcar Telemetry
 * Caches data in localStorage when network is down.
 */
export class OfflineSyncService {
    private static STORAGE_KEY = 'ozcar_offline_telemetry';

    /**
     * Store telemetry entry for later sync
     */
    static saveToOfflineQueue(entry: any) {
        const queue = this.getQueue();
        queue.push(entry);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(queue));
        console.warn(`ozcar: [Offline] Data cached. Queue size: ${queue.length}`);
    }

    /**
     * Retrieve all cached items
     */
    static getQueue(): any[] {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    }

    /**
     * Clear cached data after successful sync
     */
    static clearQueue() {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    /**
     * Attempt to sync offline data to Supabase
     * (Normally triggered by Window focus or navigator.onLine)
     */
    static async syncNow(invokeIngestion: (batch: any) => Promise<boolean>) {
        const queue = this.getQueue();
        if (queue.length === 0) return;

        console.log(`ozcar: [Sync] Attempting to sync ${queue.length} offline records...`);

        // Batching offline data for sync
        const success = await invokeIngestion({
            car_id: queue[0]?.car_id, // Simplified assumption
            payload: queue.map(q => ({ ts: q.ts, p: q.p })),
            flags: { is_offline_sync: true }
        });

        if (success) {
            this.clearQueue();
            console.log("ozcar: [Sync] Offline data successfully synced and cleared.");
        }
    }
}

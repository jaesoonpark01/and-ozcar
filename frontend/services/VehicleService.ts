import { createClient } from '@supabase/supabase-js';
import { ethers } from 'ethers';
import OzcarVehicleHistoryABI from '../contracts/OzcarVehicleHistoryABI.json';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const OZCAR_VEHICLE_HISTORY_ADDRESS = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL || "http://127.0.0.1:8545";

export interface MaintenanceRecord {
    timestamp: number;
    mileage: number;
    description: string;
    ipfsHash: string;
    technician: string;
}

export class VehicleService {
    /**
     * Get full vehicle history (Cache-first)
     */
    static async getVehicleHistory(vin: string): Promise<MaintenanceRecord[]> {
        // 1. Check Cache
        const { data: cached, error } = await supabase
            .from('vehicle_history_cache')
            .select('history_json, last_synced')
            .eq('vin', vin)
            .single();

        // If cache exists and is fresh (e.g., < 1 hour), return it
        if (cached && !error) {
            const lastSynced = new Date(cached.last_synced).getTime();
            const now = Date.now();
            if (now - lastSynced < 1000 * 60 * 60) {
                console.log(`[VehicleService] Returning cached history for ${vin}`);
                return cached.history_json as MaintenanceRecord[];
            }
        }

        // 2. Fetch from Blockchain if cache missing or stale
        console.log(`[VehicleService] Fetching history from blockchain for ${vin}`);
        const history = await this.fetchHistoryFromChain(vin);

        // 3. Update Cache (Fire and forget)
        this.updateCache(vin, history).catch(err => console.error("Cache update failed:", err));

        return history;
    }

    private static async fetchHistoryFromChain(vin: string): Promise<MaintenanceRecord[]> {
        const provider = new ethers.JsonRpcProvider(POLYGON_RPC_URL);
        const contract = new ethers.Contract(
            OZCAR_VEHICLE_HISTORY_ADDRESS,
            OzcarVehicleHistoryABI,
            provider
        );

        const rawHistory = await contract.getVehicleHistory(vin);

        // Map ethers response to our interface
        return rawHistory.map((record: any) => ({
            timestamp: Number(record.timestamp),
            mileage: Number(record.mileage),
            description: record.description,
            ipfsHash: record.ipfsHash,
            technician: record.technician
        }));
    }

    private static async updateCache(vin: string, history: MaintenanceRecord[]) {
        const { error } = await supabase
            .from('vehicle_history_cache')
            .upsert({
                vin,
                history_json: history,
                last_synced: new Date().toISOString()
            }, { onConflict: 'vin' });

        if (error) throw error;
    }
}

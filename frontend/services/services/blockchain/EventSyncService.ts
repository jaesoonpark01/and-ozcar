import { ethers } from 'ethers';
import { createClient } from '@supabase/supabase-js';
// @ts-ignore
import OzcarVehicleHistoryABI from '../contracts/OzcarVehicleHistoryABI.json';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export class EventSyncService {
    private provider: ethers.JsonRpcProvider;
    private contract: ethers.Contract;

    constructor(rpcUrl: string, contractAddress: string) {
        this.provider = new ethers.JsonRpcProvider(rpcUrl);
        this.contract = new ethers.Contract(contractAddress, OzcarVehicleHistoryABI.abi, this.provider);
    }

    /**
     * Start listening for blockchain events and sync to Supabase.
     */
    startSync() {
        console.log("[Sync] Starting Ozcar Event Sync Service...");

        // 1. Sync Maintenance Records
        this.contract.on("RecordAdded", async (vin: string, recordId: bigint, technician: string, timestamp: bigint, log: any) => {
            console.log(`[Sync] New record detected for VIN: ${vin}, ID: ${recordId}`);

            try {
                // Fetch full record from contract
                // Assuming getRecord exists based on Phase 13 logic
                const record = await this.contract.records(vin, recordId);

                // Upsert into Supabase Cache
                const { error } = await supabase
                    .from('vehicle_history_cache')
                    .upsert({
                        vin: vin,
                        record_id: Number(recordId),
                        technician: technician,
                        mileage: Number(record.mileage),
                        service_type: record.serviceType,
                        description: record.description,
                        timestamp: new Date(Number(timestamp) * 1000).toISOString(),
                        tx_hash: log.transactionHash
                    });

                if (error) throw error;
                console.log(`[Sync] Successfully cached record ${recordId} for ${vin}`);
            } catch (err) {
                console.error("[Sync] Error syncing record:", err);
            }
        });
    }

    /**
     * Manual sync for a specific VIN (Utility)
     */
    async syncVehicle(vin: string) {
        const countBigInt = await this.contract.getRecordCount(vin);
        const count = Number(countBigInt);
        console.log(`[Sync] Manual sync for ${vin}: ${count} records found.`);

        for (let i = 0; i < count; i++) {
            const record = await this.contract.records(vin, i);
            await supabase
                .from('vehicle_history_cache')
                .upsert({
                    vin: vin,
                    record_id: i,
                    technician: record.technician,
                    mileage: Number(record.mileage),
                    service_type: record.serviceType,
                    description: record.description,
                    timestamp: new Date(Number(record.timestamp) * 1000).toISOString(),
                });
        }
    }
}

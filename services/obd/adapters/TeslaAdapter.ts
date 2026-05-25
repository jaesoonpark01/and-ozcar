import { ManufacturerData } from "../OBD3Service";
import { BaseManufacturerAdapter } from "./BaseAdapter";

export class TeslaAdapter extends BaseManufacturerAdapter {
    brandName = "Tesla";

    async fetchData(vin: string, accessToken: string): Promise<ManufacturerData> {
        // In real implementation, this would call:
        // https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/{vin}/vehicle_data
        console.log(`[TeslaAdapter] Connecting to Tesla Fleet API for VIN: ${vin}`);

        return {
            brand: this.brandName,
            vin: vin,
            lastServiceDate: new Date().toISOString().split('T')[0],
            mileage: 35600,
            healthStatus: 'HEALTHY',
            records: [
                { date: '2023-11-20', description: 'Tire Rotation', odometer: 30000 },
                { date: '2023-05-12', description: 'AC Filter Replacement', odometer: 15000 }
            ],
            ext: {
                soc: 72,
                soh: 97.8,
                current: -15.2, // Discharging (driving simulation)
                voltage: 385,
                tempMax: 35,
                isCharging: false,
                lastSync: new Date().toISOString()
            }
        };
    }

    getAuthUrl(): string {
        const clientId = process.env.TESLA_CLIENT_ID;
        const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/manufacturer/callback`);
        return `https://auth.tesla.com/oauth2/v3/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20vehicle_device_data`;
    }
}

import { ManufacturerData } from "../OBD3Service";

export abstract class BaseManufacturerAdapter {
    abstract brandName: string;

    /**
     * Fetch raw data from manufacturer API and map it to Ozcar's ManufacturerData format
     */
    abstract fetchData(vin: string, accessToken: string): Promise<ManufacturerData>;

    /**
     * Map manufacturer-specific status codes to Ozcar's health status
     */
    protected mapHealthStatus(status: any): ManufacturerData['healthStatus'] {
        // Default implementation, can be overridden by subclasses
        return 'HEALTHY';
    }

    /**
     * Generate OAuth2 Authorization URL for this manufacturer
     */
    abstract getAuthUrl(): string;
}

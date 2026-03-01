import { ManufacturerData } from "./OBD3Service";

export interface DTCInfo {
    code: string;
    description: string;
    severity: 'CRITICAL' | 'WARNING' | 'INFO';
    system: string;
    action: string;
}

export class DTCService {
    // Comprehensive Master DTC Database (Subset for Demo)
    private static DTC_MASTER: Record<string, DTCInfo> = {
        'P0300': {
            code: 'P0300',
            description: 'maint_dtc_P0300_desc',
            severity: 'CRITICAL',
            system: 'Powertrain',
            action: 'maint_dtc_P0300_action'
        },
        'P1B70': {
            code: 'P1B70',
            description: 'maint_dtc_P1B70_desc',
            severity: 'CRITICAL',
            system: 'BMS',
            action: 'maint_dtc_P1B70_action'
        },
        'P1B77': {
            code: 'P1B77',
            description: 'maint_dtc_P1B77_desc',
            severity: 'CRITICAL',
            system: 'BMS',
            action: 'maint_dtc_P1B77_action'
        },
        'P0562': {
            code: 'P0562',
            description: 'maint_dtc_P0562_desc',
            severity: 'WARNING',
            system: 'Electrical',
            action: 'maint_dtc_P0562_action'
        },
        'P0420': {
            code: 'P0420',
            description: 'maint_dtc_P0420_desc',
            severity: 'WARNING',
            system: 'Emission',
            action: 'maint_dtc_P0420_action'
        }
    };

    /**
     * Look up DTC details and provide AI-driven insights
     */
    static async analyzeDTC(code: string): Promise<DTCInfo> {
        console.log(`[DTC-AI] Analyzing code: ${code}`);

        // Check master DB
        const info = this.DTC_MASTER[code.toUpperCase()];

        if (info) return info;

        // Fallback for unknown codes (AI Synthesis simulation)
        return {
            code,
            description: 'maint_dtc_unknown_desc',
            severity: 'WARNING',
            system: 'Unknown',
            action: 'maint_dtc_unknown_action'
        };
    }

    /**
     * Scan incoming manufacturer data for new DTCs
     */
    static checkDataForDTCs(data: ManufacturerData): string[] {
        // In real world, DTCs are often extracted from Mode 03 or 21 02 responses
        // Here we simulate detection via healthStatus or record keywords
        const found: string[] = [];

        if (data.healthStatus === 'CRITICAL' || data.healthStatus === 'WARNING') {
            // Check records for DTC patterns
            data.records.forEach(r => {
                const match = r.description.match(/[P|C|B|U][0-9]{4}/i);
                if (match) found.push(match[0].toUpperCase());
            });
        }

        return [...new Set(found)]; // Unique codes only
    }
}

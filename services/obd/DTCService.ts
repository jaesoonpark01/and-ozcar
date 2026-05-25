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
            description: '임의의 실린더 실화 감지 (Random Misfire)',
            severity: 'CRITICAL',
            system: 'Powertrain',
            action: '즉시 정차 후 엔진 점검이 필요합니다.'
        },
        'P1B70': {
            code: 'P1B70',
            description: '고전압 배터리 저전압 감지 (EV 전용)',
            severity: 'CRITICAL',
            system: 'BMS',
            action: '즉시 안전한 곳에 주차하고 긴급 출동을 요청하세요.'
        },
        'P1B77': {
            code: 'P1B77',
            description: '고전압 릴레이 고착 (Inverter/BMS)',
            severity: 'CRITICAL',
            system: 'BMS',
            action: '시동이 꺼지지 않을 수 있으니 서비스 센터로 이동하십시오.'
        },
        'P0562': {
            code: 'P0562',
            description: '시스템 전압 낮음 (12V Auxiliary)',
            severity: 'WARNING',
            system: 'Electrical',
            action: '보조 배터리 충전 상태 확인 및 교체를 권장합니다.'
        },
        'P0420': {
            code: 'P0420',
            description: '촉매 효율 저하 (Bank 1)',
            severity: 'WARNING',
            system: 'Emission',
            action: '배기가스 정밀 검사가 필요합니다.'
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
            description: '미분류 제조사 전용 코드',
            severity: 'WARNING',
            system: 'Unknown',
            action: '정확한 분석을 위해 정비사 검증이 필요합니다.'
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

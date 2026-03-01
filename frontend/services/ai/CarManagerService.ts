export interface CarAlert {
    id: string;
    type: 'MAINTENANCE' | 'INSPECTION' | 'INSURANCE' | 'TOKEN';
    title: string;
    description: string;
    actionLabel: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    date?: string;
}

export class CarManagerService {
    /**
     * AI Analysis of vehicle history to predict upcoming needs
     */
    static async getPersonalizedAlerts(vin: string, mileage: number): Promise<CarAlert[]> {
        // Simulation of AI analysis
        const alerts: CarAlert[] = [];

        // 1. Maintenance Check
        if (mileage > 5000) {
            alerts.push({
                id: 'm-1',
                type: 'MAINTENANCE',
                title: '브레이크 패드 마모도 주의!',
                description: '최근 주행 데이터를 분석한 결과, 500km 이내 정비를 권장합니다.',
                actionLabel: '10% 할인 예약',
                severity: 'HIGH'
            });
        }

        // 2. Inspection Check (Every 2 years)
        alerts.push({
            id: 'i-1',
            type: 'INSPECTION',
            title: '정기 검사 예정',
            description: '다음 달에 정기 검사가 있습니다. ozcar 제휴 정비소 이용 시 검사 대행료 50% 할인!',
            actionLabel: '대행 예약',
            severity: 'MEDIUM',
            date: '2024-07-15'
        });

        // 3. OZC Rewards
        alerts.push({
            id: 't-1',
            type: 'TOKEN',
            title: '데이터 전송 보상',
            description: 'OBD-III 실시간 데이터 전송 시 5 OZC 토큰이 즉시 지급됩니다.',
            actionLabel: '데이터 전송',
            severity: 'LOW'
        });

        return alerts;
    }
}

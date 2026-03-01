export interface ValuationMetric {
    estimatedValue: number;
    valueChange: number;
    lastRecordImpact: number;
    currency: string;
}

export class AssetValueService {
    private static BASE_VALUES: Record<string, number> = {
        'TESLA MODEL 3': 45000000,
        'HYUNDAI IONIQ 5': 42000000,
        'KIA EV6': 43000000,
        'GENESIS GV70': 55000000,
    };

    /**
     * Calculate virtual market value based on maintenance data
     */
    static calculateCurrentValue(carModel: string, mileage: number, recordsCount: number): ValuationMetric {
        const base = this.BASE_VALUES[carModel.toUpperCase()] || 30000000;

        // Depreciation based on mileage (simple linear model)
        const mileageDepreciation = mileage * 100; // 100 KRW per km

        // Value "Boost" from verified maintenance records (ozcar special)
        const maintenancePremium = recordsCount * 50000; // 50,000 KRW per verified record

        const estimatedValue = Math.max(base - mileageDepreciation + maintenancePremium, 5000000);

        return {
            estimatedValue,
            valueChange: 120000, // Mocked 24h change
            lastRecordImpact: 50000,
            currency: 'KRW'
        };
    }

    static formatCurrency(value: number): string {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
    }
}

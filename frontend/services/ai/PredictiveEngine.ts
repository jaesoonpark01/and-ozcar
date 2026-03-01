// services/ai/PredictiveEngine.ts

export interface VehicleHealthData {
    oil_viscosity_index: number;
    avg_rpm: number;
    total_mileage: number;
    last_service_mileage: number;
    driving_style_score: number; // 1(Gentle) ~ 5(Aggressive)
}

export interface PredictionResult {
    remainingLifeKm: number;
    urgency: 'GOOD' | 'CAUTION' | 'URGENT';
    predictedDate: Date;
}

/**
 * Ozcar AI Predictive Scheduling (APS) Algorithm
 * Calculates Remaining Useful Life (RUL) based on sensor data and driving patterns.
 */
export const calculateNextService = (data: VehicleHealthData): PredictionResult => {
    // 1. Base lifespan for engine oil (e.g., 10,000 km)
    const BASE_LIFESPAN = 10000;
    const mileageSinceLastService = data.total_mileage - data.last_service_mileage;

    // 2. Weight calculation based on driving style and RPM
    // Aggressive driving shortens component life
    const wearRate = (data.driving_style_score * 0.2) + (data.avg_rpm > 3000 ? 1.5 : 1.0);

    // 3. Predicted Remaining Useful Life (RUL)
    // RUL = (Lifespan - CurrentUsage) / WearRate
    const remainingLifeKm = Math.max(0, (BASE_LIFESPAN - mileageSinceLastService) / wearRate);

    // 4. Urgency Classification
    let urgency: 'GOOD' | 'CAUTION' | 'URGENT' = 'GOOD';
    if (remainingLifeKm < 500) urgency = 'URGENT';
    else if (remainingLifeKm < 2000) urgency = 'CAUTION';

    return {
        remainingLifeKm: Math.floor(remainingLifeKm),
        urgency,
        predictedDate: calculateEstimatedDate(remainingLifeKm)
    };
};

function calculateEstimatedDate(km: number): Date {
    const avgDailyKm = 45; // Default average daily mileage
    const daysLeft = km / avgDailyKm;
    const today = new Date();
    today.setDate(today.getDate() + daysLeft);
    return today;
}

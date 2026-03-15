import { useState, useCallback, useRef } from 'react';
import { ICEAnalyzer, OBDData } from '../lib/obd/analyzers/ICEAnalyzer';
import { EVAnalyzer, EVSensorData } from '../lib/obd/analyzers/EVAnalyzer';
import { createClient } from '@supabase/supabase-js';

// 실제 구현 시에는 별도의 lib/supabase.ts 등에서 인스턴스를 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export function useTripMonitor(vehicleId: string) {
  const [alerts, setAlerts] = useState<string[]>([]);
  const lastSpeedRef = useRef<number>(0);
  const iceAnalyzer = useRef(new ICEAnalyzer());
  const evAnalyzer = useRef(new EVAnalyzer());

  const logAlert = async (type: string, msg: string, code?: string) => {
    setAlerts((prev) => [...prev, msg]);
    
    await supabase.from('diagnostic_alerts').insert([
      { 
        vehicle_id: vehicleId, 
        alert_type: type, 
        message: msg,
        alert_code: code || null
      }
    ]);
  };

  const processICEData = useCallback((data: OBDData) => {
    const currentSpeed = data.speed || 0;
    
    // 1. 공통 알고리즘: 급제동 감지 (1초 단위 폴링 시 15km/h 이상 감속)
    if (lastSpeedRef.current - currentSpeed > 15) {
      logAlert('HARD_BRAKE', '급제동이 감지되었습니다. 안전거리를 유지해주세요.');
    }
    lastSpeedRef.current = currentSpeed;

    // 2. 내연기관 전용 경고: 냉각수 온도 초과
    if (data.coolantTemp && data.coolantTemp > 110) {
      logAlert('TEMP_WARNING', '엔진 냉각수 온도가 비정상적으로 높습니다. 차량을 안전한 곳에 세워주세요!', 'P0115');
    }

    // 3. 가치 환산: 연비/에코 스코어 계산
    const efficiency = iceAnalyzer.current.calculateFuelConsumption(data);
    const scoreDiff = iceAnalyzer.current.calculateEcoScoreDifferential(data);

    return { efficiency, scoreDiff };
  }, [vehicleId]);

  const processEVData = useCallback((data: EVSensorData) => {
    const currentSpeed = data.speed || 0;
    
    // 1. 공통 알고리즘: 급제동 감지
    if (lastSpeedRef.current - currentSpeed > 15) {
      logAlert('HARD_BRAKE', '급제동이 감지되었습니다. 회생 제동을 부드럽게 활용해 보세요.');
    }
    lastSpeedRef.current = currentSpeed;

    // 2. 전기차 전용 경고: 배터리 온도 초과
    if (data.batteryTemp && data.batteryTemp > 60) {
      logAlert('TEMP_WARNING', '배터리 온도가 매우 높습니다. 과열에 주의하세요!', 'BMS_HEAT');
    }

    // 3. 가치 환산: 전력량 확인 및 회생제동 상태
    const powerKw = evAnalyzer.current.calculatePower(data);
    const isRegen = evAnalyzer.current.isRegenActive(data);

    return { powerKw, isRegen };
  }, [vehicleId]);

  /**
   * 주행 종료 시 트립(Trip) 데이터를 요약하여 DB에 저장합니다.
   * @param summaryData 평균 전비, 총 주행거리, 점수 등의 집계 데이터
   */
  const endTrip = async (summaryData: any) => {
    await supabase.from('trip_logs').insert([
      { 
        vehicle_id: vehicleId, 
        start_time: summaryData.startTime,
        end_time: new Date().toISOString(),
        distance_km: summaryData.distanceKm,
        avg_efficiency: summaryData.avgEfficiency,
        eco_score: summaryData.ecoScore,
        saved_money_krw: summaryData.savedMoney,
        hard_accel_count: summaryData.hardAccelCount,
        hard_brake_count: summaryData.hardBrakeCount
      }
    ]);
  };

  return { processICEData, processEVData, endTrip, alerts };
}

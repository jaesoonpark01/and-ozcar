export interface OBDData {
  rpm?: number;
  speed?: number; // km/h
  maf?: number; // g/s
  map?: number; // kPa
  iat?: number; // Intake Air Temp °C
  load?: number; // Engine Load %
  coolantTemp?: number; // °C
}

export class ICEAnalyzer {
  private lastRpm: number = 0;
  private idlingStartTime: number | null = null;

  public calculateFuelConsumption(data: OBDData): number | null {
    if (data.speed === undefined || data.speed === 0) return 0; // Idling
    if (data.maf !== undefined) {
      // MAF in g/s
      // Air to Fuel ratio (gasoline) = 14.7
      // Gasoline density ~ 750g/L
      const fuelKs = data.maf / 14.7; 
      const fuelLitersPerSecond = fuelKs / 750;
      
      if (fuelLitersPerSecond <= 0) return 99.9; // max efficiency (e.g., fuel cut-off)
      
      const kmPerSecond = data.speed / 3600;
      return kmPerSecond / fuelLitersPerSecond; // km/L
    }
    return null;
  }

  public calculateEcoScoreDifferential(data: OBDData): number {
    let diff = 0;
    const currentRpm = data.rpm || 0;
    
    // 급가속 감시: 단위 시간당 RPM 급증 (초당 1500 이상이라 가정)
    if (currentRpm - this.lastRpm > 1500) {
      diff -= 5;
    }
    this.lastRpm = currentRpm;

    // 공회전 판단: 속도가 0이고 RPM이 아이들 상태(예: 500~1100)
    if (data.speed === 0 && currentRpm > 500 && currentRpm < 1100) {
      const now = Date.now();
      if (!this.idlingStartTime) {
        this.idlingStartTime = now;
      } else if (now - this.idlingStartTime > 180000) { // 3분 이상 지속시 감점
        diff -= 1;
      }
    } else {
      this.idlingStartTime = null; // 초기화
    }

    // 경제 운전 장려: 70~90km/h 항속, 낮은 부하
    if (
      data.speed && 
      data.speed >= 70 && 
      data.speed <= 90 && 
      data.load !== undefined && 
      data.load < 40
    ) {
      diff += 0.5; // 소폭 가산
    }

    return diff;
  }
}

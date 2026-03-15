export interface EVSensorData {
  voltage?: number; // V
  current?: number; // A. 양수(방전), 음수(충전/회생제동)
  speed?: number; // km/h
  soc?: number; // %
  batteryTemp?: number; // °C
}

export class EVAnalyzer {
  private readonly ELECTRICITY_PRICE_PER_KWH = 250;     // 예시 전기요금 (원/kWh)
  private readonly GASOLINE_PRICE_PER_LITER = 1600;     // 비교용 가솔린 요금 (원/L)
  private readonly ICE_COMPARISON_KMPL = 10;            // 내연기관 평균 연비 (km/L)

  /**
   * 실시간 파워(kW)를 산출합니다.
   * 음수일 경우 회생 제동으로 배터리가 충전 중임을 의미합니다.
   */
  public calculatePower(data: EVSensorData): number {
    if (data.voltage === undefined || data.current === undefined) return 0;
    return (data.voltage * data.current) / 1000; // kW
  }

  /**
   * 회생 제동 상태 여부를 반환합니다.
   */
  public isRegenActive(data: EVSensorData): boolean {
    return data.current !== undefined && data.current < 0;
  }

  /**
   * 동급 가솔린 차량과 비교한 절감액(원)을 환산합니다.
   * @param totalDistanceKm 이번 주행 총 거리
   * @param totalConsumedKwh 이번 주행 사용 전력량
   */
  public calculateSavings(totalDistanceKm: number, totalConsumedKwh: number): number {
    const electricityCost = totalConsumedKwh * this.ELECTRICITY_PRICE_PER_KWH;
    const gasCost = (totalDistanceKm / this.ICE_COMPARISON_KMPL) * this.GASOLINE_PRICE_PER_LITER;
    
    return Math.max(0, Math.floor(gasCost - electricityCost));
  }
}

/**
 * Ozcar OBD2 Pricing & Value-Flow Simulator (Client-side)
 * 
 * 차량 주행 중의 텔레메트리 데이터를 기반으로 라이브 "채굴(Mining) 효과"를 제공합니다.
 * 백엔드 데이터에 최종 기록되기 전 시각적 피드백을 주기 위해 디자인되었습니다.
 */

export interface PricingFactors {
    isHardwareVerified: boolean;
    dataPacketCount: number;
}

export function simulateRealtimeValue(factors: PricingFactors): number {
    // 클라이언트 단 모의계산:
    // 패킷 한 개당 15원 기본가. ハードウェア인증시 1.5배, 미인증시 0.8배
    const basePrice = 15;
    const qualityMultiplier = factors.isHardwareVerified ? 1.5 : 0.8;
    const marketDemandMultiplier = 1.2; // 임의 호황치 적용 (이벤트)

    return factors.dataPacketCount * basePrice * qualityMultiplier * marketDemandMultiplier;
}

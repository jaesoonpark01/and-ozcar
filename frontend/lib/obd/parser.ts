/**
 * Ozcar OBD2 Core Parser for HKMC EV Series
 */

export interface CarTelemetry {
    socDisplay: number;      // 계기판 표시 배터리 잔량 (%)
    socBMS: number;          // 실제 배터리 잔량 (%)
    soh: number;             // 배터리 건강 상태 (%)
    current: number;         // 배터리 전류 (A)
    voltage: number;         // 배터리 전압 (V)
    tempMax: number;         // 배터리 최고 온도 (°C)
    isCharging: boolean;     // 충전 여부
    hvacConsumptionKw?: number; // 공조 소비전력 (kW)
    dtcCodes?: string[];     // 고장 코드 배열
    speed: number;           // 차량 속도 (km/h)
}

export function parseHkmcEvData(rawHex: string): CarTelemetry {
    // 1. 공백 제거 및 줄바꿈 정리, '7E4'와 같은 CAN ID 제거
    const hexArray = rawHex
        .replace(/7E4|10|2[1-9]/g, '') // 헤더 및 행 번호 제거 (간이 처리)
        .trim()
        .split(/\s+/);

    // 2. 바이트 배열로 변환
    const bytes = hexArray.map(h => parseInt(h, 16));

    /**
     * 현대/기아 EV 21 01 서비스 데이터 매핑 (기종별 미세 차이 있음)
     */

    // SOC 파싱 (Index 33, 34)
    const socBMS = bytes[33] ? bytes[33] / 2.0 : 0;
    const socDisplay = bytes[34] ? bytes[34] / 2.0 : 0;

    // SOH 파싱 (Index 28-29 또는 48-49 등 기종 확인 필요, 여기선 48-49 기준)
    const soh = bytes[48] && bytes[49] ? (bytes[48] * 256 + bytes[49]) / 10.0 : 0;

    // 전류(Current) 파싱: 부호 있는 16비트 정수 (2's complement)
    const rawCurrent = bytes[13] && bytes[14] ? (bytes[13] * 256 + bytes[14]) : 0;
    const current = rawCurrent > 0 ? (rawCurrent - 65535) / 10.0 : 0;

    // 온도 파싱 (Index 40)
    const tempMax = bytes[40] ? bytes[40] - 40 : 0;

    // 충전 여부 (특정 비트 플래그)
    const isCharging = (bytes[54] && (bytes[54] & 0x10) > 0) ? true : false;

    // 모의 HVAC 소비전력 산출 (배터리 전류 활용한 Mock 로직)
    const hvacConsumptionKw = current > 10 ? 1.5 : (current > 0 ? 0.8 : 0);

    // 속도 모의 데이터 (테스트용: 전류에 비례하게 대략 산출)
    const speed = Math.min(150, Math.max(0, current * 1.5));

    return {
        socDisplay,
        socBMS,
        soh,
        current,
        voltage: bytes[15] ? (bytes[15] * 2) : 0,
        tempMax,
        isCharging,
        hvacConsumptionKw,
        speed,
        dtcCodes: [] // 실시간 센서에는 기본 없음. 별도 7E4 03 요청으로 획득.
    };
}

/**
 * 현대/기아 전용 UDS 기반 고장 코드 파서 (MOCK)
 * 7E4 03 명령에 대한 응답을 파싱합니다.
 */
export function parseDtcData(rawHex: string): string[] {
    const codes: string[] = [];
    if (rawHex.includes('43')) {
        // 응답 예시: 43 01 P1 B7 70 -> 내부적으로 파싱 구현
        // 여기서는 임시 Mock 데이터를 리턴합니다.
        codes.push('P1B77');
    }
    return codes;
}

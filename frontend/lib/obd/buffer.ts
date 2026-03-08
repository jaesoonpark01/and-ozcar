/**
 * Ozcar OBD2 Smoothing and Adaptive Batching Buffer
 */

const CONFIG = {
    SOC: { deadband: 0.5, heartbeat_ms: 10000 },      // 0.5% 이상 변할 때 기록
    TEMP: { deadband: 1, heartbeat_ms: 30000 },       // 1도 이상 변할 때 기록
    CURRENT: { deadband: 1.0, heartbeat_ms: 5000 },   // 1A 이상 변할 때 기록
    DEFAULT_HEARTBEAT: 10000                          // 기본 10초
};

type CacheEntry = { value: number; timestamp: number };

export class ObdBuffer {
    private cache: Record<string, CacheEntry> = {};
    private dataBuffer: any[] = [];
    private lastBatchSentTime: number = Date.now();
    private batchThreshold: number = 20; // 20개 쌍이면 플러시
    private timeThreshold: number = 2000; // 최대 2초 시간 지연 허용

    processData(pid_name: string, raw_value: number) {
        const now = Date.now();
        const last_entry = this.cache[pid_name];
        const config = CONFIG[pid_name as keyof typeof CONFIG] || { deadband: 0.1, heartbeat_ms: CONFIG.DEFAULT_HEARTBEAT };

        const is_first_data = !last_entry;
        const diff = is_first_data ? 0 : Math.abs(raw_value - last_entry.value);
        const time_passed = is_first_data ? 0 : (now - last_entry.timestamp);

        // 전송 조건 확인 (임계값 돌파 OR 하트비트 시간 초과)
        if (is_first_data || diff >= config.deadband || time_passed >= config.heartbeat_ms) {

            const smoothed_entry = {
                pid: pid_name,
                val: raw_value,
                ts: now
            };

            this.dataBuffer.push(smoothed_entry);
            this.cache[pid_name] = { value: raw_value, timestamp: now };
        }

        if (this.dataBuffer.length >= this.batchThreshold || (now - this.lastBatchSentTime > this.timeThreshold)) {
            return this.flush();
        }

        return null;
    }

    flush() {
        if (this.dataBuffer.length === 0) return null;

        const payload = [...this.dataBuffer];
        this.dataBuffer = [];
        this.lastBatchSentTime = Date.now();

        return payload;
    }
}

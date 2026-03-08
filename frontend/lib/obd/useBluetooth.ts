import { useState, useRef } from 'react';
import { parseHkmcEvData, CarTelemetry } from './parser';
import { ObdBuffer } from './buffer';

export function useBluetoothOBD() {
    const [isConnected, setIsConnected] = useState(false);
    const [log, setLog] = useState<string[]>([]);
    const [carData, setCarData] = useState<CarTelemetry | null>(null);
    const [bufferPayloads, setBufferPayloads] = useState<any[]>([]);

    const portRef = useRef<any>(null);
    const readerRef = useRef<any>(null);
    const writerRef = useRef<any>(null);

    const obdBufferRef = useRef(new ObdBuffer());

    const addLog = (msg: string) => {
        setLog(prev => [msg, ...prev].slice(0, 50)); // 최신 50개 유지
    };

    const connectDevice = async () => {
        try {
            if (!('serial' in navigator)) {
                addLog("이 브라우저에서는 Web Serial API를 지원하지 않습니다 (Chrome/Edge 권장).");
                return;
            }

            // @ts-ignore
            const port = await navigator.serial.requestPort();
            await port.open({ baudRate: 38400 }); // ELM327 기본 속도

            portRef.current = port;
            writerRef.current = port.writable.getWriter();
            readerRef.current = port.readable.getReader();

            setIsConnected(true);
            addLog("블루투스 장치 연동 성공");

            // ELM327 / STN 초기화
            await sendCommand("AT Z\r");
            await sendCommand("AT SP 6\r");

            addLog("초기화 완료. 데이터 수집 대기 중...");
        } catch (err: any) {
            console.error(err);
            addLog("연결 실패: " + err?.message);
        }
    };

    const disconnectDevice = async () => {
        try {
            if (readerRef.current) {
                await readerRef.current.cancel();
                readerRef.current.releaseLock();
            }
            if (writerRef.current) {
                writerRef.current.releaseLock();
            }
            if (portRef.current) {
                await portRef.current.close();
            }
            setIsConnected(false);
            addLog("장치 연결 해제됨");
        } catch (e: any) {
            addLog("연결 해제 에러: " + e.message);
        }
    };

    const sendCommand = async (cmd: string): Promise<string> => {
        if (!writerRef.current || !readerRef.current) return '';
        try {
            const encoder = new TextEncoder();
            await writerRef.current.write(encoder.encode(cmd));

            const { value } = await readerRef.current.read();
            if (!value) return '';
            return new TextDecoder().decode(value);
        } catch (err) {
            console.error("sendCommand Error", err);
            return '';
        }
    };

    const pollData = async () => {
        if (!isConnected) return;
        try {
            // HKMC BMS Data Request
            const rawResponse = await sendCommand("21 01\r");
            if (rawResponse) {
                const parsed = parseHkmcEvData(rawResponse);
                setCarData(parsed);

                // 버퍼 모듈 처리 (Delta Threshold 기반)
                const payloads = [];
                const payload1 = obdBufferRef.current.processData('SOC', parsed.socDisplay);
                const payload2 = obdBufferRef.current.processData('TEMP', parsed.tempMax);
                const payload3 = obdBufferRef.current.processData('CURRENT', parsed.current);

                if (payload1) payloads.push(...payload1);
                if (payload2) payloads.push(...payload2);
                if (payload3) payloads.push(...payload3);

                if (payloads.length > 0) {
                    setBufferPayloads(payloads);
                }
            }
        } catch (e: any) {
            addLog('데이터 폴링 에러: ' + e.message);
        }
    };

    return {
        isConnected,
        log,
        carData,
        bufferPayloads,
        connectDevice,
        disconnectDevice,
        pollData,
        clearBufferPayloads: () => setBufferPayloads([])
    };
}

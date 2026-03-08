"use client";

import React, { useState, useEffect } from 'react';
import { X, FlipHorizontal } from 'lucide-react';

interface HUDProps {
    speed: number;
    soc: number;
    temp: number;
    powerKw: number;
    dtcWarning?: boolean;
    onClose: () => void;
}

export default function HUDMode({ speed, soc, temp, powerKw, dtcWarning = false, onClose }: HUDProps) {
    const [isMirror, setIsMirror] = useState(false);
    const [time, setTime] = useState('');

    // 실시간 시계
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // 전력 소모량(또는 회생) 시각화 비율 설정 (가속 시 양수 위로, 회생 시 음수 아래 느낌으로 퍼블리싱 등)
    // 여기서는 단순히 크기 비율을 나타냅니다. 
    const powerPercentage = Math.min(100, Math.max(0, (Math.abs(powerKw) / 100) * 100));
    const isRegen = powerKw < 0;

    return (
        <div className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono select-none overflow-hidden ${isMirror ? 'scale-x-[-1]' : ''}`}>

            {/* 0. 제어 버튼 레이어 (더블 탭 또는 보이지 않게 처리 가능하지만 데모를 위해 노출) */}
            <div className={`absolute top-8 w-full px-8 flex justify-between z-10 ${isMirror ? 'opacity-50' : 'opacity-100'}`}>
                <button
                    onClick={() => setIsMirror(!isMirror)}
                    className="p-4 rounded-full bg-white/10 text-white/50 hover:bg-white/20 transition-all border border-white/10"
                >
                    <FlipHorizontal size={28} />
                </button>
                <button
                    onClick={onClose}
                    className="p-4 rounded-full bg-rose-500/20 text-rose-500 hover:bg-rose-500/40 transition-all border border-rose-500/30"
                >
                    <X size={28} />
                </button>
            </div>

            {/* 1. 상단 센터: 시간 및 경고 */}
            <div className="absolute top-12 flex flex-col items-center gap-3">
                <span className="text-white/40 text-2xl tracking-[0.3em] font-semibold">{time || '00:00'}</span>
                {dtcWarning && (
                    <div className="flex animate-pulse items-center gap-3 bg-red-900/40 text-red-500 px-6 py-2 rounded-full border border-red-500/50">
                        <span className="text-3xl">⚠️</span>
                        <span className="text-xl font-bold tracking-widest uppercase">System Check</span>
                    </div>
                )}
            </div>

            {/* 2. 중앙 실시간 속도 (가장 크고 또렷하게) */}
            <div className="text-center mt-10">
                <h1 className="text-[14rem] font-black leading-none text-[#00ffcc] tracking-tighter drop-shadow-[0_0_30px_rgba(0,255,204,0.3)]">
                    {speed.toFixed(0)}
                </h1>
                <p className="text-4xl text-[#00ffcc]/60 font-medium tracking-widest uppercase mt-4">km/h</p>
            </div>

            {/* 3. 재생/동력 게이지 (아치/직선 형태 단순 표현) */}
            <div className="absolute bottom-40 w-full px-20 flex flex-col items-center justify-center opacity-80">
                <div className="text-xs text-white/40 mb-3 tracking-[0.4em] uppercase font-bold text-center">
                    {isRegen ? 'Charge' : 'Power'}
                </div>
                <div className="w-[60%] h-3 bg-white/10 rounded-full overflow-hidden relative border border-white/5 shadow-inner">
                    {/* 회생 제동이면 중앙에서 왼쪽으로, 가속이면 중앙에서 오른쪽으로 스케일되는 형태를 간단히 폭으로 모사합니다. */}
                    <div
                        className={`absolute top-0 bottom-0 ${isRegen ? 'bg-emerald-400 left-0 right-1/2' : 'bg-orange-500 left-1/2'} transition-all duration-300 ease-out`}
                        style={{ width: `${powerPercentage / 2}%` }}
                    />
                </div>
            </div>

            {/* 4. 하단 좌우 상태 (가로선 분리 배치) */}
            <div className="absolute bottom-16 w-full px-16 flex justify-between items-end">
                {/* 좌측: 배터리 잔량 */}
                <div className="flex flex-col items-start min-w-[120px]">
                    <span className="text-emerald-500/80 text-xl mb-2 tracking-[0.3em] font-bold uppercase">Battery</span>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-[5rem] font-bold leading-none ${soc < 20 ? 'text-rose-500' : 'text-white'}`}>{soc.toFixed(0)}</span>
                        <span className="text-3xl text-white/40 font-bold">%</span>
                    </div>
                </div>

                {/* 우측: 배터리 온도 */}
                <div className="flex flex-col items-end min-w-[120px]">
                    <span className="text-amber-500/80 text-xl mb-2 tracking-[0.3em] font-bold uppercase">Temp</span>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-[5rem] font-bold leading-none ${temp > 45 ? 'text-rose-500' : 'text-white'}`}>{temp.toFixed(0)}</span>
                        <span className="text-3xl text-white/40 font-bold">°C</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

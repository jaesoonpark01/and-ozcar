// components/technician/LiveDiagnosticMonitor.tsx
"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Activity, AlertTriangle, Battery, Thermometer, Zap } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

interface LiveData {
    rpm: number;
    voltage: number;
    soh: number;
    coolant_temp: number;
    dtc_codes: string[];
    is_critical: boolean;
    recorded_at: string;
}

export default function LiveDiagnosticMonitor({ vehicleId }: { vehicleId: string }) {
    const [liveData, setLiveData] = useState<LiveData | null>(null);

    useEffect(() => {
        // 1. 특정 차량의 실시간 로그 구독 시작 (Supabase Realtime)
        const channel = supabase
            .channel(`realtime-vehicle-${vehicleId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'vehicle_realtime_logs',
                    filter: `vehicle_id=eq.${vehicleId}`
                },
                (payload) => {
                    setLiveData(payload.new as LiveData);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [vehicleId]);

    if (!liveData) return (
        <div className="p-8 rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400">
            <Activity className="w-8 h-8 mb-2 animate-pulse" />
            <p className="text-sm font-bold uppercase tracking-widest text-[10px]">OBD-II 스캐너 연결 대기 중...</p>
        </div>
    );

    return (
        <div className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden relative group ${liveData.is_critical ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50 shadow-xl shadow-blue-500/10'
            }`}>
            {/* Background decoration */}
            <div className={`absolute -right-4 -bottom-4 opacity-5 transition-transform group-hover:scale-110 ${liveData.is_critical ? 'text-red-600' : 'text-blue-600'}`}>
                <Activity className="w-32 h-32" />
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${liveData.is_critical ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}>
                            <Zap className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                            <h4 className="font-black text-slate-900 leading-tight">실시간 시스템 진단</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">OBD-III Remote Gateway</p>
                        </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${liveData.is_critical ? 'bg-red-200 text-red-600' : 'bg-blue-200 text-blue-600'
                        }`}>
                        <span className={`h-1.5 w-1.5 rounded-full animate-ping ${liveData.is_critical ? 'bg-red-600' : 'bg-blue-600'}`}></span>
                        Live Stream
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/50">
                        <div className="flex items-center gap-2 mb-1 text-slate-400">
                            <Battery className="w-3 h-3" />
                            <p className="text-[9px] font-black uppercase tracking-widest">Battery SOH</p>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <p className={`text-2xl font-black ${liveData.soh < 80 ? 'text-orange-500' : 'text-blue-600'}`}>{liveData.soh}</p>
                            <span className="text-[10px] font-black text-slate-400">%</span>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/50">
                        <div className="flex items-center gap-2 mb-1 text-slate-400">
                            <Thermometer className="w-3 h-3" />
                            <p className="text-[9px] font-black uppercase tracking-widest">Coolant Temp</p>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <p className="text-2xl font-black text-slate-900">{liveData.coolant_temp}</p>
                            <span className="text-[10px] font-black text-slate-400">°C</span>
                        </div>
                    </div>
                </div>

                {liveData.dtc_codes?.length > 0 && (
                    <div className="mt-6 p-4 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-500/30 flex items-start gap-3 animate-bounce">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest mb-1">고장 코드 탐지</p>
                            <p className="text-sm font-bold opacity-90">{liveData.dtc_codes.join(', ')}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

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

import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { LiveTelemetryGraph } from '@/components/obd/LiveTelemetryGraph';

interface LiveData {
    rpm: number;
    voltage: number;
    soh: number;
    coolant_temp: number;
    dtc_codes: string[];
    is_critical: boolean;
    security_status: 'SECURE' | 'TAMPERED' | 'WARNING'; // NEW
    recorded_at: string;
    history?: { ts: string; val: number; stress: number }[]; // NEW
}

export default function LiveDiagnosticMonitor({ vehicleId }: { vehicleId: string }) {
    const [liveData, setLiveData] = useState<LiveData | null>(null);
    const { t } = useI18n();

    useEffect(() => {
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
        <div className="p-10 rounded-[2.5rem] border border-white/5 bg-[#121212] flex flex-col items-center justify-center text-slate-600 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none"></div>
            <Activity className="w-10 h-10 mb-4 animate-pulse text-blue-500/30" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">{t('comp_live_waiting')}</p>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-1 bg-[#121212] rounded-[3rem] border transition-all duration-500 overflow-hidden relative group shadow-2xl ${
                liveData.security_status === 'TAMPERED' ? 'border-red-500/50' : 'border-white/5'
            }`}>
            
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${liveData.is_critical ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'}`}>
                            <Activity size={20} />
                        </div>
                        <div>
                            <h4 className="text-lg font-black italic uppercase italic tracking-tighter text-white">{t('comp_live_telemetry')}</h4>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-0.5">{t('live_anchored_vin')}: {vehicleId.substring(0, 8)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setLiveData(prev => prev ? {...prev, security_status: prev.security_status === 'TAMPERED' ? 'SECURE' : 'TAMPERED'} : null)}
                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-[9px] font-black text-slate-500 uppercase transition-all"
                        >
                            SIM TAMPER
                        </button>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${liveData.is_critical ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full animate-ping ${liveData.is_critical ? 'bg-red-500' : 'bg-blue-400'}`}></div>
                            <span className="text-[9px] font-black uppercase tracking-widest">{t('live_broadcast')}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Integrated Graph */}
                    <LiveTelemetryGraph 
                        data={liveData.history || []} 
                        securityStatus={liveData.security_status} 
                    />

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all group">
                            <div className="flex items-center gap-2 mb-3">
                                <Battery size={14} className="text-slate-500 group-hover:text-blue-400" />
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{t('live_system_soh')}</p>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <p className={`text-4xl font-black italic tracking-tighter ${liveData.soh < 80 ? 'text-orange-500' : 'text-white'}`}>{liveData.soh}</p>
                                <span className="text-xs font-black text-slate-600 italic">%</span>
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all group">
                            <div className="flex items-center gap-2 mb-3">
                                <Thermometer size={14} className="text-slate-500 group-hover:text-amber-500" />
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{t('live_node_temp')}</p>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <p className="text-4xl font-black italic tracking-tighter text-white">{liveData.coolant_temp}</p>
                                <span className="text-xs font-black text-slate-600 italic">°C</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DTC Alerts */}
                <AnimatePresence>
                    {(liveData.dtc_codes?.length > 0 || liveData.security_status === 'TAMPERED') && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-8 overflow-hidden"
                        >
                            <div className={`p-6 rounded-[2rem] flex items-start gap-4 border ${
                                liveData.security_status === 'TAMPERED' 
                                ? 'bg-red-600 text-white border-red-400/20 shadow-[0_15px_30px_rgba(220,38,38,0.4)]' 
                                : 'bg-amber-500 text-black border-amber-400/20 shadow-[0_15px_30px_rgba(245,158,11,0.2)]'
                            }`}>
                                <div className="p-2 bg-black/20 rounded-xl">
                                    <AlertTriangle size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">
                                        {liveData.security_status === 'TAMPERED' ? 'CRITICAL SECURITY BREACH' : t('comp_live_dtc_detected')}
                                    </p>
                                    <p className="text-lg font-black italic tracking-tight uppercase">
                                        {liveData.security_status === 'TAMPERED' ? 'Hardware Tamper Detected!' : liveData.dtc_codes.join(', ')}
                                    </p>
                                    <p className="text-[10px] font-medium mt-1 opacity-70">
                                        {liveData.security_status === 'TAMPERED' 
                                            ? 'The neural link detected unauthorised modification of the vehicle controller. Reporting to DAO Sentinel...'
                                            : 'Diagnostic codes found. Please contact an Ozcar Certified Technician for deep analysis.'}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

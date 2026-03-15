"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Thermometer, Gauge, Zap, ShieldCheck, Siren, ShieldAlert } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface ThermalData {
  temp: number;
  pressure: number;
  voltage_internal: number;
}

interface ThermalSafetyMonitorProps {
  carId: string;
  initialTemp?: number;
}

export default function ThermalSafetyMonitor({ carId, initialTemp = 42 }: ThermalSafetyMonitorProps) {
  const { t } = useI18n();
  const [data, setData] = useState<ThermalData>({ temp: initialTemp, pressure: 1.2, voltage_internal: 3.8 });
  const [isCritical, setIsCritical] = useState(false);
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [proof, setProof] = useState<string | null>(null);

  // 시뮬레이션을 위한 데이터 변화 (실제로는 Supabase Realtime 채널을 통해 수신)
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const nextTemp = prev.temp + (isCritical ? -0.2 : 0.1);
        return {
          ...prev,
          temp: Number(nextTemp.toFixed(1)),
          pressure: Number((prev.pressure + (Math.random() * 0.05 - 0.02)).toFixed(2))
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isCritical]);

  const triggerEmergency = () => setIsCritical(true);
  const resetEmergency = () => {
    setIsCritical(false);
    setData(prev => ({ ...prev, temp: 42 }));
  };

  const generateSafetyProof = async () => {
    setIsGeneratingProof(true);
    // ZKP 서비스 시뮬레이션
    await new Promise(r => setTimeout(r, 2000));
    setProof(`PROO_THERMAL_${Math.random().toString(36).substring(7).toUpperCase()}`);
    setIsGeneratingProof(false);
  };

  return (
    <div className={`relative min-h-[500px] rounded-[3.5rem] overflow-hidden transition-all duration-700 border ${
        isCritical ? 'bg-rose-950/20 border-rose-500 shadow-[0_0_80px_rgba(244,63,94,0.3)]' : 'bg-[#0a0c10] border-white/5'
    }`}>
      {/* Siren Background Animation */}
      <AnimatePresence>
        {isCritical && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute inset-0 bg-rose-600 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-between">
        <header className="flex justify-between items-start">
           <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl border ${isCritical ? 'bg-rose-500/20 border-rose-500 text-rose-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-500'}`}>
                   {isCritical ? <Siren size={20} className="animate-pulse" /> : <ShieldAlert size={20} />}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isCritical ? 'text-rose-500' : 'text-slate-500'}`}>
                  {t('thermal_guard_title')}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-none">
                {isCritical 
                  ? <span className="text-rose-500 animate-pulse">{t('thermal_critical_warning')}</span> 
                  : <>{t('thermal_cell_monitor').split(' ')[0]} <span className="text-blue-500">{t('thermal_cell_monitor').split(' ')[1]}</span></>
                }
              </h2>
           </div>
           {!isCritical && (
                <button 
                  onClick={triggerEmergency}
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black text-slate-500 uppercase tracking-widest hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 transition-all"
                >
                  {t('thermal_simulate_danger')}
                </button>
           )}
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
            {[
                { label: t('thermal_cell_temp'), val: `${data.temp}°C`, icon: <Thermometer size={24} />, status: data.temp > 50 ? 'DANGER' : 'NORMAL' },
                { label: t('thermal_pressure'), val: `${data.pressure} PSI`, icon: <Gauge size={24} />, status: data.pressure > 1.4 ? 'DANGER' : 'NORMAL' },
                { label: t('thermal_voltage'), val: `${data.voltage_internal}V`, icon: <Zap size={24} />, status: 'STABLE' }
            ].map((stat, idx) => (
                <div key={idx} className={`p-8 rounded-[2.5rem] border backdrop-blur-3xl transition-all duration-500 ${
                    stat.status === 'DANGER' ? 'bg-rose-500/10 border-rose-500/30' : 'bg-white/5 border-white/5'
                }`}>
                    <div className={`mb-6 ${stat.status === 'DANGER' ? 'text-rose-500' : 'text-slate-500'}`}>{stat.icon}</div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className={`text-3xl font-black italic tracking-tighter uppercase ${stat.status === 'DANGER' ? 'text-rose-500 animate-bounce' : 'text-white'}`}>
                        {stat.val}
                    </p>
                </div>
            ))}
        </section>

        <footer className="flex flex-col xl:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-[2.5rem] border border-white/5">
            <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center transition-colors ${
                    isCritical ? 'bg-rose-500/20 text-rose-500 animate-pulse' : 'bg-emerald-500/10 text-emerald-500'
                }`}>
                    {isCritical ? <AlertTriangle size={28} /> : <ShieldCheck size={28} />}
                </div>
                <div>
                    <h4 className="text-sm font-black italic text-white uppercase tracking-tight">
                        {isCritical ? t('thermal_evac_advised') : t('thermal_stability_confirmed')}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                        {t('thermal_safety_node_active')} | Vehicle ID: {carId.slice(0, 8)}
                    </p>
                </div>
            </div>

            <div className="flex gap-4 w-full xl:w-auto">
                {isCritical ? (
                    <>
                        <button 
                            onClick={resetEmergency}
                            className="flex-1 xl:flex-none px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white/10"
                        >
                            {t('thermal_false_alarm')}
                        </button>
                        <button className="flex-1 xl:flex-none px-12 py-5 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-rose-600/40 animate-pulse">
                            {t('thermal_emergency_shutdown')}
                        </button>
                    </>
                ) : (
                    <button 
                        onClick={generateSafetyProof}
                        disabled={isGeneratingProof || !!proof}
                        className="w-full xl:w-auto px-12 py-5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-50 flex items-center justify-center gap-3 transition-all hover:bg-blue-500"
                    >
                        {isGeneratingProof ? t('thermal_generating_proof') : proof ? t('thermal_proof_validated') : t('thermal_generate_zkp')}
                    </button>
                )}
            </div>
        </footer>

        {proof && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 p-12 rounded-[3.5rem] shadow-[0_0_100px_rgba(16,185,129,0.5)] z-50 text-center"
            >
                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-2">{t('thermal_proof_generated')}</h3>
                <p className="text-[10px] text-emerald-950 font-black uppercase tracking-widest mb-8">{proof}</p>
                <button 
                    onClick={() => setProof(null)}
                    className="px-8 py-3 bg-white text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest"
                >
                    {t('thermal_dismiss')}
                </button>
            </motion.div>
        )}
      </div>
    </div>
  );
}

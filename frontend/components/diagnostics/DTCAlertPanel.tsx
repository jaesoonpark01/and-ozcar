import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Wrench, ShieldAlert } from 'lucide-react';
import { DTCInfo } from '@/services/obd/DTCService';
import { useI18n } from '@/hooks/useI18n';

interface DTCAlertPanelProps {
    alerts: DTCInfo[];
    onClose: (code: string) => void;
    onAction: (info: DTCInfo) => void;
}

export default function DTCAlertPanel({ alerts, onClose, onAction }: DTCAlertPanelProps) {
    const { t } = useI18n();
    if (alerts.length === 0) return null;

    return (
        <div className="fixed top-24 right-8 z-[1000] w-80 space-y-4">
            <AnimatePresence>
                {alerts.map((alert) => (
                    <motion.div
                        key={alert.code}
                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                        className={`relative overflow-hidden p-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${alert.severity === 'CRITICAL'
                            ? 'bg-red-500/10 border-red-500/30'
                            : 'bg-amber-500/10 border-amber-500/30'
                            }`}
                    >
                        {/* Background Pulse for Critical */}
                        {alert.severity === 'CRITICAL' && (
                            <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
                        )}

                        <div className="flex justify-between items-start relative z-10">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl ${alert.severity === 'CRITICAL' ? 'bg-red-500 text-white' : 'bg-amber-500 text-black'
                                    }`}>
                                    {alert.severity === 'CRITICAL' ? <ShieldAlert size={20} /> : <AlertTriangle size={20} />}
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-tighter text-slate-400">
                                        {t('maint_dtc_system')}: {alert.system}
                                    </div>
                                    <div className="text-sm font-black font-mono">
                                        {alert.code}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => onClose(alert.code)}
                                className="text-slate-500 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="mt-3 space-y-3 relative z-10">
                            <p className="text-xs font-bold text-slate-200">
                                {t(alert.description as any)}
                            </p>

                            <div className="p-2 bg-black/40 rounded-lg border border-white/5">
                                <p className="text-[10px] text-slate-400 leading-tight">
                                    <span className="text-blue-400 font-bold">OZCAR AI:</span> {t(alert.action as any)}
                                </p>
                            </div>

                            <button
                                onClick={() => onAction(alert)}
                                className={`w-full py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 ${alert.severity === 'CRITICAL'
                                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_10px_20px_rgba(220,38,38,0.3)]'
                                    : 'bg-amber-500 hover:bg-amber-400 text-black'
                                    }`}
                            >
                                <Wrench size={12} />
                                {t('maint_dtc_btn_reserve')}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

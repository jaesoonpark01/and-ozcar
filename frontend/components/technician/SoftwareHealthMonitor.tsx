import React from 'react';
import { Cpu, Zap, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SoftwareHealthMonitorProps {
    vehicleData?: any;
}

import { motion } from 'framer-motion';

export default function SoftwareHealthMonitor({ vehicleData }: SoftwareHealthMonitorProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {/* 1. ADAS & Firmware Version Status */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#121212] p-8 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group"
            >
                <div className="absolute top-0 left-0 w-24 h-24 bg-blue-600/5 rounded-full blur-[60px] pointer-events-none"></div>

                <h3 className="text-xl font-black italic uppercase italic tracking-tighter mb-8 flex items-center gap-3 text-white">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></span>
                    Firmware <span className="text-blue-500">Indexing</span>
                </h3>

                <div className="space-y-3">
                    <VersionRow
                        label="Infotainment OS"
                        current="v3.2.1"
                        status="Latest"
                        icon={<Cpu size={16} className="text-slate-500" />}
                    />
                    <VersionRow
                        label="Autonomous Drive (ADAS)"
                        current="v2.0.4"
                        status="Update Req"
                        urgent
                        icon={<Zap size={16} className="text-amber-500" />}
                    />
                    <VersionRow
                        label="Battery Mgmt (BMS)"
                        current="v4.1.0"
                        status="Latest"
                        icon={<Activity size={16} className="text-blue-500" />}
                    />
                </div>

                <div className="mt-8 p-6 bg-white/5 rounded-[2.5rem] border border-white/5 group-hover:bg-white/10 transition-all">
                    <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <ShieldCheck size={12} /> Blockchain Verified
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                        Software hashes are anchored to <span className="text-slate-200">Polygon POS</span>. Any unauthorized firmware injection will trigger an immediate node lock.
                    </p>
                </div>
            </motion.div>

            {/* 2. AI Error Code Prediction */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#121212] p-8 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-[80px] pointer-events-none"></div>

                <h3 className="text-xl font-black italic uppercase italic tracking-tighter mb-8 flex items-center gap-3 text-white">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                    AI Sentinel <span className="text-indigo-500">Pulse</span>
                </h3>

                <div className="space-y-6">
                    <div className="p-6 bg-white/5 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl group-hover:bg-white/10 transition-all">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-3">Predictive Engine Alert</p>
                        <div className="flex gap-4">
                            <div className="p-2 bg-amber-500/20 rounded-xl h-fit">
                                <AlertCircle size={20} className="text-amber-500" />
                            </div>
                            <p className="text-xs text-slate-300 font-medium leading-relaxed">
                                "Steering angle sensor variance detected. <span className="text-amber-500 font-black tracking-tight italic">C1260 critical fail probability 89%</span> within next 450km."
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Health SOH</div>
                            <div className="text-3xl font-black text-emerald-500 italic tracking-tighter">82%</div>
                        </div>
                        <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">MTTR Prediction</div>
                            <div className="text-3xl font-black text-blue-500 italic tracking-tighter">14D</div>
                        </div>
                    </div>
                </div>

                <button className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-blue-500/20 shadow-xl active:scale-95">
                    Generate Predictive Report
                </button>
            </motion.div>
        </div>
    );
}

import { ShieldCheck } from 'lucide-react';

function VersionRow({ label, current, status, urgent, icon }: any) {
    return (
        <div className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-white/5 px-4 rounded-2xl transition-all group/row">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-white/5 rounded-lg group-hover/row:scale-110 transition-transform">
                    {icon}
                </div>
                <span className="text-[11px] text-slate-300 font-black uppercase tracking-tight">{label}</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-slate-500">{current}</span>
                <span className={`text-[9px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-widest border ${urgent ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    }`}>
                    {urgent ? <AlertCircle size={10} /> : <CheckCircle2 size={10} />}
                    {status}
                </span>
            </div>
        </div>
    );
}

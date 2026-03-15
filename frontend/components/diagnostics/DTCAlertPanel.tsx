"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Wrench, Info, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

interface DTCAlertProps {
    dtcCode: string;
    description: string;
    severity: 'critical' | 'warning' | 'info';
    analysis: string;
    estimatedCost: string;
}

export default function DTCAlertPanel({ dtcCode, description, severity, analysis, estimatedCost }: DTCAlertProps) {
    const severityColors = {
        critical: 'rose',
        warning: 'amber',
        info: 'blue'
    };

    const color = severityColors[severity];

    return (
        <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-[#0a0a0b] border border-${color}-500/20 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl`}
        >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/5 blur-[60px]`}></div>
            
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                <div className={`p-6 bg-${color}-500/10 rounded-3xl border border-${color}-500/20 shadow-inner group transition-transform hover:scale-105`}>
                    <ShieldAlert className={`text-${color}-500 w-12 h-12`} />
                </div>
                
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`px-4 py-1.5 bg-${color}-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-${color}-500/20`}>
                            {severity} Error
                        </span>
                        <div className="text-slate-700 font-black italic text-sm tracking-tighter">OBD-II DIAGNOSTIC CODE</div>
                    </div>
                    
                    <h2 className="text-4xl font-black italic italic tracking-tighter text-white uppercase mb-4">
                        {dtcCode} <span className="text-slate-500 not-italic text-lg mx-2">|</span> <span className={`text-${color}-400`}>{description}</span>
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Cpu size={14} className={`text-${color}-500`} /> AI Analysis
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                {analysis}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex flex-col justify-between">
                                <h4 className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Est. Repair Cost</h4>
                                <p className="text-xl font-black italic text-white uppercase tracking-tighter">{estimatedCost}</p>
                            </div>
                            <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-3xl flex flex-col justify-between group hover:bg-blue-600 transition-all cursor-pointer">
                                <h4 className="text-[8px] font-black text-blue-400 group-hover:text-white uppercase tracking-widest mb-2">Book Service</h4>
                                <div className="flex items-center justify-between text-white">
                                    <Wrench size={24} className="group-hover:animate-bounce" />
                                    <CheckCircle2 size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

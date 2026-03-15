"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Target, ShieldCheck, Zap, Activity } from 'lucide-react';

interface TimelineEvent {
  date: string;
  type: 'MAINTENANCE' | 'DATA_MINT' | 'SAFETY_AUDIT' | 'MILEAGE_UPDATE';
  impact: 'POSITIVE' | 'STABLE' | 'DEPRECIATION';
  valueChange: number;
  description: string;
}

interface AssetValueTimelineProps {
  events: TimelineEvent[];
  currentValue: number;
  marketAverage: number;
}

export default function AssetValueTimeline({ 
  events = [
    { date: "2026-01-10", type: "MAINTENANCE", impact: "POSITIVE", valueChange: 250, description: "Master Service: Cell Balancing" },
    { date: "2026-02-15", type: "DATA_MINT", impact: "POSITIVE", valueChange: 120, description: "Neural Data Contribution Reward" },
    { date: "2026-03-01", type: "SAFETY_AUDIT", impact: "STABLE", valueChange: 0, description: "ZKP Safety Audit Passed" },
    { date: "2026-03-14", type: "MILEAGE_UPDATE", impact: "DEPRECIATION", valueChange: -80, description: "Monthly Usage Depreciation" }
  ],
  currentValue = 42500,
  marketAverage = 38000
}: AssetValueTimelineProps) {
  
  return (
    <div className="bg-[#0f1115] p-10 md:p-14 rounded-[3.5rem] border border-white/5 relative overflow-hidden shadow-2xl">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-500">
                  <Activity size={20} />
               </div>
               <span className="text-[10px] font-black italic text-slate-500 uppercase tracking-[0.4em]">Asset Protection Matrix</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-none mb-2">
              Value <span className="text-blue-500">Defense</span>
            </h2>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Real-time Depreciation vs. Data Enrichment</p>
          </div>

          <div className="flex gap-10 bg-white/5 px-10 py-6 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl">
            <div className="text-center">
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Alpha Value</p>
               <p className="text-3xl font-black italic text-white tracking-tighter">${currentValue.toLocaleString()}</p>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="text-center">
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">vs Market</p>
               <p className="text-3xl font-black italic text-emerald-400 tracking-tighter">
                +${(currentValue - marketAverage).toLocaleString()}
               </p>
            </div>
          </div>
        </header>

        {/* Timeline Visualization */}
        <div className="relative ml-4 md:ml-10">
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-white/10 to-transparent"></div>

          <div className="space-y-12">
            {events.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-12 group/event"
              >
                {/* Node Dot */}
                <div className={`absolute left-[-5px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-[#0f1115] z-10 transition-all group-hover/event:scale-150 ${
                  event.impact === 'POSITIVE' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
                  event.impact === 'DEPRECIATION' ? 'bg-rose-500' : 'bg-blue-400'
                }`}></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.03] p-8 rounded-[2rem] border border-white/[0.05] hover:bg-white/[0.07] transition-all hover:border-blue-500/20">
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                     <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest w-24">{event.date}</div>
                     <div className="flex items-center gap-5">
                        <div className={`p-4 rounded-2xl border transition-colors ${
                          event.type === 'MAINTENANCE' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                          event.type === 'DATA_MINT' ? 'bg-purple-500/10 border-purple-500/20 text-purple-500' :
                          'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                        }`}>
                          {event.type === 'MAINTENANCE' ? <ShieldCheck size={24} /> : 
                           event.type === 'DATA_MINT' ? <Zap size={24} /> : <Target size={24} />}
                        </div>
                        <div>
                          <h4 className="text-sm font-black italic text-white uppercase tracking-tight mb-1">{event.description}</h4>
                          <p className={`text-[9px] font-black uppercase tracking-widest ${
                            event.impact === 'POSITIVE' ? 'text-emerald-500' : 'text-rose-500'
                          }`}>
                            {event.impact === 'POSITIVE' ? `Value Defended: +$${event.valueChange}` : 
                             event.impact === 'DEPRECIATION' ? `Market Correction: -$${Math.abs(event.valueChange)}` : 'Value Anchored: 0.00% Drift'}
                          </p>
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex items-end gap-3 md:text-right">
                    {event.impact === 'POSITIVE' ? <TrendingUp size={20} className="text-emerald-500 mb-1" /> : <TrendingDown size={20} className="text-rose-500 mb-1" />}
                    <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Impact Score</p>
                        <p className={`text-xl font-black italic tracking-tighter ${
                            event.impact === 'POSITIVE' ? 'text-emerald-400' : 'text-white'
                        }`}>
                            {event.impact === 'POSITIVE' ? '+4.2' : event.impact === 'DEPRECIATION' ? '-1.8' : '0.0'}
                        </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <footer className="mt-16 bg-blue-600/5 rounded-[2.5rem] p-10 border border-blue-500/10 flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-inner">
                 <Target size={32} />
              </div>
              <div>
                 <h4 className="text-lg font-black italic text-white uppercase tracking-tight mb-1">Premium Resale Recommendation</h4>
                 <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                    Based on your <span className="text-blue-500">Master Maintenance</span> history, we recommend listing at the 95th percentile.
                 </p>
              </div>
           </div>
           <button className="w-full md:w-auto px-12 py-6 bg-blue-600 text-white rounded-3xl font-black italic tracking-[0.2em] text-[11px] shadow-2xl shadow-blue-600/20 hover:bg-blue-500 transition-all flex items-center justify-center gap-3 active:scale-95">
              Verify NFT Valuation
           </button>
        </footer>
      </div>
    </div>
  );
}

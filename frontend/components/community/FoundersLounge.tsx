"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, Activity, LineChart, ChevronRight, 
  Lock, Users, BarChart3, TrendingUp, Vote, MessageSquare,
  Crown, Sparkles, Fingerprint
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FoundersLounge() {
  const [activeTab, setActiveTab] = useState("all");
  const [votingCase, setVotingCase] = useState<any>(null);

  return (
    <div className="bg-[#070708] min-h-screen text-slate-200 font-sans selection:bg-amber-500/30">
      {/* Neural Background for VIP */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* 라운지 전용 헤더 */}
      <header className="p-6 border-b border-amber-900/30 flex justify-between items-center bg-[#0d0d0f]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/20">
             <Crown className="text-slate-950" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black italic text-white tracking-widest uppercase">
              The <span className="text-amber-500">Lounge</span>
            </h1>
            <p className="text-[9px] text-amber-500/50 font-black tracking-[0.3em] uppercase">
              Exclusive Founder Network
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
           <div className="text-right">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Network Stability</p>
              <p className="text-sm font-black text-emerald-500 italic">99.98% SAFE</p>
           </div>
           <div className="w-px h-8 bg-white/5"></div>
           <div className="flex flex-col items-end">
             <span className="text-[8px] uppercase tracking-widest text-amber-500/50 font-black mb-1 flex items-center gap-1">
               <Fingerprint size={10} /> Total Asset Guarded
             </span>
             <p className="text-xl font-black italic text-amber-400 bg-amber-500/5 px-4 py-1 rounded-xl border border-amber-500/20 shadow-xl">
               ₩1,502.8B
             </p>
           </div>
        </div>
      </header>

      <main className="p-4 md:p-12 max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* VIP Analytics Section (Phase 13 New) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#0f1115] border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
             <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <BarChart3 size={14} className="text-amber-500" /> Ecosystem Health Analytics
                   </h3>
                   <span className="text-[10px] text-emerald-500 font-black uppercase tracking-tighter bg-emerald-500/10 px-2 py-1 rounded-md">Real-time</span>
                </div>
                <div className="grid grid-cols-3 gap-8">
                   <div className="space-y-2">
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Global SOH Avg</p>
                      <p className="text-3xl font-black text-white italic">94.8%</p>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                         <div className="w-[94.8%] h-full bg-amber-500"></div>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Active nodes</p>
                      <p className="text-3xl font-black text-white italic">12,504</p>
                      <div className="text-[10px] text-emerald-500 font-bold">+12% vs LW</div>
                   </div>
                   <div className="space-y-2">
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">OZC Circulating</p>
                      <p className="text-3xl font-black text-white italic">840.2M</p>
                      <div className="text-[10px] text-amber-500 font-bold">STAKED 72%</div>
                   </div>
                </div>
             </div>
          </div>
          <div className="bg-gradient-to-br from-amber-600 to-amber-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
             <div className="absolute -bottom-8 -left-8 opacity-10">
                <Sparkles size={120} />
             </div>
             <div>
                <p className="text-slate-100/60 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-4">
                   <Lock size={12} /> Strategic Insight
                </p>
                <h4 className="text-xl font-black text-white italic uppercase leading-tight mb-4 tracking-tighter">
                   2026 Q2 Ecosystem<br/>Growth Roadmap
                </h4>
             </div>
             <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-black py-4 rounded-2xl border border-white/20 transition-all text-xs uppercase italic tracking-widest">
                Access PDF Report
             </button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Left Feed */}
           <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                 <div className="flex gap-8">
                    {["all", "lab", "tips", "feedback"].map((tab) => (
                       <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors relative pb-4 ${activeTab === tab ? 'text-amber-500' : 'text-slate-600 hover:text-slate-400'}`}>
                          {tab}
                          {activeTab === tab && (
                             <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
                          )}
                       </button>
                    ))}
                 </div>
                 <Users size={16} className="text-slate-700" />
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {/* Feeds */}
                <FeedItem 
                  author="Founder_Elon" 
                  tier="1st Gen" 
                  car="Tesla Model 3"
                  content="겨울철 영하 5도 이하에서 LFP 배터리 히팅 효율을 분석해봤습니다. 초기 10분간의 전비 손실이 전체 사이클에 어떤 영향을 미치는지 데이터랩에 올렸습니다."
                  soh={99.2}
                  efficiency={115}
                  avatarColor="from-amber-500 to-amber-200"
                />
                
                <FeedItem 
                  author="CryptoMechanic" 
                  tier="2nd Gen" 
                  car="Porsche Taycan"
                  content="Ozcar Sentinel AI 리스크 점수가 80점 이상일 때 하드웨어 수준에서 출력 제한을 거는 거버넌스 안건 어떨까요? 안전을 위해 최소한의 안전장치가 필요해 보입니다."
                  avatarColor="from-blue-500 to-cyan-400"
                />
              </motion.div>
           </div>

           {/* Right Sidebar: Private Governance Widget */}
           <div className="space-y-8">
              <div className="bg-[#0f1115] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
                 <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Vote size={14} className="text-amber-500" /> Private Governance
                 </h3>
                 <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-500/20 transition-all cursor-pointer group/item"
                         onClick={() => setVotingCase(votingCase === 1 ? null : 1)}>
                       <div className="flex items-center gap-2 mb-3">
                          <span className="bg-amber-500/10 text-amber-500 text-[8px] px-1.5 py-0.5 rounded-md font-black">OIP-77</span>
                          <span className="text-[10px] text-slate-500 font-bold italic">48h remaining</span>
                       </div>
                       <h5 className="text-[13px] font-black text-white italic uppercase tracking-tighter group-hover/item:text-amber-400 transition-colors">
                          Strategic Expansion to SE Asia Network
                       </h5>
                       
                       <AnimatePresence>
                         {votingCase === 1 && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                               <div className="pt-4 space-y-4">
                                  <p className="text-[11px] text-slate-500 leading-relaxed uppercase">
                                     동남아시아 LFP 배터리 허브 구축을 위한 전략적 네트워크 파트너십 체결 및 OZC 유동성 공급안.
                                  </p>
                                  <div className="space-y-2">
                                     <div className="flex justify-between items-end text-[9px] font-black italic">
                                        <span className="text-amber-500 uppercase">Yes (84.2%)</span>
                                        <span className="text-slate-600 uppercase">No (15.8%)</span>
                                     </div>
                                     <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                                        <div className="w-[84.2%] h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                                     </div>
                                  </div>
                                  <div className="flex gap-2 pt-2">
                                     <button className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 rounded-xl text-[10px] uppercase italic transition-all">Support</button>
                                     <button className="flex-1 bg-white/5 hover:bg-white/10 text-slate-500 font-black py-2.5 rounded-xl text-[10px] uppercase italic transition-all">Oppose</button>
                                  </div>
                               </div>
                            </motion.div>
                         )}
                       </AnimatePresence>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/5 opacity-50 grayscale">
                       <div className="flex items-center gap-2 mb-3">
                          <span className="bg-slate-700 text-slate-400 text-[8px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-widest italic">Closed</span>
                       </div>
                       <h5 className="text-[13px] font-black text-slate-400 italic uppercase tracking-tighter">
                          Incentive Structure Update v2.1
                       </h5>
                    </div>
                 </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-[2rem] p-8 shadow-2xl group">
                 <div className="flex items-center gap-3 mb-6">
                    <MessageSquare className="text-indigo-400" size={20} />
                    <h3 className="text-xs font-black text-indigo-300 uppercase tracking-widest">Global Lounge Feed</h3>
                 </div>
                 <div className="space-y-4">
                    <div className="flex gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-black text-indigo-400 border border-indigo-500/30">JD</div>
                       <div className="flex-1">
                          <p className="text-[10px] font-black text-indigo-300">JackDorsey_VIP</p>
                          <p className="text-[11px] text-slate-500 mt-1 uppercase leading-tight italic">이번 정기 점검 리포트 아주 인상적이네요. 특히 ZKP 섹션은...</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

function FeedItem({ author, tier, car, content, soh, efficiency, avatarColor }: any) {
  return (
    <div className="bg-[#0f1115] rounded-[2.5rem] p-8 border border-white/5 hover:border-amber-500/20 transition-all shadow-xl group">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className={`w-14 h-14 rounded-[1.5rem] bg-gradient-to-tr ${avatarColor} border-2 border-slate-950 shadow-2xl shadow-amber-900/10 group-hover:rotate-6 transition-transform`} />
          <div>
            <div className="flex items-center gap-2">
               <p className="font-black text-lg text-white italic uppercase tracking-tighter leading-none">{author}</p>
               <span className="bg-amber-500/10 text-amber-500 text-[8px] px-2 py-0.5 rounded-full border border-amber-500/20 uppercase tracking-widest font-black italic">{tier}</span>
            </div>
            <p className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-2 font-black uppercase tracking-widest">
              {car} <span className="w-1 h-1 bg-slate-700 rounded-full"></span> 
              <span className="text-emerald-500 opacity-60 flex items-center gap-1"><Activity size={10} /> oz-Index 98</span>
            </p>
          </div>
        </div>
        <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">2h ago</span>
      </div>

      <p className="text-sm leading-relaxed mb-8 text-slate-400 font-medium grayscale group-hover:grayscale-0 transition-all uppercase italic tracking-tight">
        "{content}"
      </p>

      {soh && (
        <div className="bg-black/40 rounded-3xl p-6 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 group-hover:bg-amber-500/[0.02] transition-colors">
          <div className="flex gap-12">
            <div>
              <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-2">Battery Health (SOH)</p>
              <div className="flex items-center gap-3">
                 <ShieldCheck className="text-amber-500" size={20} />
                 <p className="text-xl font-black text-white italic tracking-tighter">{soh}%</p>
              </div>
            </div>
            <div className="w-px h-10 bg-white/5"></div>
            <div>
              <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-2">Weekly Efficiency</p>
              <div className="flex items-center gap-3">
                 <TrendingUp className="text-emerald-500" size={20} />
                 <p className="text-xl font-black text-white italic tracking-tighter">{efficiency}% <span className="text-[10px] font-black text-slate-600 ml-1 uppercase">vs AVG</span></p>
              </div>
            </div>
          </div>
          <button className="text-[10px] font-black bg-amber-500/5 hover:bg-amber-500 text-amber-500 hover:text-slate-950 px-6 py-3 rounded-2xl border border-amber-500/20 transition-all uppercase italic tracking-widest flex items-center gap-2 w-full sm:w-auto justify-center">
            <LineChart size={14} /> Full Telemetry
          </button>
        </div>
      )}
    </div>
  );
}

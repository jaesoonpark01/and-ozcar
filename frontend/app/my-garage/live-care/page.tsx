"use client";

import { useState } from "react";
import { Activity, Shield, TrendingDown, TrendingUp, AlertCircle, CheckCircle } from "react-feather";

export default function LiveCarePage() {
  const [hasMaintained, setHasMaintained] = useState(false);
  const [missionActive, setMissionActive] = useState(false);
  const [safetyScore, setSafetyScore] = useState(85); // 0-100

  const currentValue = 30000000;
  const badFutureValue = Math.floor(currentValue * 0.85); // 15% depreciation
  const goodFutureValue = Math.floor(currentValue * 0.95); // 5% depreciation
  
  const simulatedValue = hasMaintained ? goodFutureValue : badFutureValue;
  const savedValue = goodFutureValue - badFutureValue;

  const handleApplyMaintenance = () => {
    setHasMaintained(!hasMaintained);
    // In a real app: call Supabase `simulate_future_value` RPC here
  };

  const handleStartMission = () => {
    setMissionActive(true);
    setTimeout(() => {
      setSafetyScore(prev => Math.min(100, prev + 5));
      alert("?‰ ?ì‚° ë°©ì–´ ë¯¸ì…˜ ?±ê³µ! ?ì‚° ?¨ë„ 5???ìŠ¹!");
      setMissionActive(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#020408] text-slate-200 p-8 font-sans">
      <header className="mb-10 pb-6 border-b border-white/5 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Activity className="text-blue-500" /> Live-Care Asset Simulation
          </h1>
          <p className="text-sm text-slate-500 mt-2">ì°¨ëŸ‰ ?°ì´?°ë? ?°ë™?˜ì—¬ ë¯¸ë˜ ?”ì¡´ ê°€ì¹˜ë? ë°©ì–´?˜ì„¸??</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">Current Estimate</p>
          <h2 className="text-4xl font-black font-mono tracking-tighter">
            ??(currentValue).toLocaleString()}
          </h2>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Digital Twin & Mission */}
        <div className="lg:col-span-1 space-y-6">
          {/* Digital Twin Widget */}
          <div className="bg-[#0A0C10] p-6 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
            <h3 className="text-sm font-bold text-slate-400 mb-6 flex items-center gap-2">
              <Shield size={16} /> Asset Defense Status
            </h3>
            
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="60" stroke="#1f2937" strokeWidth="8" fill="transparent" />
                  <circle 
                    cx="64" cy="64" r="60" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray="376" 
                    strokeDashoffset={376 - (376 * safetyScore) / 100} 
                    className={`${safetyScore > 80 ? 'text-green-500' : 'text-amber-500'} transition-all duration-1000`} 
                  />
                </svg>
                <div className="text-center absolute">
                  <span className="text-3xl font-black text-white">{safetyScore}Â°</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-center text-slate-500">
              ?„ì¬ ?ì‚° ? ì? ?¨ë„ê°€ {safetyScore > 80 ? '?„ì£¼ ?‘í˜¸' : 'ì£¼ì˜ ?”ë§'} ?˜ì??…ë‹ˆ??<br/>
              ?•ë¹„ ì§€????ë§¤ì›” ê°€ì¹˜ê? ?˜ë½?©ë‹ˆ??
            </p>
          </div>

          {/* Gamified Mission Widget */}
          <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/10 p-6 rounded-3xl border border-blue-500/20">
            <h3 className="text-sm font-bold text-blue-400 mb-4 uppercase tracking-widest">Today's Mission</h3>
            <p className="text-lg font-black text-white mb-2">?´ê·¼ê¸?ê¸‰ê????œë¡œ(0)</p>
            <p className="text-sm text-slate-400 mb-6">ê¸‰ê??ì„ ì¤„ì—¬ ?”ì§„ ?¤íŠ¸?ˆìŠ¤ë¥???¶”ê³??”ì¡´ ê°€ì¹˜ë? ë³´í˜¸?˜ì„¸??</p>
            
            <button 
              onClick={handleStartMission}
              disabled={missionActive}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                missionActive ? "bg-slate-800 text-slate-500" : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              {missionActive ? (
                <><Activity size={18} className="animate-spin" /> ì£¼í–‰ ?°ì´??ë¶„ì„ ì¤?..</>
              ) : (
                <><CheckCircle size={18} /> ë¯¸ì…˜ ?œì‘?˜ê¸°</>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Depreciation Forecast */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0A0C10] p-8 rounded-3xl border border-white/5 shadow-xl h-full flex flex-col">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">1 Year Value Forecast</h2>
                <p className="text-sm text-slate-500">?”ì§„?¤ì¼ êµí™˜ ?œê¸°???°ë¥¸ ë¹„êµ</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Simulated Future Value</p>
                <h3 className="text-3xl font-black font-mono tracking-tighter text-blue-400">
                  ??(simulatedValue).toLocaleString()}
                </h3>
              </div>
            </div>

            {/* Simple Graph Mockup */}
            <div className="flex-1 relative border-l border-b border-slate-800 mb-10 mx-4">
               {/* Y Axis labels */}
               <div className="absolute -left-16 top-0 text-[10px] text-slate-600 font-mono">??0M</div>
               <div className="absolute -left-16 bottom-0 text-[10px] text-slate-600 font-mono">??5M</div>
               
               {/* 'Bad' Scenario Line (No maintenance) */}
               <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
                 <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                   <polyline points="0,0 100,80" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                 </svg>
                 {!hasMaintained && (
                   <div className="absolute right-0 bottom-[10%] -translate-y-[80%] bg-red-500/20 text-red-500 text-xs px-2 py-1 rounded font-bold border border-red-500/50 flex items-center gap-1">
                     <TrendingDown size={12} /> ë°©ì¹˜ (?˜ëª… ?€??
                   </div>
                 )}
               </div>

               {/* 'Good' Scenario Line (Maintenance applied) */}
               <div className="absolute left-0 top-0 w-full h-full pointer-events-none transition-opacity duration-500">
                 <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                   <polyline points="0,0 100,20" fill="none" stroke="#3b82f6" strokeWidth="3" className={hasMaintained ? "opacity-100" : "opacity-30"} />
                 </svg>
                 {hasMaintained && (
                   <div className="absolute right-0 top-[20%] -translate-y-1/2 bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded font-bold border border-blue-500/50 flex items-center gap-1">
                     <TrendingUp size={12} /> ë°©ì–´ ?±ê³µ
                   </div>
                 )}
               </div>
            </div>

            {/* ROI Interaction Area */}
            <div className="mt-auto bg-black/40 p-6 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white mb-1">
                  {hasMaintained ? "???•ë¹„ê°€ ?„ë£Œ?˜ì—ˆ?µë‹ˆ?? : <><AlertCircle className="inline text-amber-500 w-4 h-4 mb-1" /> ?”ì§„?¤ì¼ êµí™˜ ?œê¸° ?„ê³¼</>}
                </p>
                <p className="text-xs text-slate-400">?ê¸° ?•ë¹„ë¡?ë¶€???˜ëª…???°ì¥?˜ë©´ ì¤‘ê³ ì°?ê°ê?ë¥??¬ê²Œ ë°©ì–´?????ˆìŠµ?ˆë‹¤.</p>
              </div>
              
              <div className="flex items-center gap-4">
                {hasMaintained && (
                  <div className="text-right animate-in fade-in slide-in-from-right-4">
                    <p className="text-[10px] text-green-400 uppercase tracking-widest font-bold">Value Saved</p>
                    <p className="text-2xl font-black text-green-500 font-mono">+??savedValue.toLocaleString()}</p>
                  </div>
                )}
                <button 
                  onClick={handleApplyMaintenance}
                  className={`px-6 py-4 rounded-xl font-bold transition-all shadow-lg ${
                    hasMaintained ? "bg-slate-800 text-slate-400 hover:bg-slate-700" : "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20 hover:scale-105"
                  }`}
                >
                  {hasMaintained ? "?œë??ˆì´??ì´ˆê¸°?? : "?•ë¹„ ?¨ê³¼(ROI) ë¯¸ë¦¬ë³´ê¸°"}
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { Search, MapPin, AlertTriangle, CheckCircle, Save, Camera, Car, RefreshCw, Smartphone, Cpu, ShieldCheck, Box, Info, Terminal, Zap, Activity } from "lucide-react";
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

interface InspectionData {
  rpm: number;
  voltage: number;
  soh: number;
  coolant_temp: number;
  is_critical: boolean;
  obd_status: 'online' | 'offline';
}

interface LogEntry {
  id: number;
  timestamp: string;
  type: 'info' | 'warn' | 'error' | 'raw';
  message: string;
}

export default function FastInspectionUI() {
  const [activeSegment, setActiveSegment] = useState("exterior");
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const [inspectionData, setInspectionData] = useState<InspectionData>({
    rpm: 0,
    voltage: 12.6,
    soh: 98,
    coolant_temp: 85,
    is_critical: false,
    obd_status: 'online'
  });

  // Real-time Data Sync & Terminal Log Simulation
  useEffect(() => {
    const interval = setInterval(() => {
        setInspectionData(prev => ({
            ...prev,
            rpm: prev.obd_status === 'online' ? Math.floor(Math.random() * 800) + 700 : 0,
            voltage: 13.2 + (Math.random() * 0.4),
        }));

        // Add raw OBD log Simulation
        const rawHex = `0x${Math.trunc(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0')}`;
        addLog('raw', `OBD_RX: ${rawHex} (PARSING_ENGINE_STATS)`);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (type: LogEntry['type'], message: string) => {
    setLogs(prev => [...prev.slice(-15), {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }),
      type,
      message
    }]);
  };

  const handleSegmentChange = (id: string) => {
    setActiveSegment(id);
    setIsScanning(true);
    addLog('info', `Switching Neural Matrix to ${id.toUpperCase()}...`);
    setTimeout(() => {
        setIsScanning(false);
        addLog('info', `${id.toUpperCase()} Scan Synchronized.`);
    }, 1500);
  };

  return (
    <div className="bg-[#0f1115] min-h-screen text-slate-200 flex flex-col md:flex-row font-sans selection:bg-amber-500/30 overflow-hidden">
      
      {/* Sidebar / 차량 요약 정보 */}
      <aside className="w-full md:w-96 bg-[#141417] p-8 border-r border-slate-800/50 flex flex-col h-auto md:h-screen sticky top-0 z-20 shadow-2xl overflow-y-auto">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl text-slate-950 shadow-lg shadow-amber-500/20">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Oz-Inspect <span className="text-amber-500">PRO</span></h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"></span>
            <p className="text-[10px] text-emerald-500/80 font-black uppercase tracking-[0.2em]">
                Neural Link: Secure
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1c1c21] to-black rounded-[2.5rem] p-7 border border-white/5 mb-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-25 transition-opacity duration-1000 rotate-12">
            <Car size={100} />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-3xl font-black italic text-white tracking-tighter leading-none mb-1">14가 3928</h3>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Tesla Model 3 LR (2022)</p>
                </div>
                <div className="bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20 text-amber-500">
                    <Smartphone className="w-5 h-5" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1.5">oz-Index</p>
                    <p className="text-2xl font-black italic text-amber-500 tracking-tighter">92 <span className="text-[10px] text-slate-500 not-italic uppercase">Pts</span></p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1.5">SOH</p>
                    <p className="text-2xl font-black italic text-emerald-400 tracking-tighter">{inspectionData.soh}%</p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">Hardware Auth</span>
                    <span className="text-blue-400 flex items-center gap-1.5">
                       <ShieldCheck size={12} />
                       <span className="text-white">ENCRYPTED</span>
                    </span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                    ></motion.div>
                </div>
            </div>
          </div>
        </div>

        {/* 카테고리 네비게이션 */}
        <nav className="space-y-3 flex-grow py-4">
          {[
            { id: 'exterior', label: 'Exterior', icon: <Car size={18} /> },
            { id: 'underbody', label: 'Underbody', icon: <Box size={18} /> },
            { id: 'interior', label: 'Interior', icon: <Smartphone size={18} /> },
            { id: 'battery', label: 'Neural / Battery', icon: <Cpu size={18} /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleSegmentChange(item.id)}
              className={`w-full flex items-center gap-5 px-7 py-5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group/item ${
                activeSegment === item.id 
                  ? "bg-amber-500 text-black shadow-[0_15px_30px_rgba(245,158,11,0.25)] translate-x-1" 
                  : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
              }`}
            >
              <span className={`transition-transform duration-500 ${activeSegment === item.id ? 'scale-110' : 'group-hover/item:scale-110'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {activeSegment === item.id && (
                <motion.div layoutId="activeGlow" className="absolute left-0 w-1.5 h-full bg-slate-950" />
              )}
            </button>
          ))}
        </nav>

        <button className="mt-8 bg-white text-slate-950 font-black uppercase tracking-[0.2em] italic text-[10px] py-6 rounded-[1.8rem] shadow-2xl transition-all active:scale-[0.98] flex justify-center items-center gap-3 hover:bg-amber-50 group">
          <Save className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          Finalise Inspection
        </button>
      </aside>

      {/* Main Content / 검수 입력 패널 */}
      <main className="flex-1 p-8 md:p-12 bg-[#0a0a0b] overflow-y-auto relative h-screen">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-amber-500/5 blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-600/5 blur-[150px] pointer-events-none"></div>
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <Activity size={16} className="text-amber-500 animate-pulse" />
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Diagnostic Segment Alpha</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none">
                {activeSegment.replace('/', ' ')} <span className="text-amber-500">Scan</span>
            </h1>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-white/5 hover:bg-amber-500/10 hover:border-amber-500/30 text-white px-6 py-5 rounded-[1.5rem] border border-white/5 transition-all flex items-center justify-center gap-3">
                <Camera className="w-5 h-5 text-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-widest md:hidden">Capture</span>
            </button>
            <button className="flex-1 md:flex-none bg-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 text-white px-6 py-5 rounded-[1.5rem] border border-white/5 transition-all flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest">
                <Terminal className="w-5 h-5 text-blue-400" />
                <span className="md:hidden">Logs</span>
            </button>
          </div>
        </header>

        {/* 차량 이미지 매핑 UI + Scanning Overlay (Phase 14 New) */}
        <section className="bg-gradient-to-b from-[#141417] to-[#0a0a0b] rounded-[3.5rem] p-12 md:p-20 border border-white/5 flex justify-center items-center mb-12 relative shadow-2xl min-h-[600px] overflow-hidden group/chassis">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_0%,transparent_70%)] group-hover/chassis:bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)] transition-colors duration-1000"></div>
          
          {/* Scanning Line Animation */}
          <AnimatePresence>
            {isScanning && (
                <motion.div 
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent z-20 shadow-[0_0_20px_rgba(245,158,11,0.8)]"
                >
                   <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-amber-500/10 to-transparent -translate-y-full"></div>
                </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full max-w-[320px] aspect-[1/2.1] bg-slate-900/30 rounded-[4.5rem] border-[3px] border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-inner group/tablet transition-all duration-700 hover:border-white/10">
            <div className="absolute inset-0 flex flex-col justify-between p-14 pt-20 pb-20">
              <div className="w-full h-1/5 border-b border-dashed border-white/10 flex justify-center items-start">
                 <span className="text-[10px] text-slate-700 uppercase font-black tracking-[0.4em] mt-2 group-hover/tablet:text-slate-500 transition-colors">Neural_Front</span>
              </div>
              
              <div className="w-full h-3/5 flex justify-between relative py-12">
                {/* Visual Chassis Glow */}
                <div className="absolute inset-0 bg-amber-500/5 blur-[50px] rounded-full group-hover/tablet:bg-amber-500/10 transition-colors"></div>
                
                <div className="h-full w-4 flex flex-col justify-center gap-24 z-10 relative">
                   <motion.button 
                     whileHover={{ scale: 1.1, x: -5 }} 
                     whileTap={{ scale: 0.9 }}
                     className="w-12 h-12 -ml-6 bg-rose-600 ring-8 ring-rose-500/15 rounded-2xl flex items-center justify-center text-white shadow-[0_0_25px_rgba(225,29,72,0.4)]"
                   >
                     <AlertTriangle className="w-5 h-5" />
                   </motion.button>
                   <motion.button 
                     whileHover={{ scale: 1.1, x: -5 }} 
                     className="w-12 h-12 -ml-6 bg-slate-800/80 hover:bg-slate-700 rounded-2xl border border-white/10 flex items-center justify-center text-slate-400 backdrop-blur-xl"
                   >
                     <MapPin className="w-5 h-5 shadow-inner" />
                   </motion.button>
                </div>
                
                <div className="h-full w-4 flex flex-col justify-center gap-24 z-10 relative">
                   <motion.button 
                     whileHover={{ scale: 1.1, x: 5 }} 
                     className="w-12 h-12 ml-2 bg-emerald-500 rounded-2xl ring-8 ring-emerald-500/15 flex items-center justify-center text-white shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                   >
                     <CheckCircle className="w-5 h-5" />
                   </motion.button>
                   <motion.button 
                     whileHover={{ scale: 1.1, x: 5 }} 
                     className="w-12 h-12 ml-2 bg-slate-800/80 hover:bg-slate-700 rounded-2xl border border-white/10 flex items-center justify-center text-slate-400 backdrop-blur-xl"
                   >
                     <MapPin className="w-5 h-5" />
                   </motion.button>
                </div>
              </div>
              
              <div className="w-full h-1/5 border-t border-dashed border-white/10 flex justify-center items-end">
                <span className="text-[10px] text-slate-700 uppercase font-black tracking-[0.4em] mb-2 group-hover/tablet:text-slate-500 transition-colors">Neural_Rear</span>
              </div>
            </div>

            {/* Scanning Laser Line (Floating within tablet) */}
            <motion.div 
              animate={{ opacity: isScanning ? 0.3 : 0.05 }}
              className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none"
            />
          </div>
        </section>

        {/* 입력 폼 섹션 & Diagnostic Terminal (Phase 14 New) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-12">
          <div className="space-y-10">
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-[#141417] rounded-[2.5rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden group/input"
            >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/input:opacity-10 transition-opacity">
                   <Activity size={80} />
                </div>
                
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-black italic text-2xl uppercase text-white flex gap-4 items-center">
                        <div className="w-2 h-10 bg-amber-500 rounded-full"></div>
                        Paint Thickness
                    </h3>
                    <div className="px-5 py-2 bg-black/40 rounded-full border border-white/5">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">FL Fender Area</span>
                    </div>
                </div>
                
                <div className="flex gap-6">
                <div className="relative flex-1">
                    <input 
                        type="number" 
                        className="bg-black/40 border border-white/10 rounded-3xl p-8 text-6xl font-black italic tracking-tighter text-white w-full focus:outline-none focus:border-amber-500/50 transition-all shadow-inner"
                        defaultValue={115}
                    />
                    <span className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-700 font-black italic text-2xl uppercase tracking-tighter">Microns</span>
                </div>
                <button className="bg-amber-500 text-black p-8 rounded-3xl hover:bg-amber-400 transition-all flex items-center justify-center shadow-lg shadow-amber-500/10 active:scale-95">
                    <Camera className="w-10 h-10" />
                </button>
                </div>
                <div className="mt-8 flex items-center gap-4 p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                    <Info size={18} className="text-blue-500" />
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-relaxed">
                        Reference Range: 100 - 130 μm. <br/>
                        <span className="text-emerald-500/80">Calibration Verified for Carbon Fiber surface.</span>
                    </p>
                </div>
            </motion.div>

            {/* Neural Diagnostic Terminal (Phase 14 New) */}
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="bg-[#050505] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[380px]"
            >
               <div className="bg-[#141417] px-8 py-5 border-b border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <Terminal size={14} className="text-blue-400" />
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Stream Terminal</span>
                  </div>
                  <div className="flex gap-1.5 font-mono text-[8px] text-slate-600">
                     <span>51.2 KB/s</span>
                     <span className="text-emerald-500">LISTENING</span>
                  </div>
               </div>
               <div ref={terminalRef} className="flex-1 p-8 font-mono text-[10px] overflow-y-auto space-y-2.5 custom-scrollbar">
                  {logs.map(log => (
                    <div key={log.id} className="flex gap-4 group">
                       <span className="text-slate-700 shrink-0">[{log.timestamp}]</span>
                       <span className={`${
                         log.type === 'error' ? 'text-rose-500' : 
                         log.type === 'warn' ? 'text-amber-500' : 
                         log.type === 'raw' ? 'text-slate-500' : 'text-blue-400'
                       } break-all`}>
                          {log.message}
                       </span>
                    </div>
                  ))}
               </div>
               <div className="bg-black/50 px-8 py-4 border-t border-white/5 flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em]">Core_Link_Established_0x77AF</span>
               </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-rose-950/5 rounded-[3.5rem] p-10 border border-rose-500/10 shadow-2xl relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute -right-10 -bottom-10 opacity-5">
                <AlertTriangle size={240} className="text-rose-500" />
            </div>
            
            <div className="flex justify-between items-center mb-10 relative z-10">
               <h3 className="font-black italic text-2xl uppercase text-rose-500 flex gap-4 items-center">
                 <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                    <AlertTriangle className="w-6 h-6" />
                 </div>
                 Structural Defects
               </h3>
               <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <div className="w-2 h-2 rounded-full bg-rose-500/20"></div>
                  <div className="w-2 h-2 rounded-full bg-rose-500/20"></div>
               </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-10 relative z-10">
              {['Deep Scratch', 'Frame Dent', 'Hail Damage', 'Repainted', 'Oxidation'].map(tag => (
                <button key={tag} className="px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-slate-950 transition-all active:scale-95">
                    {tag}
                </button>
              ))}
            </div>
            
            <textarea 
              className="flex-1 w-full bg-black/40 border border-white/5 rounded-[2.5rem] p-8 text-sm text-slate-300 focus:outline-none focus:border-rose-500/40 resize-none font-medium relative z-10 transition-all shadow-inner leading-relaxed mb-8"
              placeholder="System awaiting specific defect matrix data input..."
              defaultValue="Front bumper lower lip scratch detected. Surface deformation minimal. Professional resurfacing and polishing procedure recommended to restore aerodynamic integrity."
            ></textarea>

            <button className="w-full py-6 bg-rose-600/10 border border-rose-500/30 text-rose-500 font-black uppercase tracking-widest text-[10px] rounded-3xl hover:bg-rose-600 hover:text-white transition-all">
                Mark Area for Correction
            </button>
          </motion.div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
}

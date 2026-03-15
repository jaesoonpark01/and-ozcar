import { useEffect, useState } from "react";
import { Search, MapPin, AlertTriangle, CheckCircle, Save, Camera, Car, RefreshCw, Smartphone, Cpu, ShieldCheck, Box, Info } from "lucide-react";
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

export default function FastInspectionUI() {
  const [activeSegment, setActiveSegment] = useState("exterior");
  const [inspectionData, setInspectionData] = useState<InspectionData>({
    rpm: 0,
    voltage: 12.6,
    soh: 98,
    coolant_temp: 85,
    is_critical: false,
    obd_status: 'online'
  });

  // Real-time Data Sync Simulation
  useEffect(() => {
    const interval = setInterval(() => {
        setInspectionData(prev => ({
            ...prev,
            rpm: prev.obd_status === 'online' ? Math.floor(Math.random() * 800) + 700 : 0,
            voltage: 13.2 + (Math.random() * 0.4),
        }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0f1115] min-h-screen text-slate-200 flex flex-col md:flex-row font-sans selection:bg-amber-500/30">
      
      {/* Sidebar / 차량 요약 정보 */}
      <aside className="w-full md:w-96 bg-[#141417] p-8 border-r border-slate-800/50 flex flex-col h-auto md:h-screen sticky top-0 z-20 shadow-2xl">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-500 rounded-lg text-slate-950">
              <RefreshCw className="w-5 h-5 animate-spin-slow" />
            </div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Oz-Inspect <span className="text-amber-500">PRO</span></h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-[10px] text-emerald-500/80 font-black uppercase tracking-[0.2em]">
                Neural Link: Established
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-black rounded-[2rem] p-6 border border-white/5 mb-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Car size={80} className="rotate-12" />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-black italic text-white leading-none mb-1">14가 3928</h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tesla Model 3 LR (2022)</p>
                </div>
                <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-amber-500">
                    <Smartphone className="w-5 h-5" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">oz-Index</p>
                    <p className="text-xl font-black italic text-amber-500">92 <span className="text-[10px] text-slate-500 not-italic">pts</span></p>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">SOH</p>
                    <p className="text-xl font-black italic text-emerald-400">{inspectionData.soh}%</p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">Hardware Auth</span>
                    <span className="text-white flex items-center gap-1"><ShieldCheck size={12} className="text-blue-400" /> SECURE</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-full"></div>
                </div>
            </div>
          </div>
        </div>

        {/* 카테고리 네비게이션 */}
        <nav className="space-y-3 flex-grow py-4">
          {[
            { id: 'exterior', label: 'Exterior', icon: <Car size={16} /> },
            { id: 'undercarriage', label: 'Underbody', icon: <Box size={16} /> },
            { id: 'interior', label: 'Interior', icon: <Smartphone size={16} /> },
            { id: 'battery/engine', label: 'Neural/Battery', icon: <Cpu size={16} /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSegment(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeSegment === item.id 
                  ? "bg-amber-500 text-black shadow-[0_10px_20px_rgba(245,158,11,0.3)] scale-105" 
                  : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="mt-8 bg-white text-black font-black uppercase tracking-widest text-[10px] py-5 rounded-2xl shadow-2xl transition-all active:scale-95 flex justify-center items-center gap-2 hover:bg-amber-50">
          <Save className="w-4 h-4" />
          Finalise Inspection
        </button>
      </aside>

      {/* Main Content / 검수 입력 패널 */}
      <main className="flex-1 p-8 md:p-16 bg-[#0a0a0b] overflow-y-auto relative">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/5 blur-[120px] pointer-events-none"></div>
        
        <header className="flex justify-between items-end mb-12 relative z-10">
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none mb-4">
                {activeSegment.split('/')[0]} <span className="text-amber-500">Analysis</span>
            </h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                <MapPin size={12} className="text-amber-500" /> Selective point scan active for tablet view
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl border border-white/5 transition-all">
                <Search className="w-5 h-5" />
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl border border-white/5 transition-all">
                <Camera className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* 차량 이미지 매핑 UI */}
        <section className="bg-gradient-to-b from-[#141417] to-transparent rounded-[3rem] p-12 border border-white/5 flex justify-center items-center mb-12 relative shadow-2xl min-h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]"></div>
          
          <div className="w-full max-w-sm aspect-[1/2.2] bg-slate-900/50 rounded-[4rem] border-2 border-white/10 relative overflow-hidden backdrop-blur-3xl shadow-inner">
            <div className="absolute inset-0 flex flex-col justify-between p-12">
              <div className="w-full h-1/5 border-b border-dashed border-white/10 flex justify-center items-start">
                 <span className="text-[10px] text-slate-700 uppercase font-black tracking-[0.3em] mt-8">Front Module</span>
              </div>
              <div className="w-full h-3/5 flex justify-between relative">
                {/* Visual Chassis Glow */}
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full"></div>
                
                <div className="h-full w-4 flex flex-col justify-center gap-20 z-10">
                   <motion.button whileHover={{ scale: 1.2 }} className="w-10 h-10 -ml-5 bg-rose-500 ring-8 ring-rose-500/20 rounded-2xl flex items-center justify-center text-white shadow-2xl"><AlertTriangle className="w-5 h-5" /></motion.button>
                   <motion.button whileHover={{ scale: 1.2 }} className="w-10 h-10 -ml-5 bg-slate-800 hover:bg-slate-700 rounded-2xl border border-white/10 flex items-center justify-center text-slate-400 transition-all"><MapPin className="w-5 h-5" /></motion.button>
                </div>
                <div className="h-full w-4 flex flex-col justify-center gap-20 z-10">
                   <motion.button whileHover={{ scale: 1.2 }} className="w-10 h-10 ml-1 bg-emerald-500 rounded-2xl ring-8 ring-emerald-500/20 flex items-center justify-center text-white shadow-2xl"><CheckCircle className="w-5 h-5" /></motion.button>
                   <motion.button whileHover={{ scale: 1.2 }} className="w-10 h-10 ml-1 bg-slate-800 hover:bg-slate-700 rounded-2xl border border-white/10 flex items-center justify-center text-slate-400 transition-all"><MapPin className="w-5 h-5" /></motion.button>
                </div>
              </div>
              <div className="w-full h-1/5 border-t border-dashed border-white/10 flex justify-center items-end">
                <span className="text-[10px] text-slate-700 uppercase font-black tracking-[0.3em] mb-8">Rear Diffuser</span>
              </div>
            </div>
          </div>
        </section>

        {/* 입력 폼 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#121212] rounded-[2.5rem] p-8 border border-white/5 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-black italic text-xl uppercase text-white flex gap-3 items-center">
                    <span className="w-1.5 h-8 bg-amber-500 rounded-full"></span>
                    Paint Thickness
                </h3>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">FL Fender</span>
            </div>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <input 
                    type="number" 
                    placeholder="μm" 
                    className="bg-black/50 border border-white/5 rounded-2xl p-6 text-4xl font-black italic tracking-tighter text-white w-full focus:outline-none focus:border-amber-500/50 transition-all"
                    defaultValue={115}
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-700 font-black italic text-xl">μm</span>
              </div>
              <button className="bg-white/5 p-6 rounded-2xl hover:bg-white/10 border border-white/5 transition-all text-slate-400">
                <Camera className="w-8 h-8" />
              </button>
            </div>
            <div className="mt-6 flex items-center gap-2 p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
                <Info size={14} className="text-blue-400" />
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-loose">
                    Standard range: 100-130 μm. Factory original assumed for this region.
                </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-rose-950/10 rounded-[2.5rem] p-8 border border-rose-500/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10">
                <AlertTriangle size={120} className="text-rose-500" />
            </div>
            
            <h3 className="font-black italic text-xl uppercase text-rose-500 flex gap-3 items-center mb-6">
              <AlertTriangle className="w-6 h-6" />
              Damage Report
            </h3>
            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
              {['Scratch', 'Dent', 'Pained', 'Crack'].map(tag => (
                <button key={tag} className="px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all">
                    {tag}
                </button>
              ))}
            </div>
            <textarea 
              className="w-full bg-black/50 border border-white/5 rounded-2xl p-6 text-sm text-slate-300 h-32 focus:outline-none focus:border-rose-500/50 resize-none font-medium relative z-10"
              placeholder="Add specific notes about the damage..."
              defaultValue="Front bumper lower lip scratch detected. Requires professional polishing."
            ></textarea>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

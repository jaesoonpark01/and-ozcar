"use client";

import { useState, useRef, useEffect } from "react";
import HyperTaskBar from "@/components/inspection/HyperTaskBar";
import { Check, X, AlertCircle } from "react-feather";

type InspectionItem = {
  id: string;
  category: string;
  name: string;
  status: "NORMAL" | "DEFECT" | "REPAIR";
};

const INITIAL_ITEMS: InspectionItem[] = [
  // ?”ì§„ë£?  { id: "e1", category: "engine", name: "?”ì§„ ?¤ì¼ ?ˆë²¨ ë°??íƒœ", status: "NORMAL" },
  { id: "e2", category: "engine", name: "?‰ê°???„ìˆ˜ ?¬ë?", status: "NORMAL" },
  { id: "e3", category: "engine", name: "?œë¼?´ë¸Œ ë²¨íŠ¸ ?¥ë ¥", status: "NORMAL" },
  // ?„ë©´/?¸ê?
  { id: "f1", category: "front", name: "?¤ë“œ?¨í”„/?ˆê°œ???ë“±", status: "NORMAL" },
  { id: "f2", category: "front", name: "?ˆë“œ?¤ë“œ ?¤í¬?˜ì¹˜", status: "NORMAL" },
  { id: "f3", category: "front", name: "?„ë¡ ??ë²”í¼ ?ìƒ", status: "NORMAL" },
  // ?˜ì²´(ë¦¬í”„??
  { id: "u1", category: "under", name: "?”ì§„/ë¯¸ì…˜ ?˜ë‹¨ ?„ìœ ", status: "NORMAL" },
  { id: "u2", category: "under", name: "?œìŠ¤?œì…˜ ë¶€??ë§ˆëª¨", status: "NORMAL" },
  { id: "u3", category: "under", name: "ë¸Œë ˆ?´í¬ ?¨ë“œ ?”ëŸ‰", status: "NORMAL" },
];

export default function InspectionPage() {
  const [activeCategory, setActiveCategory] = useState("engine");
  const [items, setItems] = useState<InspectionItem[]>(INITIAL_ITEMS);
  const [markers, setMarkers] = useState<{ x: number; y: number }[]>([]);

  // ?œë??ˆì´????- Delta Sync (?˜ì •????ª©ë§??„ì†¡)
  const handleSaveDelta = async () => {
    const defects = items.filter((item) => item.status !== "NORMAL");
    console.log("?? [Delta Sync] Sending only changed items ->", defects);
    
    // In a real app, this would call Supabase RPC: upsert_inspection_delta
    // const { data, error } = await supabase.rpc('upsert_inspection_delta', { ... })
    alert(`?™ê¸°???„ë£Œ! ${defects.length}ê°œì˜ ?˜ì •???°ì´?°ë§Œ ?„ì†¡?˜ì—ˆ?µë‹ˆ??`);
  };

  const setItemStatus = (id: string, status: "NORMAL" | "DEFECT" | "REPAIR") => {
    setItems(items.map((it) => (it.id === id ? { ...it, status } : it)));
  };

  const handlePunchIn = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMarkers([...markers, { x, y }]);
  };

  return (
    <div className="flex bg-[#050505] min-h-screen text-slate-200 pl-24 font-sans">
      <HyperTaskBar activeCategory={activeCategory} />

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-black text-white">20-Min Cut Inspection</h1>
            <p className="text-sm text-slate-500 mt-2 font-mono">VIN: KNA2394019230 ??2026 Santa Fe</p>
          </div>
          <button 
            onClick={handleSaveDelta}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold text-white shadow-lg shadow-blue-500/20 transition-all font-mono"
          >
            ?ê? ?„ë£Œ (Delta Sync)
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ì¢Œì¸¡: ê²€????ª© ë¦¬ìŠ¤??(All-Normal Default) */}
          <div className="space-y-12 h-[calc(100vh-200px)] overflow-y-auto pr-4 scrollbar-hide">
            {["engine", "front", "under"].map((catId) => (
              <section 
                key={catId} 
                id={catId} 
                className="scroll-mt-20"
                onMouseEnter={() => setActiveCategory(catId)}
              >
                <h2 className="text-xl font-bold mb-6 text-white uppercase tracking-widest bg-slate-900/50 p-3 rounded-lg border-l-4 border-blue-500">
                  {catId} Check
                </h2>
                <div className="space-y-3">
                  {items.filter(it => it.category === catId).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-[#121417] rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                      <span className="font-medium text-lg">{item.name}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setItemStatus(item.id, "NORMAL")}
                          className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 ${item.status === "NORMAL" ? "bg-green-600 text-white" : "bg-slate-800 text-slate-400"}`}
                        >
                          <Check size={16} /> ?‘í˜¸
                        </button>
                        <button 
                          onClick={() => setItemStatus(item.id, "DEFECT")}
                          className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 ${item.status === "DEFECT" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-400"}`}
                        >
                          <X size={16} /> ë¶ˆëŸ‰
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* ?°ì¸¡: Visual Punch-In (3D ëª¨í‚¹) */}
          <div className="sticky top-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-amber-500" />
              Visual Punch-In Tracker
            </h3>
            <p className="text-xs text-slate-400 mb-6">ì°¨ëŸ‰ ê²°í•¨ ë¶€?„ë? ?°ì¹˜?˜ì—¬ ì§ê??ìœ¼ë¡??íƒœë¥?ë§µí•‘?˜ì„¸??</p>
            
            <div 
              onClick={handlePunchIn}
              className="relative w-full aspect-video bg-gradient-to-tr from-slate-900 to-black rounded-2xl border border-slate-800 overflow-hidden cursor-crosshair shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0bf2?auto=format&fit=crop&q=80&w=1200" 
                alt="Car Wireframe Mock" 
                className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-blue-500/10 hover:bg-blue-500/20 transition-colors pointer-events-none" />
              
              {/* Markers */}
              {markers.map((m, i) => (
                <div 
                  key={i} 
                  className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(239,68,68,0.8)] -translate-x-1/2 -translate-y-1/2 animate-bounce cursor-pointer z-10"
                  style={{ left: m.x, top: m.y }}
                  title="Defect logged"
                />
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-900/10 border border-blue-500/20 rounded-xl">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">Live Sync Status</span>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-bold">OBD-II Telemetry</span>
                <span className="text-green-400 text-sm font-bold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Connected
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

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
  // 엔진룸
  { id: "e1", category: "engine", name: "엔진 오일 레벨 및 상태", status: "NORMAL" },
  { id: "e2", category: "engine", name: "냉각수 누수 여부", status: "NORMAL" },
  { id: "e3", category: "engine", name: "드라이브 벨트 장력", status: "NORMAL" },
  // 전면/외관
  { id: "f1", category: "front", name: "헤드램프/안개등 점등", status: "NORMAL" },
  { id: "f2", category: "front", name: "윈드실드 스크래치", status: "NORMAL" },
  { id: "f3", category: "front", name: "프론트 범퍼 손상", status: "NORMAL" },
  // 하체(리프트)
  { id: "u1", category: "under", name: "엔진/미션 하단 누유", status: "NORMAL" },
  { id: "u2", category: "under", name: "서스펜션 부싱 마모", status: "NORMAL" },
  { id: "u3", category: "under", name: "브레이크 패드 잔량", status: "NORMAL" },
];

export default function InspectionPage() {
  const [activeCategory, setActiveCategory] = useState("engine");
  const [items, setItems] = useState<InspectionItem[]>(INITIAL_ITEMS);
  const [markers, setMarkers] = useState<{ x: number; y: number }[]>([]);

  // 시뮬레이션 용 - Delta Sync (수정된 항목만 전송)
  const handleSaveDelta = async () => {
    const defects = items.filter((item) => item.status !== "NORMAL");
    console.log("🚀 [Delta Sync] Sending only changed items ->", defects);
    
    // In a real app, this would call Supabase RPC: upsert_inspection_delta
    // const { data, error } = await supabase.rpc('upsert_inspection_delta', { ... })
    alert(`동기화 완료! ${defects.length}개의 수정된 데이터만 전송되었습니다.`);
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
            <p className="text-sm text-slate-500 mt-2 font-mono">VIN: KNA2394019230 • 2026 Santa Fe</p>
          </div>
          <button 
            onClick={handleSaveDelta}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold text-white shadow-lg shadow-blue-500/20 transition-all font-mono"
          >
            점검 완료 (Delta Sync)
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 좌측: 검사 항목 리스트 (All-Normal Default) */}
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
                          <Check size={16} /> 양호
                        </button>
                        <button 
                          onClick={() => setItemStatus(item.id, "DEFECT")}
                          className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 ${item.status === "DEFECT" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-400"}`}
                        >
                          <X size={16} /> 불량
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* 우측: Visual Punch-In (3D 모킹) */}
          <div className="sticky top-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-amber-500" />
              Visual Punch-In Tracker
            </h3>
            <p className="text-xs text-slate-400 mb-6">차량 결함 부위를 터치하여 직관적으로 상태를 맵핑하세요.</p>
            
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

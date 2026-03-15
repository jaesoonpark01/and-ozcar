"use client";

import { useState } from "react";
import { Search, MapPin, AlertTriangle, CheckCircle, Save, Camera, Car } from "lucide-react";

export default function FastInspectionUI() {
  const [activeSegment, setActiveSegment] = useState("exterior");

  return (
    <div className="bg-[#0f1115] min-h-screen text-slate-200 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar / 차량 요약 정보 */}
      <aside className="w-full md:w-80 bg-[#141417] p-6 border-r border-slate-800 flex flex-col h-auto md:h-screen sticky top-0">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-2">Pro-Check</h2>
          <p className="text-xs text-amber-500 bg-amber-500/10 px-2 py-1 inline-block rounded font-bold uppercase tracking-widest border border-amber-500/20">
            Tablet Optimization Mode
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 mb-6 shadow-inner">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-bold text-white">14가 3928</p>
              <p className="text-xs text-slate-400">Tesla Model 3 LR (2022)</p>
            </div>
            <div className="bg-slate-800 p-2 rounded text-slate-300">
              <Car className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-400 border-b border-slate-800 pb-1">
              <span>OBD-II Data Sync</span>
              <span className="text-emerald-400 font-medium">100% Complete</span>
            </div>
            <div className="flex justify-between text-slate-400 pb-1">
              <span>Current oz-Index</span>
              <span className="text-amber-500 font-bold font-mono">92</span>
            </div>
          </div>
        </div>

        {/* 카테고리 네비게이션 */}
        <nav className="space-y-2 flex-grow">
          {['exterior', 'undercarriage', 'interior', 'battery/engine'].map((seg) => (
            <button
              key={seg}
              onClick={() => setActiveSegment(seg)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeSegment === seg 
                  ? "bg-amber-500 text-slate-950 shadow-md" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <span className="uppercase tracking-wider">{seg.replace('/', ' & ')}</span>
            </button>
          ))}
        </nav>

        <button className="mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex justify-center items-center gap-2">
          <Save className="w-5 h-5" />
          Complete Inspection
        </button>
      </aside>

      {/* Main Content / 검수 입력 패널 */}
      <main className="flex-1 p-6 md:p-10 bg-[#0a0a0b] overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Exterior Check</h1>
            <p className="text-sm text-slate-400 mt-1">외관 상태 및 도막 두께 측정</p>
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-3 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </header>

        {/* 차량 이미지 매핑 UI */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 flex justify-center items-center mb-8 relative shadow-2xl min-h-[400px]">
          {/* 가상의 차량 탑다운 뷰 */}
          <div className="w-full max-w-lg aspect-[1/2] rounded-full border-4 border-slate-800/50 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="w-full h-1/4 border-b-2 border-dashed border-slate-700/50 flex justify-center items-start">
                 <span className="text-xs text-slate-600 uppercase font-black tracking-widest mt-4">Front</span>
              </div>
              <div className="w-full h-1/2 flex justify-between">
                <div className="h-full w-4 flex flex-col justify-center gap-12">
                   {/* 좌측 핀들 */}
                   <button className="w-8 h-8 -ml-4 bg-rose-500 ring-4 ring-rose-500/20 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse"><AlertTriangle className="w-4 h-4" /></button>
                   <button className="w-8 h-8 -ml-4 bg-slate-700 hover:bg-slate-600 rounded-full border border-slate-500 flex items-center justify-center text-slate-300 transition-colors"><MapPin className="w-4 h-4" /></button>
                </div>
                <div className="h-full w-4 flex flex-col justify-center gap-12">
                   {/* 우측 핀들 */}
                   <button className="w-8 h-8 ml-4 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg"><CheckCircle className="w-4 h-4" /></button>
                   <button className="w-8 h-8 ml-4 bg-slate-700 hover:bg-slate-600 rounded-full border border-slate-500 flex items-center justify-center text-slate-300 transition-colors"><MapPin className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="w-full h-1/4 border-t-2 border-dashed border-slate-700/50 flex justify-center items-end">
                <span className="text-xs text-slate-600 uppercase font-black tracking-widest mb-4">Rear</span>
              </div>
            </div>
          </div>
        </div>

        {/* 입력 폼 바텀 시트 (태블릿용) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg">
            <h3 className="font-bold text-lg mb-4 text-white flex gap-2 items-center">
              <span className="w-2 h-6 bg-amber-500 rounded-full"></span>
              Paint Thickness (Front-Left Fender)
            </h3>
            <div className="flex gap-4">
              <input 
                type="number" 
                placeholder="μm" 
                className="bg-[#0a0a0b] border border-slate-700 rounded-xl p-4 text-2xl font-mono text-white w-full focus:outline-none focus:border-amber-500"
                defaultValue={115}
              />
              <button className="bg-slate-800 p-4 rounded-xl hover:bg-slate-700 transition-colors">
                <Camera className="w-6 h-6 text-slate-300" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-3 font-medium">Standard range: 100-130 μm. Factory original assumed.</p>
          </div>

          <div className="bg-rose-950/20 rounded-2xl p-6 border border-rose-900/50 shadow-lg">
             <h3 className="font-bold text-lg mb-4 text-rose-400 flex gap-2 items-center">
              <AlertTriangle className="w-5 h-5" />
              Damage Report (Front Bumper)
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="bg-rose-900/40 text-rose-300 border border-rose-700 px-3 py-1.5 rounded-lg text-sm font-medium">Scratch (Deep)</button>
              <button className="bg-slate-800 text-slate-400 border border-slate-700 px-3 py-1.5 rounded-lg text-sm hover:bg-slate-700 transition-colors">Dent</button>
              <button className="bg-slate-800 text-slate-400 border border-slate-700 px-3 py-1.5 rounded-lg text-sm hover:bg-slate-700 transition-colors">Repainted</button>
            </div>
            <textarea 
              className="w-full bg-[#0a0a0b] border border-slate-800 rounded-xl p-4 text-sm text-slate-300 h-24 focus:outline-none focus:border-rose-500 resize-none"
              placeholder="Add specific notes about the damage..."
              defaultValue="하단 립 부분 긁힘 15cm 발생. 컴파운드로 해결 불가능한 도장 파임."
            ></textarea>
          </div>
        </div>

      </main>
    </div>
  );
}

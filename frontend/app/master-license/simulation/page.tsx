"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Clock, Target, CheckCircle, XCircle } from "react-feather";

type DefectArea = {
  id: string;
  name: string;
  hasDefect: boolean;
  actualDefectType?: string;
  userGuessed: boolean;
  userDefectType?: string;
};

// 시뮬레이션용 데이터
const INITIAL_AREAS: DefectArea[] = [
  { id: "front_bumper", name: "프론트 범퍼", hasDefect: true, actualDefectType: "파손", userGuessed: false },
  { id: "engine_block", name: "엔진 블록", hasDefect: false, userGuessed: false },
  { id: "tire_fl", name: "운전석 앞 타이어", hasDefect: true, actualDefectType: "마모", userGuessed: false },
  { id: "windshield", name: "전면 유리", hasDefect: false, userGuessed: false },
  { id: "rear_door_r", name: "조수석 뒷문", hasDefect: true, actualDefectType: "판금", userGuessed: false },
];

const DEFECT_TYPES = ["스크래치", "파손", "마모", "누유/누수", "판금", "교환"];

export default function SimulationTrainingPage() {
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [areas, setAreas] = useState<DefectArea[]>(INITIAL_AREAS);
  const [selectedArea, setSelectedArea] = useState<DefectArea | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success', msg: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0 || isFinished) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleGuessDefect = (defectType: string) => {
    if (!selectedArea) return;

    if (!selectedArea.hasDefect) {
      setFeedback({ type: 'error', msg: `오답입니다: ${selectedArea.name} 부위는 정상입니다! (감점 5점)` });
    } else if (selectedArea.actualDefectType !== defectType) {
      setFeedback({ type: 'error', msg: `오답입니다: ${selectedArea.name} 부위는 '${defectType}'가 아닙니다! (감점 2점)` });
    } else {
      setFeedback({ type: 'success', msg: `정답입니다! ${selectedArea.name} - ${defectType} 발견` });
    }

    setAreas(areas.map(a => a.id === selectedArea.id ? { ...a, userGuessed: true, userDefectType: defectType } : a));
    setTimeout(() => {
      setFeedback(null);
      setSelectedArea(null);
    }, 2000);
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  if (isFinished) {
    const correctGuesses = areas.filter(a => a.hasDefect && a.actualDefectType === a.userDefectType).length;
    const totalDefects = areas.filter(a => a.hasDefect).length;
    const falseAlarms = areas.filter(a => !a.hasDefect && a.userGuessed).length;
    const accuracy = Math.max(0, Math.round(((correctGuesses - falseAlarms * 0.5) / totalDefects) * 100));

    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="bg-[#121417] p-10 rounded-3xl border border-white/10 max-w-lg w-full text-center shadow-2xl">
          <Target className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h1 className="text-3xl font-black tracking-tight mb-2">훈련 종료</h1>
          <p className="text-slate-400 mb-8">Virtual Inspection Lab 결과 리포트</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8 text-left">
            <div className="p-4 bg-black/40 rounded-xl border border-white/5">
              <p className="text-xs text-slate-500 mb-1">정확도 (Accuracy)</p>
              <p className={`text-3xl font-black ${accuracy >= 90 ? 'text-green-500' : 'text-amber-500'}`}>{accuracy}%</p>
            </div>
            <div className="p-4 bg-black/40 rounded-xl border border-white/5">
              <p className="text-xs text-slate-500 mb-1">소요 시간</p>
              <p className="text-3xl font-black text-white">{formatTime(1200 - timeLeft)}</p>
            </div>
          </div>

          <div className="text-left mb-8 space-y-2">
            <p className="text-sm font-bold border-b border-white/10 pb-2 mb-4">발견 내역</p>
            {areas.filter(a => a.hasDefect).map(a => (
              <div key={a.id} className="flex justify-between items-center text-sm">
                <span>{a.name}</span>
                {a.actualDefectType === a.userDefectType ? (
                  <span className="text-green-400 flex items-center gap-1"><CheckCircle size={14} /> {a.actualDefectType}</span>
                ) : (
                  <span className="text-red-400 flex items-center gap-1"><XCircle size={14} /> 미발견 (실제: {a.actualDefectType})</span>
                )}
              </div>
            ))}
          </div>

          <button onClick={() => window.location.reload()} className="w-full py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 transition-colors">
            시뮬레이션 재시작
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <header className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black">X-Ray Training Simulator</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Scenario #A72-EV</p>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center">
            <p className="text-[10px] text-slate-500 uppercase">Time Remaining</p>
            <div className="flex items-center gap-2 text-2xl font-black font-mono mt-1">
              <Clock className="text-blue-500" size={24} />
              <span className={timeLeft < 300 ? "text-red-500 animate-pulse" : ""}>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <button onClick={handleFinish} className="px-6 py-3 bg-white text-black font-bold rounded-xl active:scale-95 transition-transform">
            제출 및 채점
          </button>
        </div>
      </header>

      {/* Smart Feedback Alert (Haptic/Visual Alert) */}
      {feedback && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 ${feedback.type === 'error' ? 'bg-red-600 border border-red-500' : 'bg-green-600 border border-green-500'}`}>
          <AlertTriangle size={20} />
          <span className="font-bold">{feedback.msg}</span>
        </div>
      )}

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Virtual X-Ray Scanner Mockup */}
        <div className="lg:col-span-2 relative aspect-[4/3] bg-gradient-to-b from-slate-900 to-black rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center p-8">
          {/* Wireframe Car Graphic Placeholder */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0bf2?auto=format&fit=crop&q=80&w=1200')] bg-cover mix-blend-screen" />
          
          <div className="relative z-10 grid grid-cols-2 gap-4 w-full h-full max-w-lg">
            {areas.map(area => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area)}
                className={`p-4 rounded-xl border flex flex-col justify-center items-center gap-2 transition-all ${
                  area.userGuessed 
                    ? area.userDefectType === area.actualDefectType ? "bg-green-500/20 border-green-500/50 text-green-400" : "bg-red-500/20 border-red-500/50 text-red-400"
                    : selectedArea?.id === area.id ? "bg-blue-600 border-blue-400 text-white" : "bg-black/60 border-white/10 hover:border-blue-500/50"
                }`}
              >
                <span className="font-bold text-lg">{area.name}</span>
                {area.userGuessed && (
                  <span className="text-xs px-2 py-1 bg-black/50 rounded-full">{area.userDefectType ? area.userDefectType : "정상 판정"}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Inspection Tool Menu */}
        <div className="bg-[#121417] p-6 rounded-3xl border border-white/5">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
            <Target className="text-blue-500" /> Diagnosis Tools
          </h2>
          
          {selectedArea ? (
            <div className="animate-in fade-in slide-in-from-right-4">
              <p className="text-sm text-slate-400 mb-2">선택된 부위:</p>
              <p className="text-2xl font-black mb-8 text-blue-400">{selectedArea.name}</p>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleGuessDefect("정상")}
                  className="col-span-2 py-3 bg-green-600/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-600/40 font-bold mb-4"
                >
                  양호 (No Defect)
                </button>
                
                {DEFECT_TYPES.map(type => (
                  <button 
                    key={type}
                    onClick={() => handleGuessDefect(type)}
                    className="py-3 bg-slate-800 text-slate-200 rounded-lg hover:bg-blue-600/40 hover:text-white transition-colors text-sm font-bold"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 pt-20">
              <div className="w-16 h-16 border-2 border-dashed border-slate-600 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle size={24} />
              </div>
              <p className="text-sm text-center">X-Ray 스캐너에서 점검할<br/>부위를 선택해주세요.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { Box, Layers, MousePointer2, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function DigitalTwinViewer() {
    const [selectedModule, setSelectedModule] = useState<string | null>(null);

    const modules = [
        { id: 'bms', name: 'Battery Management System', x: '50%', y: '60%', status: 'Healthy', log: 'Voltage stability 99.8%' },
        { id: 'adas', name: 'Vision Processing Unit', x: '75%', y: '25%', status: 'Warning', log: 'Calibration offset detected in L-Camera' },
        { id: 'powertrain', name: 'Electric Motor Controller', x: '30%', y: '35%', status: 'Healthy', log: 'Temp: 65°C, Efficiency: 94%' },
        { id: 'steering', name: 'Electronic Steering', x: '15%', y: '70%', status: 'Critical', log: 'Error C1260: Torque sensor fault' },
    ];

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mt-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black flex items-center gap-2">
                    <Box className="w-5 h-5 text-blue-600" />
                    Digital Twin 시각화 (3D Model)
                </h3>
                <div className="flex gap-2">
                    <button className="p-2 bg-slate-50 rounded-lg"><Layers className="w-4 h-4 text-slate-400" /></button>
                    <button className="p-2 bg-slate-50 rounded-lg"><MousePointer2 className="w-4 h-4 text-slate-400" /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visualizer Area */}
                <div className="lg:col-span-2 relative aspect-video bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center">
                    {/* Mock 3D Vehicle Base (SVG) */}
                    <svg viewBox="0 0 400 200" className="w-full max-w-md drop-shadow-2xl">
                        <path
                            d="M50 140 L50 100 Q50 60 100 50 L300 50 Q350 60 350 100 L350 140 Z"
                            fill="#E2E8F0"
                            stroke="#CBD5E1"
                            strokeWidth="2"
                        />
                        <rect x="70" y="140" width="40" height="20" rx="4" fill="#64748B" />
                        <rect x="290" y="140" width="40" height="20" rx="4" fill="#64748B" />
                        <path d="M100 60 L150 60 L140 100 L90 100 Z" fill="white" opacity="0.5" />
                        <path d="M250 60 L300 60 L310 100 L260 100 Z" fill="white" opacity="0.5" />

                        {/* Interactive Nodes */}
                        {modules.map((m) => (
                            <circle
                                key={m.id}
                                cx={m.x}
                                cy={m.y}
                                r="8"
                                className={`cursor-pointer transition-all duration-300 ${selectedModule === m.id ? 'r-12 fill-blue-600' :
                                        m.status === 'Critical' ? 'fill-red-500 animate-ping' :
                                            m.status === 'Warning' ? 'fill-orange-400' : 'fill-green-500'
                                    }`}
                                onClick={() => setSelectedModule(m.id)}
                            />
                        ))}
                    </svg>

                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span> 정상
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                            <span className="w-2 h-2 bg-orange-400 rounded-full"></span> 주의
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span> 고장/오류
                        </div>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-slate-200 text-[10px] font-bold text-slate-500">
                        View: Isometric Wireframe
                    </div>
                </div>

                {/* Info Panel */}
                <div className="space-y-4">
                    {selectedModule ? (
                        <div className="animate-in fade-in slide-in-from-right duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-slate-800">{modules.find(m => m.id === selectedModule)?.name}</h4>
                                <button onClick={() => setSelectedModule(null)} className="text-xs text-blue-600 hover:underline">닫기</button>
                            </div>
                            <div className={`p-4 rounded-2xl border ${modules.find(m => m.id === selectedModule)?.status === 'Critical' ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'
                                }`}>
                                <div className="flex items-center gap-2 mb-2">
                                    {modules.find(m => m.id === selectedModule)?.status === 'Healthy' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                                    <span className={`text-xs font-bold ${modules.find(m => m.id === selectedModule)?.status === 'Healthy' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        상태: {modules.find(m => m.id === selectedModule)?.status}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 font-mono bg-white/50 p-2 rounded-lg">
                                    {modules.find(m => m.id === selectedModule)?.log}
                                </p>
                                <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">최근 6개월 로그 빈도</div>
                                    <div className="h-12 flex items-end gap-1">
                                        {[20, 45, 10, 80, 50, 60, 40, 90].map((h, i) => (
                                            <div key={i} className="flex-1 bg-blue-100 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <Info className="w-8 h-8 text-slate-300 mb-2" />
                            <p className="text-xs text-slate-400 font-medium">
                                차량 모델의 모듈을 클릭하여<br />상세 로그 및 물리적 위치를 확인하세요.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

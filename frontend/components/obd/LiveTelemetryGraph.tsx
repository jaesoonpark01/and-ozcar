import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { ShieldCheck, AlertOctagon, Activity, Zap } from 'lucide-react';

interface TelemetryPoint {
    ts: string;
    val: number;
    stress?: number;
}

export function LiveTelemetryGraph({ data, securityStatus = 'SECURE' }: { data: TelemetryPoint[], securityStatus?: 'SECURE' | 'TAMPERED' | 'WARNING' }) {
    // 실시간 데이터에서 마지막 스트레스 지수 추출
    const latestStress = data.length > 0 ? (data[data.length - 1].stress || 0) : 0;
    
    return (
        <div className="bg-[#0a0f1e] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl w-full overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
            
            {/* Header Content */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-blue-400">
                        <Activity size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Real-time Telemetry</span>
                    </div>
                    <h3 className="text-2xl font-black italic uppercase italic text-white">Live <span className="text-blue-500">Flux Monitor</span></h3>
                </div>

                <div className="flex gap-4">
                    {/* Stress Index Gauge */}
                    <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 flex flex-col items-center">
                        <span className="text-[9px] font-black text-slate-500 uppercase mb-1">Stress Index</span>
                        <div className="flex items-end gap-1">
                            <span className={`text-2xl font-black italic ${latestStress > 70 ? 'text-red-500' : 'text-[#00ffc2]'}`}>
                                {latestStress.toFixed(1)}
                            </span>
                            <span className="text-[10px] font-bold text-slate-600 mb-1.5">%</span>
                        </div>
                    </div>

                    {/* Security Status Badge */}
                    <div className={`px-6 py-3 rounded-2xl border flex flex-col items-center min-w-[120px] transition-all ${
                        securityStatus === 'SECURE' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                        securityStatus === 'TAMPERED' ? 'bg-red-500/10 border-red-500/20 text-red-500 animate-pulse' :
                        'bg-amber-500/10 border-amber-500/20 text-amber-500'
                    }`}>
                        <span className="text-[9px] font-black opacity-50 uppercase mb-1">Anti-Tamper</span>
                        <div className="flex items-center gap-2">
                            {securityStatus === 'SECURE' ? <ShieldCheck size={16} /> : <AlertOctagon size={16} />}
                            <span className="text-[11px] font-black italic uppercase tracking-widest">{securityStatus}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main Graph Area */}
            <div className="h-[280px] w-full relative z-10">
                {data && data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                            <XAxis dataKey="ts" hide />
                            <YAxis 
                                stroke="#ffffff20" 
                                domain={['auto', 'auto']} 
                                fontSize={10} 
                                fontWeight="bold" 
                                tickFormatter={(val) => val.toFixed(0)}
                            />
                            <Tooltip
                                contentStyle={{ 
                                    backgroundColor: '#0f172a', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    borderRadius: '16px',
                                    backdropFilter: 'blur(10px)',
                                    color: '#fff',
                                    fontSize: '11px',
                                    fontWeight: 'bold'
                                }}
                                itemStyle={{ color: '#60a5fa' }}
                                labelFormatter={() => 'Telemetry Point'}
                            />
                            <Area
                                type="monotone"
                                dataKey="val"
                                stroke="#3b82f6"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorVal)"
                                isAnimationActive={true}
                                animationDuration={1000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex flex-col bg-white/2 rounded-[2rem] h-full items-center justify-center border border-dashed border-white/5">
                        <div className="p-4 bg-white/5 rounded-full mb-4">
                            <Zap className="text-slate-700 w-8 h-8" />
                        </div>
                        <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Awaiting Neural Link...</p>
                    </div>
                )}
            </div>
        </div>
    );
}


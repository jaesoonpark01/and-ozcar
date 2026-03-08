'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export function LiveTelemetryGraph({ data }: { data: any[] }) {
    return (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl h-[300px] w-full">
            <h3 className="text-lg font-bold mb-4 text-white">주행 중 배터리(SoC) 실시간 추이</h3>
            {data && data.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="ts" hide />
                        <YAxis stroke="#94a3b8" domain={['auto', 'auto']} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }}
                            labelFormatter={() => ''}
                        />
                        <Line
                            type="monotone"
                            dataKey="val"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex bg-slate-950/50 rounded-lg h-full items-center justify-center text-slate-500 text-sm">
                    수집된 데이터가 없습니다. 주행을 시작해주세요.
                </div>
            )}
        </div>
    );
}

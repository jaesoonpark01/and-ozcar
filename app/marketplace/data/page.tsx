"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Search, Code, Key, Zap, Shield, Activity } from "lucide-react";

export default function DataDashboardPage() {
    return (
        <div className="min-h-screen bg-[#0a0f1d] text-white pt-28 pb-20 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
                        <Database size={14} />
                        Dynamic Value API (DVA)
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4">
                        API Dashboard
                    </h1>
                    <p className="text-slate-400">
                        발급된 API Key를 관리하고 DVA 실시간 사용량을 모니터링하세요.
                    </p>
                </div>

                {/* API Dashboard Content */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Status & Usage */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                                <Zap size={24} />
                            </div>
                            <div>
                                <div className="text-sm text-slate-400">현재 구독 플랜</div>
                                <div className="font-bold text-lg">B2B Starter</div>
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                                <Activity size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-400">이번 달 API 사용량</span>
                                    <span className="font-bold">12 / 50</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-400" style={{ width: '24%' }} />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                                <Shield size={24} />
                            </div>
                            <div>
                                <div className="text-sm text-slate-400">API 상태</div>
                                <div className="font-bold text-lg text-emerald-400">Active (Healthy)</div>
                            </div>
                        </div>
                    </div>

                    {/* API Keys */}
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Key size={20} className="text-blue-400"/> API Keys</h3>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div>
                                    <div className="font-bold text-sm mb-1">Production Key</div>
                                    <div className="font-mono text-xs text-slate-500">ozk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                                </div>
                                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors">
                                    Reveal Key
                                </button>
                            </div>
                            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div>
                                    <div className="font-bold text-sm mb-1">Test Key</div>
                                    <div className="font-mono text-xs text-slate-500">ozk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                                </div>
                                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors">
                                    Reveal Key
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Code Example */}
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Code size={20} className="text-blue-400"/> Quick Start</h3>
                        <div className="bg-[#050811] p-6 rounded-2xl border border-white/5 font-mono text-sm overflow-x-auto">
                            <div className="text-blue-400 mb-2">{"// curl request example"}</div>
                            <div className="text-emerald-300">curl</div>
                            <div className="pl-4 text-slate-300">-X POST https://api.ozcar.com/v1/vehicle/query \</div>
                            <div className="pl-4 text-slate-300">-H <span className="text-amber-300">"Authorization: Bearer ozk_live_..."</span> \</div>
                            <div className="pl-4 text-slate-300">-H <span className="text-amber-300">"Content-Type: application/json"</span> \</div>
                            <div className="pl-4 text-slate-300">-d <span className="text-amber-300">'{'{"vin": "KNAxxxxxxxxx"}'}'</span></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

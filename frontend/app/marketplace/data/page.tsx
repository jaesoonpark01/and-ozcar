"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Filter, Search, ShieldAlert, Cpu, Network, Globe, Lock, ArrowRight, Activity, Crosshair } from "lucide-react";

export default function FoundryMarketplace() {
    const [queryStatus, setQueryStatus] = useState<'idle' | 'searching' | 'completed'>('idle');
    const [dataPoints, setDataPoints] = useState<number[]>([]);

    useEffect(() => {
        if (queryStatus === 'searching') {
            const timer = setTimeout(() => {
                setQueryStatus('completed');
                setDataPoints(Array.from({ length: 15 }, () => Math.floor(Math.random() * 100)));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [queryStatus]);

    const handleSearch = () => {
        setQueryStatus('searching');
        setDataPoints([]);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-[#030614] text-white overflow-hidden relative">
            
            {/* Foundry Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-6">
                
                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-blue-900/30 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Lock size={14} className="text-teal-500" />
                            <span className="text-teal-500 text-[10px] font-bold tracking-[0.3em] uppercase">B2B Enterprise Access Only</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase flex items-center gap-3">
                            Ozcar <span className="text-blue-500 italic">Foundry</span>
                        </h1>
                        <p className="text-slate-400 text-sm mt-3 max-w-xl font-mono leading-relaxed">
                            Global ZK-Telemetry Data Lake. Access anonymized, verifiable mobility insights mapped via Ontology relationships.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-2 rounded-2xl">
                        <div className="px-4 py-2 border-r border-slate-800">
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Total Nodes</p>
                            <p className="text-xl font-black italic text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 142,854
                            </p>
                        </div>
                        <div className="px-4 py-2">
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Corporate Balance</p>
                            <p className="text-xl font-black italic text-blue-400">2.4M <span className="text-xs uppercase text-slate-500">OZC</span></p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    
                    {/* Left Sidebar: Query Builder */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
                            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-6">
                                <Filter size={14} /> Knowledge Graph Query
                            </h2>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Semantic Object (Target)</label>
                                    <select className="w-full bg-black/50 border border-slate-700 text-sm text-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 transition-colors">
                                        <option>Hyundai Sonata (2025-2026)</option>
                                        <option>Kia EV6 (All Years)</option>
                                        <option>Tesla Model Y (Seoul Region)</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Kinetic Event (Condition)</label>
                                    <select className="w-full bg-black/50 border border-slate-700 text-sm text-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 transition-colors">
                                        <option>Suspension Shock &gt; 2.5G</option>
                                        <option>Battery SOC Drop &gt; 5% / 10min</option>
                                        <option>ABS Activation Event</option>
                                    </select>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dynamic Metric (Output)</label>
                                    <select className="w-full bg-black/50 border border-slate-700 text-sm text-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 transition-colors">
                                        <option>Average Repair Cost Prediction</option>
                                        <option>Accident Probability Index</option>
                                        <option>Component Lifecycle Curve</option>
                                    </select>
                                </div>

                                <div className="pt-4 border-t border-slate-800">
                                    <button 
                                        onClick={handleSearch}
                                        disabled={queryStatus === 'searching'}
                                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
                                    >
                                        {queryStatus === 'searching' ? (
                                            <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Cpu size={14} /></motion.div> Processing...</>
                                        ) : (
                                            <><Search size={14} /> Execute Query (Cost: 5,000 OZC)</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Queries */}
                        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-md flex-1">
                            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Saved Ontology Queries</h2>
                            <div className="space-y-3">
                                {[
                                    { name: "Winter EV Battery Drop Rate", nodes: 4210 },
                                    { name: "Gangnam Pothole Damage Map", nodes: 1540 },
                                    { name: "Brake Pad Wear vs Mileage", nodes: 8900 }
                                ].map((q, i) => (
                                    <div key={i} className="bg-black/30 border border-slate-800 p-3 rounded-lg hover:border-slate-600 cursor-pointer transition-colors group">
                                        <p className="text-xs text-slate-300 font-bold group-hover:text-blue-400 transition-colors">{q.name}</p>
                                        <p className="text-[9px] text-slate-500 font-mono mt-1 pt-1 justify-between flex border-t border-slate-800/50">
                                            <span>ZK-Verified Nodes:</span> <span className="text-teal-500">{q.nodes.toLocaleString()}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Main Area: Visualization & Results */}
                    <div className="lg:col-span-3 bg-[#0a0f1a] border border-blue-900/30 rounded-2xl p-1 backdrop-blur-md relative overflow-hidden min-h-[600px] shadow-2xl">
                        
                        {/* Map Background Simulation */}
                        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
                            <Globe size={800} strokeWidth={0.2} className="text-blue-500 mix-blend-screen" />
                        </div>

                        {/* Header Status */}
                        <div className="absolute top-4 left-6 right-6 z-20 flex justify-between items-center bg-black/40 backdrop-blur-md border border-slate-800 p-3 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Network size={16} className="text-blue-500" />
                                <span className="text-xs font-mono text-slate-300">Live Global Node Connection</span>
                            </div>
                            <div className="flex gap-4 text-[10px] font-mono">
                                <span className="text-emerald-500">Latency: 12ms</span>
                                <span className="text-blue-400">Encrypted Channels: 32</span>
                            </div>
                        </div>

                        {/* Main Interaction Area */}
                        <div className="relative z-10 w-full h-full pt-20 px-4 pb-4 flex flex-col items-center justify-center">
                            
                            {queryStatus === 'idle' && (
                                <div className="text-center">
                                    <Crosshair size={48} className="mx-auto text-slate-700 mb-6" />
                                    <h2 className="text-2xl font-black italic text-slate-500 uppercase tracking-tighter mb-2">Configure Target Data</h2>
                                    <p className="text-sm text-slate-600 max-w-sm mx-auto">Select semantics and launch a query to trace zero-knowledge verified patterns.</p>
                                </div>
                            )}

                            {queryStatus === 'searching' && (
                                <div className="flex flex-col items-center">
                                    {/* Scanning Animation */}
                                    <div className="relative w-64 h-64 border border-blue-500/30 rounded-full flex items-center justify-center">
                                        <motion.div 
                                            animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
                                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                            className="absolute inset-0 border-t border-blue-500 rounded-full" 
                                        />
                                        <motion.div 
                                            animate={{ opacity: [0.2, 0.8, 0.2] }} 
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                            className="w-32 h-32 bg-blue-500/20 rounded-full blur-xl" 
                                        />
                                        <Activity size={32} className="text-blue-400 relative z-10 animate-pulse" />
                                    </div>
                                    <p className="font-mono text-xs text-blue-400 mt-6 animate-pulse tracking-widest uppercase">Aggregating ZK-Proofs from 14,213 Edge Nodes...</p>
                                </div>
                            )}

                            {queryStatus === 'completed' && (
                                <div className="w-full h-full flex flex-col p-4 bg-black/60 backdrop-blur-xl border border-blue-500/20 rounded-xl overflow-y-auto custom-scrollbar">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-black italic uppercase text-white flex items-center gap-2">
                                            <ShieldAlert className="text-teal-400" size={18} /> Ontology Result Map
                                        </h3>
                                        <button className="bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold uppercase py-2 px-4 rounded-lg flex items-center gap-2">
                                            Subscribe to Stream <ArrowRight size={12} />
                                        </button>
                                    </div>

                                    {/* Simulated Bar Chart Visuals */}
                                    <div className="flex-1 flex items-end gap-2 h-48 border-b border-l border-slate-700 pb-2 pl-2 relative">
                                        <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-[8px] text-slate-500">
                                            <span>100%</span>
                                            <span>50%</span>
                                            <span>0%</span>
                                        </div>
                                        <AnimatePresence>
                                            {dataPoints.map((val, i) => (
                                                <motion.div 
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${val}%` }}
                                                    transition={{ delay: i * 0.05, type: 'spring' }}
                                                    className="flex-1 bg-gradient-to-t from-blue-900 to-blue-500 rounded-t-sm relative group"
                                                >
                                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-bold py-1 px-2 rounded whitespace-nowrap z-20 transition-opacity">
                                                        Node {i+1}: {val}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                    <div className="flex justify-between text-[8px] text-slate-500 uppercase mt-2 px-2">
                                        <span>Jan</span>
                                        <span>Model Decay Correlation Timeline</span>
                                        <span>Dec</span>
                                    </div>

                                    {/* Data Output Table */}
                                    <div className="mt-8">
                                        <table className="w-full text-left text-xs font-mono">
                                            <thead className="text-[10px] text-slate-500 border-b border-slate-800 uppercase bg-slate-900/50">
                                                <tr>
                                                    <th className="py-2 pl-2">Hash ID (Anonymized)</th>
                                                    <th className="py-2">Semantic Entity</th>
                                                    <th className="py-2">Confidence</th>
                                                    <th className="py-2">ZK Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[1,2,3].map((item) => (
                                                    <motion.tr 
                                                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (0.1 * item) }}
                                                        key={item} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors"
                                                    >
                                                        <td className="py-3 pl-2 text-slate-400">0x{(Math.random()*100000).toString(16).substring(0,6)}...</td>
                                                        <td className="py-3 text-blue-300">Hyundai Sonata '25</td>
                                                        <td className="py-3 text-emerald-400">98.2%</td>
                                                        <td className="py-3"><span className="px-2 py-1 bg-teal-500/10 text-teal-400 rounded-md text-[9px] border border-teal-500/20">VERIFIED</span></td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

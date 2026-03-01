'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Wallet,
    ShieldCheck,
    ArrowRightLeft,
    FileText,
    TrendingUp,
    Info,
    ArrowUpRight,
    CircleDollarSign,
    Lock
} from 'lucide-react';

export default function LoanDashboard() {
    const [activeTab, setActiveTab] = useState<'appraisal' | 'loans'>('appraisal');

    return (
        <div className="space-y-8 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl">
            {/* Header / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-emerald-950/20 border-emerald-500/20">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-emerald-400 text-sm font-medium">Buying Power</p>
                                <h3 className="text-3xl font-bold">$45,000</h3>
                            </div>
                            <CircleDollarSign className="w-8 h-8 text-emerald-500/50" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-blue-950/20 border-blue-500/20">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-blue-400 text-sm font-medium">Verified NFTs</p>
                                <h3 className="text-3xl font-bold">2</h3>
                            </div>
                            <ShieldCheck className="w-8 h-8 text-blue-500/50" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-slate-400 text-sm font-medium">Pending Loans</p>
                                <h3 className="text-3xl font-bold">1</h3>
                            </div>
                            <Wallet className="w-8 h-8 text-slate-500/50" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-slate-900 p-1 rounded-lg w-fit border border-slate-800">
                <button
                    onClick={() => setActiveTab('appraisal')}
                    className={`px-6 py-2 rounded-md font-medium transition-all ${activeTab === 'appraisal' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    AI Appraisals
                </button>
                <button
                    onClick={() => setActiveTab('loans')}
                    className={`px-6 py-2 rounded-md font-medium transition-all ${activeTab === 'loans' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    Disbursement
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'appraisal' ? (
                    <motion.div
                        key="appraisal"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {/* Active Appraisal NFT */}
                        <Card className="bg-slate-900 border-slate-800 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                <TrendingUp className="w-24 h-24 text-emerald-500" />
                            </div>
                            <CardHeader>
                                <div className="flex justify-between items-center mb-2">
                                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">Verified AI Certificate</Badge>
                                    <span className="text-xs text-slate-500 font-mono">ID: #OZ-2931</span>
                                </div>
                                <CardTitle className="text-2xl">2022 Tesla Model 3 Long Range</CardTitle>
                                <CardDescription className="text-slate-400 font-mono">VIN: 5YJ3E1EB7NF...932</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Appraised Value</p>
                                        <p className="text-2xl font-bold text-slate-100">$38,500</p>
                                    </div>
                                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Max Loan (LTV 80%)</p>
                                        <p className="text-2xl font-bold text-emerald-500">$30,800</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Trust Score (AI Integrity)</span>
                                        <span className="text-emerald-400 font-bold">98%</span>
                                    </div>
                                    <Progress value={98} className="h-2 bg-slate-950" />
                                </div>

                                <div className="flex gap-3">
                                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Apply for Loan</Button>
                                    <Button variant="outline" className="border-slate-700 bg-transparent hover:bg-slate-800">
                                        <FileText className="w-4 h-4 mr-2" /> Report
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Educational Card */}
                        <div className="bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-transparent p-8 rounded-2xl border border-indigo-500/20">
                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-indigo-400" />
                                NFT-Collateralized Auto Finance
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Your vehicle's history, maintenance, and real-time OBD logs are verified by AI to generate an **Appraisal NFT**.
                                This NFT acts as immutable collateral, allowing instant global lending with lower rates.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "80% LTV (Loan-to-Value) Max",
                                    "Direct Escrow Disbursement",
                                    "No Third-Party Intermediaries",
                                    "Global Stablecoin Liquidity"
                                ].map((step, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="loans"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                    >
                        <Card className="bg-slate-900 border-slate-800 border-l-4 border-l-emerald-500">
                            <CardHeader className="flex flex-row justify-between items-start">
                                <div>
                                    <CardTitle>Active Loan Approved</CardTitle>
                                    <CardDescription className="font-mono mt-1">Loan ID: LN-901-22</CardDescription>
                                </div>
                                <Badge className="bg-slate-800 text-emerald-400 border-emerald-500/20">Awaiting Disbursement</Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col md:flex-row gap-8 mb-8">
                                    <div className="flex-1 space-y-4">
                                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                                        <CircleDollarSign className="w-6 h-6 text-emerald-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500 uppercase tracking-widest">Loan Amount</p>
                                                        <p className="text-xl font-bold">$30,800.00 USDC</p>
                                                    </div>
                                                </div>
                                                <ArrowRightLeft className="w-5 h-5 text-slate-700" />
                                                <div className="text-right">
                                                    <p className="text-xs text-slate-500 uppercase tracking-widest">Dest. Escrow</p>
                                                    <p className="text-sm font-mono text-emerald-400">0x0B30...7016</p>
                                                </div>
                                            </div>
                                            <div className="bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/10 text-xs text-emerald-400 flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4" />
                                                Secure Direct Pay: Funds will be sent directly to the seller via Escrow.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-64 space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Interest Rate</span>
                                            <span className="text-slate-100 font-medium">4.5% APR</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Duration</span>
                                            <span className="text-slate-100 font-medium">36 Months</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Monthly Est.</span>
                                            <span className="text-slate-100 font-medium">$916.50</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <Button variant="ghost" className="text-slate-500 hover:text-slate-300">Cancel Loan</Button>
                                    <Button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-6 text-lg font-bold shadow-lg shadow-emerald-500/20">
                                        Execute Disbursement <ArrowUpRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Secure Flow Alert */}
                        <div className="p-6 rounded-2xl bg-amber-950/10 border border-amber-500/20 flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                                <Lock className="w-6 h-6 text-amber-500" />
                            </div>
                            <div className="space-y-1">
                                <h5 className="font-bold text-amber-400">Anti-Diversion Protocol Active</h5>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Ozcar Finance ensures funds are never sent to the borrower's personal wallet. Instead, they are moved directly from the Lender pool to the **Escrow Smart Contract** to protect the ecosystem and prevent fund diversion.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

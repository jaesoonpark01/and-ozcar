
"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, TrendingUp, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Technician {
    id: string;
    shop_name: string;
    grade: string;
    reputation_score: number;
    total_mined_tokens: number;
}

export default function TechnicianLeaderboard() {
    const [leaders, setLeaders] = useState<Technician[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeaders() {
            try {
                const { data, error } = await supabase
                    .from("technicians")
                    .select("id, shop_name, grade, reputation_score, total_mined_tokens")
                    .order("total_mined_tokens", { ascending: false })
                    .limit(10);

                if (error) throw error;
                setLeaders(data || []);
            } catch (err) {
                console.error("Failed to fetch leaderboard:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchLeaders();
    }, []);

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 0: return <Trophy className="w-6 h-6 text-yellow-500" />;
            case 1: return <Medal className="w-6 h-6 text-slate-400" />;
            case 2: return <Medal className="w-6 h-6 text-amber-700" />;
            default: return <span className="text-slate-500 font-bold w-6 text-center">{rank + 1}</span>;
        }
    };

    const getGradeColor = (grade: string) => {
        switch (grade) {
            case "Master": return "bg-purple-100 text-purple-700 border-purple-200";
            case "Gold": return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "Silver": return "bg-slate-100 text-slate-700 border-slate-200";
            default: return "bg-orange-50 text-orange-700 border-orange-200";
        }
    };

    return (
        <Card className="w-full border-none shadow-lg bg-white/80 backdrop-blur-md">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-blue-600" />
                        <CardTitle className="text-lg font-bold text-slate-900">
                            Top Mining Technicians
                        </CardTitle>
                    </div>
                    <Badge variant="outline" className="text-xs font-mono">
                        LIVE UPDATES
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {loading ? (
                        // Skeleton Loader
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
                        ))
                    ) : (
                        leaders.map((tech, index) => (
                            <motion.div
                                key={tech.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:bg-slate-50 ${index === 0 ? "bg-yellow-50/50 border-yellow-100" : "bg-white border-slate-100"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-8 h-8">
                                        {getRankIcon(index)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                            {tech.shop_name}
                                            {index === 0 && <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge className={`text-[10px] px-1.5 py-0 h-5 ${getGradeColor(tech.grade)}`}>
                                                {tech.grade}
                                            </Badge>
                                            <span className="text-[10px] text-slate-400">
                                                Score: {tech.reputation_score}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-bold text-blue-600 text-sm">
                                        {tech.total_mined_tokens.toLocaleString()} OZC
                                    </p>
                                    <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-600 font-medium">
                                        <TrendingUp className="w-3 h-3" />
                                        Mining Active
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}

                    {leaders.length === 0 && !loading && (
                        <div className="text-center py-10 text-slate-400 text-sm">
                            No mining data available yet. Be the first to mine!
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

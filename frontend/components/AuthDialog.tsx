"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "./ui/dialog";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";

// You should define these in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AuthDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ isOpen, onOpenChange }: AuthDialogProps) {
    const [session, setSession] = useState<any>(null);
    const { address, isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const [isMerging, setIsMerging] = useState(false);
    const [mergeStatus, setMergeStatus] = useState<string | null>(null);

    const handleMergeIdentity = async () => {
        if (!session || !address) return;
        setIsMerging(true);
        setMergeStatus("지갑 소유권 증명 서명 요청 중...");
        
        try {
            // SIWE Message Simulation
            const message = `Ozcar Unified Identity Linked\n\nI confirm ownership of this wallet and agree to bind it with my Ozcar Web2 Profile.\nWallet: ${address}\nTimestamp: ${new Date().toISOString()}`;
            const signature = await signMessageAsync({ message });
            
            if (signature) {
                setMergeStatus("Supabase 프로필 병합 처리 중...");
                
                // Update profile
                const { error } = await supabase
                    .from("profiles")
                    .update({ wallet_address: address })
                    .eq("id", session.user.id);
                    
                if (error) {
                    console.error("Profile update error:", error);
                    setMergeStatus("병합 실패. 고객센터에 문의하세요.");
                } else {
                    setMergeStatus("병합 성공! OUI 연동 완료.");
                    setTimeout(() => {
                        onOpenChange(false);
                        window.location.href = "/vehicle-nft/mint"; // Proceed to Genesis Journey
                    }, 2000);
                }
            }
        } catch (error) {
            console.error("Signature failed:", error);
            setMergeStatus("서명을 취소했거나 오류가 발생했습니다.");
        } finally {
            setIsMerging(false);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-[#0a0f1d] border-blue-900/50 text-white backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black italic tracking-tighter text-blue-400">OZCAR UNIVERSAL LOGIN</DialogTitle>
                    <DialogDescription className="text-slate-400 text-sm">
                        한국 특화 소셜 로그인과 Web3 지갑을 연결하여 완전한 플랫폼 권한을 획득하세요.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-6 mt-4">
                    {/* Step 1: Social Login */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10"
                    >
                        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">1. Web2 Identity</h3>
                        {!session ? (
                            <Auth
                                supabaseClient={supabase}
                                appearance={{ theme: ThemeSupa }}
                                providers={["kakao", "google"]}
                                theme="dark"
                                onlyThirdPartyProviders
                                redirectTo={typeof window !== "undefined" ? window.location.origin : undefined}
                            />
                        ) : (
                            <div className="text-emerald-400 text-sm font-bold bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-center">
                                ✓ 소셜 로그인 완료 ({session.user?.email})
                            </div>
                        )}
                    </motion.div>

                    {/* Step 2: Web3 Wallet */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10"
                    >
                        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">2. Web3 Identity (SIWE)</h3>
                        <div className="flex justify-center flex-col items-center gap-4">
                            <ConnectButton />
                            {isConnected && session && (
                                <AnimatePresence>
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="flex flex-col items-center gap-3 w-full"
                                    >
                                        <div className="text-xs text-blue-400 text-center">
                                            Web2 계정과 Web3 지갑 연동이 준비되었습니다.
                                        </div>
                                        <button 
                                            onClick={handleMergeIdentity}
                                            disabled={isMerging || mergeStatus?.includes("성공")}
                                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20"
                                        >
                                            {isMerging ? '처리 중...' : 'OUI 지갑 연동 (서명)'}
                                        </button>
                                        {mergeStatus && (
                                            <div className="text-sm text-emerald-400 text-center font-bold">
                                                {mergeStatus}
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>
                    </motion.div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

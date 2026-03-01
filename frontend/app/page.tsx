"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useWeb3 } from "../components/Web3Provider";
import { useI18n } from "../hooks/useI18n";
import {
  ShieldCheck,
  Zap,
  ChevronRight,
  Trophy,
  ArrowRight,
  Fingerprint
} from "lucide-react";

import HeroSection from "@/components/landing/HeroSection";
import ThreePillarCards from "@/components/landing/ThreePillarCards";
import ComparisonDelta from "@/components/landing/ComparisonDelta";
import TrustProofSection from "@/components/landing/TrustProofSection";
import ValueTimelineGraph from "@/components/landing/ValueTimelineGraph";
import Navbar from "@/components/Navbar";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { t } = useI18n();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#010410] text-white font-sans selection:bg-[#2563EB] selection:text-white antialiased">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 origin-left z-[500] shadow-[0_0_20px_rgba(37,99,235,0.5)]"
        style={{ scaleX }}
      />

      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-[-10%] w-[1000px] h-[1000px] bg-blue-900/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-[-10%] w-[800px] h-[800px] bg-indigo-900/5 rounded-full blur-[180px]" />
      </div>

      <Navbar />

      <main className="relative">
        <HeroSection />

        <div className="bg-[#020617] h-32 flex items-center border-y border-white/5 relative z-50 overflow-hidden">
          <div className="flex animate-ticker gap-20 text-[11px] font-black uppercase tracking-[0.6em] text-white/20 whitespace-nowrap">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-20">
                <span className="flex items-center gap-6"><ShieldCheck className="text-blue-600" /> {t('ticker_secured')}</span>
                <span className="flex items-center gap-6"><Fingerprint className="text-indigo-600" /> {t('ticker_records')}</span>
                <span className="flex items-center gap-6"><Zap className="text-amber-500 fill-current" /> {t('ticker_predictive')}</span>
              </div>
            ))}
          </div>
        </div>

        <ThreePillarCards />
        <ComparisonDelta />
        <TrustProofSection />
        <ValueTimelineGraph />

        <section className="py-60 bg-[#010410] px-8 relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto space-y-20 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-4 bg-blue-600 p-4 rounded-3xl shadow-[0_20px_40px_rgba(37,99,235,0.3)] mb-8">
                <Trophy size={48} className="text-white" />
              </div>
              <h2 className="text-6xl md:text-[120px] font-black tracking-[-0.06em] leading-[1.1]">
                {t('final_cta_title').split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}<br />
                  </React.Fragment>
                ))}
              </h2>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 px-20 py-10 rounded-full font-black text-xl shadow-[0_40px_80px_-10px_rgba(37,99,235,0.4)] hover:bg-blue-700 transition-all uppercase italic"
              >
                {t('final_cta_btn')} <ArrowRight className="inline-block ml-4" />
              </motion.button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-40 px-10 bg-black relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-40">
          <div className="space-y-10">
            <div className="text-5xl font-black tracking-tighter italic">OZCAR</div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
      `}</style>
    </div>
  );
}

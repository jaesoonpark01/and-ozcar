"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint as FingerprintIcon, Key, Handshake, CheckCircle2, AlertTriangle, ArrowRight, FileText } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function DigitalHandshake() {
  const { t } = useI18n();
  const [step, setStep] = useState<'IDLE' | 'AUTH' | 'SIGN' | 'COMPLETE'>('IDLE');
  const [scanned, setScanned] = useState(false);

  const handleStart = () => {
    setStep('AUTH');
    setTimeout(() => {
      setScanned(true);
      setTimeout(() => setStep('SIGN'), 2000);
    }, 3000);
  };

  const handleSign = () => {
     setStep('COMPLETE');
  };

  return (
    <div className="bg-[#0c0d10] rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl p-10 md:p-14 min-h-[700px] flex flex-col items-center justify-center">
      <div className="max-w-xl w-full text-center">
        <AnimatePresence mode="wait">
          {step === 'IDLE' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center"
            >
               <div className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500 border border-blue-500/20 mb-10 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
                 <Handshake size={48} />
               </div>
               <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-4">
                 Ready for <span className="text-blue-500">P2P Trade</span>?
               </h2>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-12 leading-relaxed">
                 You are about to sign a decentralised vehicle ownership transfer. <br />
                 Identity verification is <span className="text-white italic">REQUIRED</span>.
               </p>
               <button 
                 onClick={handleStart}
                 className="w-full py-8 bg-blue-600 text-white rounded-3xl font-black italic tracking-[0.4em] text-[11px] uppercase shadow-2xl shadow-blue-600/30 hover:bg-blue-500 transition-all flex items-center justify-center gap-4"
               >
                 Initiate Bio-Handshake
                 <ArrowRight size={18} />
               </button>
            </motion.div>
          )}

          {step === 'AUTH' && (
            <motion.div 
              key="auth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center py-10"
            >
               <div className="relative w-40 h-40 mb-12">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`absolute inset-0 rounded-full border-4 flex items-center justify-center ${scanned ? 'border-emerald-500/40 text-emerald-500' : 'border-blue-500/20 text-blue-500'}`}
                  >
                     <FingerprintIcon size={80} className={`${!scanned && 'animate-pulse'}`} />
                  </motion.div>
                  {!scanned && (
                    <motion.div 
                       animate={{ top: ['0%', '100%', '0%'] }}
                       transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                       className="absolute inset-x-0 h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] z-10"
                    />
                  )}
               </div>
               <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-2">
                 {scanned ? 'Identity Confirmed' : 'Verifying Biometrics'}
               </h3>
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest tracking-widest">
                 SECURE ENCLAVE COMMUNICATION ACTIVE
               </p>
            </motion.div>
          )}

          {step === 'SIGN' && (
            <motion.div 
              key="sign"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
               <div className="bg-white/5 p-10 rounded-[3rem] border border-white/5 mb-10 text-left">
                  <header className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
                     <div>
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Trade agreement</h4>
                        <p className="text-xl font-black italic text-white tracking-tighter uppercase">Ownership Transfer #OZ-882</p>
                     </div>
                     <FileText className="text-blue-500" size={24} />
                  </header>
                  <div className="space-y-6">
                    <ContractRow label={t('handshake_from')} value="CyberNeo (0x72...a1)" />
                    <ContractRow label={t('handshake_to')} value="CryptoBuyer (0x81...f2)" />
                    <ContractRow label={t('handshake_asset')} value="Tesla Model S NFT Cert" />
                    <ContractRow label={t('handshake_price')} value="48,200 OZC" />
                  </div>
                  <div className="mt-8 flex items-center gap-4 p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                     <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                     <p className="text-[9px] font-black text-amber-500/80 uppercase tracking-widest leading-relaxed">
                        By signing, you irrevocably transfer the vehicle ZKP master key to the buyer. This action is <span className="text-white underline font-black">NON-REVERSIBLE</span> after block confirmation.
                     </p>
                  </div>
               </div>

               <button 
                 onClick={handleSign}
                 className="w-full py-8 bg-emerald-600 text-white rounded-3xl font-black italic tracking-[0.4em] text-[11px] uppercase shadow-2xl shadow-emerald-600/30 hover:bg-emerald-500 transition-all flex items-center justify-center gap-4"
               >
                 <Key size={18} />
                 Sign & Deploy Contract
               </button>
            </motion.div>
          )}

          {step === 'COMPLETE' && (
            <motion.div 
               key="complete"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="flex flex-col items-center"
            >
               <div className="w-32 h-32 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-500/20 mb-10 shadow-[0_0_60px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 size={64} className="animate-bounce" />
               </div>
               <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-4">
                 Handshake <span className="text-emerald-500">Fulfilled</span>
               </h2>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-12 leading-relaxed">
                 The smart contract has been broadcasted to the network. <br />
                 {t('handshake_time_remaining')}
               </p>
               <div className="flex gap-4 w-full">
                  <button className="flex-1 py-6 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-all">
                     {t('handshake_view_on_explorer')}
                  </button>
                  <button 
                    onClick={() => setStep('IDLE')}
                    className="flex-1 py-6 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-600/20 transition-all"
                  >
                     Close Portal
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/5 blur-[150px] pointer-events-none"></div>
    </div>
  );
}

function ContractRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-white/5">
       <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{label}</span>
       <span className="text-xs font-black italic text-white uppercase tracking-widest">{value}</span>
    </div>
  );
}

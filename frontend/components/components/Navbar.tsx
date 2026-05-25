"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useWeb3 } from "./Web3Provider";
import { useI18n } from "@/hooks/useI18n";
import {
    Wallet,
    Globe,
    Menu,
    X,
    ChevronRight,
    LayoutDashboard,
    ShoppingBag,
    Car,
    Wrench,
    Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { account, connectWallet, reputation } = useWeb3();
    const { lang, toggleLanguage, t } = useI18n();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/pricing", label: "Pricing", icon: <Database size={14} /> },
        { href: "/marketplace", label: t('nav_market'), icon: <ShoppingBag size={14} /> },
        { href: "/dashboard", label: t('dash_title'), icon: <LayoutDashboard size={14} /> },
        { href: "/my-garage", label: t('nav_garage'), icon: <Car size={14} /> },
        { href: "/technician/dashboard", label: t('nav_technician'), icon: <Wrench size={14} /> },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-[2000] sm:w-[94%] max-w-7xl transition-all duration-500`}
            >
                <div className={`
                    relative flex items-center justify-between px-3 sm:px-8 py-2.5 sm:py-4 
                    rounded-[1.8rem] sm:rounded-[2.5rem] border transition-all duration-500 overflow-hidden
                    ${isScrolled
                        ? 'bg-black/60 backdrop-blur-3xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                        : 'bg-white/5 backdrop-blur-xl border-white/5'}
                `}>
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <span className="text-white font-black text-lg sm:text-xl italic">O</span>
                        </div>
                        <span className="text-lg sm:text-2xl font-black tracking-tighter italic text-white group-hover:text-blue-400 transition-colors">OZCAR</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all italic"
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Action Area */}
                    <div className="flex items-center gap-4">
                        {/* Language Selector */}
                        <button
                            onClick={toggleLanguage}
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/15 transition-all"
                        >
                            <Globe size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">{lang === 'ko' ? 'EN' : 'KO'}</span>
                        </button>

                        {/* Wallet / Portal Access */}
                        <button
                            onClick={connectWallet}
                            className={`
                                relative group overflow-hidden flex items-center gap-2 sm:gap-3 px-3 sm:px-8 py-2 sm:py-3 rounded-full 
                                font-black text-[9px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-widest transition-all
                                ${account
                                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                                    : 'bg-white text-black hover:bg-blue-600 hover:text-white'}
                            `}
                        >
                            <div className="relative z-10 flex items-center gap-1.5 sm:gap-3">
                                <Wallet size={12} className={account ? 'text-emerald-400' : ''} />
                                <span className="truncate max-w-[50px] sm:max-w-none">
                                    {account ? `${account.substring(0, 4)}...` : t("nav_connect")}
                                </span>
                                {account && reputation && (
                                    <span className="hidden xs:inline-block px-1.5 py-0.5 bg-emerald-500/20 rounded-md text-[8px] sm:text-[9px]">REP {reputation}</span>
                                )}
                            </div>
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2.5 sm:p-3 bg-white/5 rounded-2xl border border-white/10 text-white shrink-0"
                        >
                            {isMobileMenuOpen ? <X size={isScrolled ? 18 : 20} /> : <Menu size={isScrolled ? 18 : 20} />}
                        </button>
                    </div>

                    {/* Glow Effect Overlay */}
                    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-blue-600/5 via-transparent to-indigo-600/5 pointer-events-none opacity-50" />
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[1900] bg-black/95 backdrop-blur-2xl flex flex-col p-8 pt-32"
                    >
                        <div className="flex flex-col gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between group p-6 rounded-3xl bg-white/5 border border-white/5"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400">
                                            {link.icon}
                                        </div>
                                        <span className="text-2xl font-black italic uppercase tracking-tighter">{link.label}</span>
                                    </div>
                                    <ChevronRight className="text-white/20 group-hover:text-blue-400 transition-colors" />
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto grid grid-cols-2 gap-4">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center justify-center gap-3 p-6 rounded-3xl bg-white/5 border border-white/10 text-lg font-black uppercase italic"
                            >
                                <Globe size={20} />
                                {lang === 'ko' ? 'English' : '한국어'}
                            </button>
                            <button
                                onClick={connectWallet}
                                className="p-6 rounded-3xl bg-blue-600 text-white font-black uppercase italic shadow-lg shadow-blue-600/20"
                            >
                                {account ? 'Node Connected' : 'Connect'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

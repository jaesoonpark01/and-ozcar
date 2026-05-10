"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Car, Wrench, Shield, Activity, LayoutDashboard, Wallet, ShoppingBag, Cpu, Leaf, Globe, Trophy, Users, BookOpen, MonitorSmartphone, Zap, BatteryCharging, Landmark, IdCard, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Flattened structure of all searchable items
  const items = [
    { id: "garage", label: t('nav_garage'), href: "/my-garage", icon: <Car size={18} />, category: "Workspace" },
    { id: "maintenance", label: t('nav_maintenance'), href: "/maintenance", icon: <Wrench size={18} />, category: "Workspace" },
    { id: "pro_check", label: t('nav_pro_check'), href: "/technician/pro-check", icon: <Zap size={18} />, category: "Workspace" },
    { id: "co_driver", label: "AI Co-Driver", href: "/co-driver", icon: <Cpu size={18} />, category: "Workspace" },
    { id: "telemetry", label: t('nav_telemetry'), href: "/sentinel", icon: <Activity size={18} />, category: "Tracking" },
    { id: "thermal", label: "Thermal Guard", href: "/thermal-guard", icon: <Shield size={18} />, category: "Tracking" },
    { id: "digital_twin", label: "Digital Twin", href: "/digital-twin", icon: <MonitorSmartphone size={18} />, category: "Tracking" },
    
    { id: "overview", label: t('nav_overview'), href: "/dashboard", icon: <LayoutDashboard size={18} />, category: "Analytics" },
    { id: "passport", label: "Mobility Passport", href: "/passport", icon: <BookOpen size={18} />, category: "Analytics" },
    { id: "master_profile", label: t('nav_master_profile'), href: "/master-profile", icon: <User size={18} />, category: "Analytics" },
    { id: "vehicle_nft", label: "Vehicle NFT", href: "/vehicle-nft", icon: <IdCard size={18} />, category: "Analytics" },
    { id: "wallet", label: t('nav_wallet'), href: "/wallet", icon: <Wallet size={18} />, category: "Finance" },
    { id: "dev_hub", label: "Developer Hub", href: "/admin/hub", icon: <Cpu size={18} />, category: "Finance" },
    
    { id: "trade", label: "Data NFT Trade", href: "/marketplace", icon: <ShoppingBag size={18} />, category: "Marketplace" },
    { id: "sell", label: t('nav_onboarding'), href: "/sell", icon: <Car size={18} />, category: "Marketplace" },
    { id: "orders", label: t('nav_orders'), href: "/orders", icon: <LayoutDashboard size={18} />, category: "Marketplace" },
    { id: "insight_lab", label: t('nav_insight_lab'), href: "/insight-lab", icon: <Activity size={18} />, category: "Data Economy" },
    { id: "smart_charging", label: "Smart Charging", href: "/smart-charging", icon: <BatteryCharging size={18} />, category: "Data Economy" },
    { id: "v2g_market", label: "V2G Market", href: "/v2g-market", icon: <Zap size={18} />, category: "Data Economy" },
    { id: "data_market", label: "Data Market", href: "/marketplace/data", icon: <Cpu size={18} />, category: "Data Economy" },
    
    { id: "gov", label: t('nav_governance'), href: "/governance", icon: <Landmark size={18} />, category: "DAO" },
    { id: "constitution", label: "Constitution", href: "/governance/constitution", icon: <Shield size={18} />, category: "DAO" },
    { id: "jury", label: "Jury & Justice", href: "/jury", icon: <Shield size={18} />, category: "DAO" },
    { id: "social_league", label: "Social League", href: "/social-league", icon: <Trophy size={18} />, category: "Community" },
    { id: "eco_lab", label: "Eco Lab", href: "/eco-lab", icon: <Leaf size={18} />, category: "Community" },
    { id: "ambassador", label: "Ambassador", href: "/ambassador", icon: <Users size={18} />, category: "Community" },
    { id: "metaverse", label: "Metaverse", href: "/metaverse", icon: <Globe size={18} />, category: "Community" },
    { id: "lounge", label: t('nav_founders_lounge'), href: "/lounge", icon: <User size={18} />, category: "Community" },
  ];

  const filteredItems = items.filter(item => 
    item.label?.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter" && filteredItems.length > 0) {
        e.preventDefault();
        handleSelect(filteredItems[activeIndex].href);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, filteredItems, onClose]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[4000] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[4001] w-[90%] max-w-2xl bg-[#0f1115] border border-white/10 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          >
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10 bg-white/[0.02]">
              <Search className="text-slate-400" size={20} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search functionalities, pages, settings..."
                className="flex-1 bg-transparent border-none outline-none text-white font-medium placeholder-slate-500 text-lg"
              />
              <div className="flex items-center gap-1">
                <span className="px-2 py-1 bg-white/10 rounded text-[10px] text-slate-400 font-bold uppercase">ESC</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10">
              {filteredItems.length > 0 ? (
                <div className="space-y-1">
                  {filteredItems.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item.href)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                        index === activeIndex ? "bg-blue-600/20 text-white" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${index === activeIndex ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-slate-400"}`}>
                          {item.icon}
                        </div>
                        <span className={`font-bold ${index === activeIndex ? "text-blue-100" : ""}`}>{item.label}</span>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.category}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 flex flex-col items-center justify-center">
                  <Search size={32} className="mb-4 opacity-20" />
                  <p className="text-sm font-bold">No results found for "{query}"</p>
                </div>
              )}
            </div>
            
            <div className="p-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="p-1 bg-white/10 rounded leading-none">↑</span><span className="p-1 bg-white/10 rounded leading-none">↓</span> to navigate</span>
                <span className="flex items-center gap-1"><span className="p-1 bg-white/10 rounded leading-none">↵</span> to select</span>
              </div>
              <div>Ozcar Command Palette</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

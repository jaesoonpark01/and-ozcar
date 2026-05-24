// components/SubscriptionBanner.tsx
"use client";
import Link from "next/link";
import { Gift } from "lucide-react";

export default function SubscriptionBanner() {
  return (
    <section className="relative mx-auto max-w-5xl p-6 my-8 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl shadow-xl border border-blue-500/30 backdrop-blur-md animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Gift className="w-8 h-8 text-white" />
          <h2 className="text-2xl font-bold text-white">
            Ozcar 프리미엄 구독 플랜을 확인하고 첫 달 0원 혜택을 받으세요!
          </h2>
        </div>
        <Link
          href="/pricing"
          className="mt-4 md:mt-0 inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-blue-50 transition-colors"
        >
          구독 플랜 보기
        </Link>
      </div>
    </section>
  );
}

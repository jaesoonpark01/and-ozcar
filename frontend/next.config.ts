import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // 중복 주문 페이지 통합
      { source: '/my-orders', destination: '/orders', permanent: true },
      // 정비 관련 통합
      { source: '/service', destination: '/maintenance', permanent: true },
      // 차량 처분 → 내 차고
      { source: '/trade-in', destination: '/my-garage', permanent: true },
      // 리더보드 → Sentinel 커뮤니티 탭
      { source: '/leaderboard', destination: '/sentinel', permanent: true },
      // 탐색기 → 마켓플레이스
      { source: '/explorer', destination: '/marketplace', permanent: true },
    ];
  },
};

export default nextConfig;

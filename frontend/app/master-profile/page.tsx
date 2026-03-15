export const metadata = {
  title: "oz-Master Profile | ozcar Universal",
  description: "User Profile page showing the Master License",
};

import MasterLicense from "@/components/user/MasterLicense";

export default function MasterProfilePage() {
  // 샘플 유저 데이터 (실제 데이터 연동 필요)
  const userData = {
    name: "Alex Kwon",
    avatar: "https://i.pravatar.cc/300?img=11", 
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] py-20 px-4 md:px-0">
      <div className="max-w-md mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">My Credentials</h1>
          <p className="text-slate-400">Manage your ozcar Universal status and licenses.</p>
        </div>
        
        <MasterLicense user={userData} />
        
        <div className="mt-8 bg-amber-900/10 border border-amber-500/20 rounded-xl p-5 text-sm text-amber-200/80 leading-relaxed text-center">
          <p>You have unlocked the Elite Guardian Level.</p>
          <p className="mt-1">You are now eligible to perform offline Pro-Check services.</p>
        </div>
      </div>
    </div>
  );
}

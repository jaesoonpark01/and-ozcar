export const metadata = {
  title: "Founders Lounge | ozcar Universal",
  description: "Exclusive community feed for ozcar Founders",
};

import FoundersLounge from "@/components/community/FoundersLounge";

export default function LoungePage() {
  return (
    <main className="w-full">
      <FoundersLounge />
    </main>
  );
}

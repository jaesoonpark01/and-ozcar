export const metadata = {
  title: "Pro-Check Inspection Panel | ozcar Universal",
  description: "Tablet-optimized UI for on-stite vehicle inspection",
};

import FastInspectionUI from "@/components/technician/FastInspectionUI";

export default function ProCheckPage() {
  return (
    <main className="w-full">
      <FastInspectionUI />
    </main>
  );
}

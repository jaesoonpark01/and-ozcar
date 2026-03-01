import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../components/Providers";
import { I18nProvider } from "../hooks/useI18n";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "ozcar | Trust Protocol Marketplace",
  description: "Blockchain-based used car trading platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#010410] text-white overflow-x-hidden" suppressHydrationWarning>
        <I18nProvider>
          <Providers>
            <Navbar />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28">
              {children}
            </main>
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}

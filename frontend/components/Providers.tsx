"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http, createConfig } from "wagmi";
import { polygonAmoy, polygon } from "wagmi/chains";
import { RainbowKitProvider, getDefaultConfig, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Web3Provider } from "./Web3Provider";

const projectId = "YOUR_PROJECT_ID"; // TODO: Should be in env

const config = getDefaultConfig({
    appName: "Ozcar App",
    projectId: projectId, // WalletConnect Cloud Project ID
    chains: [polygonAmoy, polygon],
    transports: {
        [polygonAmoy.id]: http(),
        [polygon.id]: http(),
    },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider modalSize="compact" theme={darkTheme()}>
                    <Web3Provider>
                        {children}
                    </Web3Provider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

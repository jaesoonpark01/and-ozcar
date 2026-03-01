// services/miningService.ts
import { ethers } from 'ethers';
import addresses from '../src/contracts/contract-addresses.json';
import VehicleNFTABI from '../src/contracts/abis/VehicleNFT.json';
import OzcarTokenABI from '../src/contracts/abis/OzcarToken.json';

export const MiningService = {
    // IPFS Upload Simulation (In real app, use Pinata or Web3.Storage)
    async uploadToIPFS(file: File): Promise<string> {
        console.log("Uploading file to IPFS...", file.name);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Return a mock CID (In production, return actual IPFS hash)
        return "QmXoyp" + Math.random().toString(36).substring(7) + "VerifiedEvidence";
    },

    // Blockchain Mining: Records maintenance to Polygon
    async recordMaintenance(payload: { vin: string, ipfsHash: string, mileage: string | number, ownerSecret: string }) {
        if (typeof window.ethereum === "undefined") throw new Error("MetaMask not installed");
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const nftContract = new ethers.Contract(addresses.VehicleNFT, VehicleNFTABI.abi, signer);

        // 1. Find Token ID for VIN
        // Note: Ideally this lookup happens via an indexer or a view function if mapped. 
        // Our updated contract has `vinToTokenId` mapping. Assuming ABI is updated or we use event filter as fallback.

        // For robustness and since ABI might not be fully synced in frontend artifacts yet, 
        // we try to use the `vinToTokenId` if available, otherwise fallback to filter.
        let tokenId: string | null = null;

        try {
            // Try reading public mapping if ABI supports it
            // const id = await nftContract.vinToTokenId(payload.vin);
            // if (id > 0) tokenId = id;

            // Fallback: Event log scan (as per previous logic)
            const vinHash = ethers.id(payload.vin);
            const allRegEvents = await nftContract.queryFilter(nftContract.filters.VehicleRegistered(), 0, 'latest');
            const events = allRegEvents.filter((e: unknown) => {
                const event = e as { args: { vin: string } };
                return ethers.id(event.args.vin) === vinHash;
            });

            if (events.length > 0) {
                const event = events[0] as unknown as { args: { tokenId: string } };
                tokenId = event.args.tokenId;
            }
        } catch (e) {
            console.log("Error finding token ID", e);
        }

        let tx;
        if (tokenId) {
            console.log("Adding record to Token ID:", tokenId);
            // 2. Add maintenance record
            tx = await nftContract.addMaintenanceRecord(
                tokenId,
                payload.ipfsHash,
                payload.mileage.toString(),
                "Regular Maintenance (Verified)", // Description
                signer.address
            );
        } else {
            console.log("Vehicle not found, registering new...");
            // 3. Register New
            tx = await nftContract.registerVehicle(signer.address, payload.vin, `ipfs://${payload.ipfsHash}`);
        }

        const receipt = await tx.wait();

        // Trigger Receipt Generation (Backend)
        try {
            await fetch('/api/v1/maintenance/receipt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vin: payload.vin,
                    mileage: payload.mileage,
                    description: "Regular Maintenance",
                    ipfsHash: payload.ipfsHash,
                    txHash: receipt.hash,
                    technicianName: "Certified Tech", // In real app, fetch from profile
                    ownerPhone: "010-1234-5678" // Mock phone for demo
                })
            });
        } catch (e) {
            console.error("Receipt generation failed", e);
        }

        return { success: true, txHash: receipt.hash };
    },

    // Claim rewards: Now handled automatically by contract or backend
    // But we can keep this for manual claiming logic if needed (e.g. extra bonuses)
    async claimReward(technician: string) {
        console.log("Reward is automatically distributed by the smart contract upon record addition.");
        return true;
    },

    // Fetch History
    async getVehicleHistory(vin: string) {
        if (typeof window.ethereum === "undefined") return [];
        const provider = new ethers.BrowserProvider(window.ethereum);
        const nftContract = new ethers.Contract(addresses.VehicleNFT, VehicleNFTABI.abi, provider);

        const vinHash = ethers.id(vin);
        const allRegEvents = await nftContract.queryFilter(nftContract.filters.VehicleRegistered(), 0, 'latest');
        const regEvents = allRegEvents.filter((e: unknown) => {
            const event = e as { args: { vin: string } };
            return ethers.id(event.args.vin) === vinHash;
        });

        if (regEvents.length === 0) return [];

        const regEvent = regEvents[0] as unknown as { args: { tokenId: string, owner: string }, transactionHash: string, blockNumber: number };
        const tokenId = regEvent.args.tokenId;

        // Try-catch for new ABI methods
        try {
            const count = await nftContract.getMaintenanceHistoryCount(tokenId);
            const history = [];

            // Registration
            history.push({
                type: "REGISTRATION",
                owner: regEvent.args.owner,
                vin: vin,
                txHash: regEvent.transactionHash,
                timestamp: "Genesis"
            });

            for (let i = 0; i < count; i++) {
                const record = await nftContract.getMaintenanceRecord(tokenId, i);
                history.push({
                    type: "MAINTENANCE",
                    technician: record.technician,
                    mileage: record.mileage.toString(),
                    description: record.description,
                    tokenUri: record.ipfsHash,
                    timestamp: new Date(Number(record.timestamp) * 1000).toLocaleString(),
                    txHash: "On-Chain Record"
                });
            }
            return history;
        } catch (e) {
            console.log("Contract ABI mismatch or no history", e);
            return [];
        }
    }
};


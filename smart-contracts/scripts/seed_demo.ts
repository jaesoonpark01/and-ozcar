import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
    const [deployer] = await ethers.getSigners();
    const addressesPath = path.join(__dirname, "../../frontend/src/contracts/contract-addresses.json");
    const addresses = JSON.parse(fs.readFileSync(addressesPath, "utf8"));

    console.log("Using deployer:", deployer.address);
    const nft = await ethers.getContractAt("OzcarNFT", addresses.VehicleNFT);

    const demoVehicles = [
        { model: "Tesla Model 3", vin: "DEMO-VIN-001" },
        { model: "Genesis G80", vin: "DEMO-VIN-002" },
        { model: "Hyundai IONIQ 5", vin: "DEMO-VIN-003" },
        { model: "Kia EV6", vin: "DEMO-VIN-004" },
        { model: "BMW i4", vin: "DEMO-VIN-005" },
        { model: "Mercedes-Benz EQS", vin: "DEMO-VIN-006" },
        { model: "Porsche Taycan", vin: "DEMO-VIN-007" },
        { model: "Audi e-tron GT", vin: "DEMO-VIN-008" },
        { model: "Polestar 2", vin: "DEMO-VIN-009" },
        { model: "Volvo XC40 Recharge", vin: "DEMO-VIN-010" }
    ];

    console.log("Seeding 10 demo vehicles...");

    for (const car of demoVehicles) {
        try {
            const tx = await nft.registerVehicle(
                deployer.address,
                car.vin,
                `ipfs://demo-hash-${car.vin}`
            );
            await tx.wait();
            console.log(`✅ Registered ${car.model} (VIN: ${car.vin})`);
        } catch (e: any) {
            if (e.message.includes("VIN already registered")) {
                console.log(`⏩ Skipping ${car.model} (Already exists)`);
            } else {
                console.error(`❌ Failed ${car.model}:`, e.message);
            }
        }
    }

    // Also mint some OZC to deployer for testing escrow
    const token = await ethers.getContractAt("OzcarToken", addresses.OzcarToken);
    const faucetAmount = ethers.parseEther("10000");
    await token.mint(deployer.address, faucetAmount);
    console.log("💰 Minted 10,000 OZC for demo testing");

    console.log("Done seeding demo data!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy OzcarVehicleHistory
    const OzcarVehicleHistory = await ethers.getContractFactory("OzcarVehicleHistory");
    const vehicleHistory = await OzcarVehicleHistory.deploy();
    await vehicleHistory.waitForDeployment();

    const vehicleHistoryAddress = await vehicleHistory.getAddress();

    console.log("OzcarVehicleHistory deployed to:", vehicleHistoryAddress);

    // Save address to JSON file for easy retrieval
    const deploymentInfo = {
        address: vehicleHistoryAddress,
        deployer: deployer.address
    };
    fs.writeFileSync("deployed_address_phase13.json", JSON.stringify(deploymentInfo));

    // 2. Setup initial roles (optional for testing)
    // Grant TECHNICIAN_ROLE to deployer for testing
    const TECHNICIAN_ROLE = await vehicleHistory.TECHNICIAN_ROLE();
    await vehicleHistory.grantRole(TECHNICIAN_ROLE, deployer.address);
    console.log("Granted TECHNICIAN_ROLE to deployer:", deployer.address);

    // 3. Register a test vehicle (optional for testing)
    // VIN: TESTVIN123456789
    // Owner: Deployer
    // Secret: "secret123" -> SHA256 Hash
    const testVin = "TESTVIN123456789";
    const secret = "secret123";
    const secretHash = ethers.sha256(ethers.toUtf8Bytes(secret));

    await vehicleHistory.registerVehicle(testVin, deployer.address, secretHash);
    console.log(`Registered test vehicle: ${testVin} with owner: ${deployer.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

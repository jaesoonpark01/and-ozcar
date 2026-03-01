import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts to Amoy with account:", deployer.address);

    // 1. Deploy OzcarToken
    const OzcarToken = await ethers.getContractFactory("OzcarToken");
    const ozcarToken = await OzcarToken.deploy(deployer.address);
    await ozcarToken.waitForDeployment();
    const tokenAddress = await ozcarToken.getAddress();
    console.log("OzcarToken deployed to:", tokenAddress);

    // 2. Deploy OzcarEscrow
    const OzcarEscrow = await ethers.getContractFactory("OzcarEscrow");
    const ozcarEscrow = await OzcarEscrow.deploy(deployer.address, tokenAddress);
    await ozcarEscrow.waitForDeployment();
    const escrowAddress = await ozcarEscrow.getAddress();
    console.log("OzcarEscrow deployed to:", escrowAddress);

    // 3. Deploy OzcarVehicleHistory
    const OzcarVehicleHistory = await ethers.getContractFactory("OzcarVehicleHistory");
    const ozcarVehicleHistory = await OzcarVehicleHistory.deploy(deployer.address);
    await ozcarVehicleHistory.waitForDeployment();
    const historyAddress = await ozcarVehicleHistory.getAddress();
    console.log("OzcarVehicleHistory deployed to:", historyAddress);

    // 4. Deploy OzcarAppraisalNFT
    const OzcarAppraisalNFT = await ethers.getContractFactory("OzcarAppraisalNFT");
    const appraisalNFT = await OzcarAppraisalNFT.deploy(deployer.address);
    await appraisalNFT.waitForDeployment();
    const appraisalAddress = await appraisalNFT.getAddress();
    console.log("OzcarAppraisalNFT deployed to:", appraisalAddress);

    // 5. Deploy OzcarLoanDisbursement
    const OzcarLoanDisbursement = await ethers.getContractFactory("OzcarLoanDisbursement");
    const loanDisbursement = await OzcarLoanDisbursement.deploy(deployer.address, tokenAddress, escrowAddress);
    await loanDisbursement.waitForDeployment();
    const loanAddress = await loanDisbursement.getAddress();
    console.log("OzcarLoanDisbursement deployed to:", loanAddress);

    // Permissions
    const FUNDER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("FUNDER_ROLE"));
    await ozcarEscrow.grantRole(FUNDER_ROLE, loanAddress);
    console.log("Granted FUNDER_ROLE to LoanDisbursement contract");

    // Save addresses
    const output = {
        OzcarToken: tokenAddress,
        OzcarEscrow: escrowAddress,
        OzcarVehicleHistory: historyAddress,
        OzcarAppraisalNFT: appraisalAddress,
        OzcarLoanDisbursement: loanAddress,
        network: "amoy",
        timestamp: new Date().toISOString()
    };

    fs.writeFileSync("deployed_amoy.json", JSON.stringify(output, null, 2));
    console.log("Deployment data saved to deployed_amoy.json");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

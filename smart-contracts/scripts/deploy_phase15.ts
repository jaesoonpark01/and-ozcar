import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Get Payment Token (OZC) Address - Assuming it's already deployed or we deploy fresh
    // For dev stability, let's deploy a fresh Token for this phase or use a known one.
    // I'll check previous deployment or just deploy fresh for independence.
    const OzcarToken = await ethers.getContractFactory("OzcarToken");
    const token = await OzcarToken.deploy(deployer.address);
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    console.log("OzcarToken (Payment Token) deployed to:", tokenAddress);

    // 2. Deploy OzcarEscrow
    const OzcarEscrow = await ethers.getContractFactory("OzcarEscrow");
    const escrow = await OzcarEscrow.deploy(deployer.address, tokenAddress);
    await escrow.waitForDeployment();
    const escrowAddress = await escrow.getAddress();
    console.log("OzcarEscrow deployed to:", escrowAddress);

    // 3. Deploy OzcarAppraisalNFT
    const OzcarAppraisalNFT = await ethers.getContractFactory("OzcarAppraisalNFT");
    const appraisalNFT = await OzcarAppraisalNFT.deploy();
    await appraisalNFT.waitForDeployment();
    const appraisalNFTAddress = await appraisalNFT.getAddress();
    console.log("OzcarAppraisalNFT deployed to:", appraisalNFTAddress);

    // 4. Deploy OzcarLoanDisbursement
    const OzcarLoanDisbursement = await ethers.getContractFactory("OzcarLoanDisbursement");
    const loanDisbursement = await OzcarLoanDisbursement.deploy(tokenAddress, escrowAddress);
    await loanDisbursement.waitForDeployment();
    const loanDisbursementAddress = await loanDisbursement.getAddress();
    console.log("OzcarLoanDisbursement deployed to:", loanDisbursementAddress);

    // 5. Setup Permissions
    // Grant FUNDER_ROLE to Loan contract in Escrow
    const FUNDER_ROLE = await escrow.FUNDER_ROLE();
    await escrow.grantRole(FUNDER_ROLE, loanDisbursementAddress);
    console.log("Granted FUNDER_ROLE to LoanDisbursement in Escrow");

    // Save addresses to JSON
    const deploymentInfo = {
        token: tokenAddress,
        escrow: escrowAddress,
        appraisalNFT: appraisalNFTAddress,
        loanDisbursement: loanDisbursementAddress
    };
    fs.writeFileSync("deployed_address_phase15.json", JSON.stringify(deploymentInfo, null, 2));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

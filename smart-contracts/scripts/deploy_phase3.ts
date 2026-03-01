
import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy Reputation & Token (Dependencies)
    // In a real scenario, we might use existing addresses. For dev, we deploy fresh.
    const OzcarToken = await ethers.getContractFactory("OzcarToken");
    const token = await OzcarToken.deploy(deployer.address);
    await token.waitForDeployment();
    console.log(`OzcarToken deployed to: ${await token.getAddress()}`);

    const OzcarReputation = await ethers.getContractFactory("OzcarReputation");
    const reputation = await OzcarReputation.deploy(deployer.address, await token.getAddress());
    await reputation.waitForDeployment();
    console.log(`OzcarReputation deployed to: ${await reputation.getAddress()}`);

    // 2. Deploy Reward Calculator
    const RewardCalculator = await ethers.getContractFactory("OzcarRewardCalculator");
    const calculator = await RewardCalculator.deploy(
        await reputation.getAddress(),
        await token.getAddress(),
        deployer.address
    );
    await calculator.waitForDeployment();
    console.log(`OzcarRewardCalculator deployed to: ${await calculator.getAddress()}`);

    // Grant MINTER_ROLE to RewardCalculator
    const MINTER_ROLE = await token.MINTER_ROLE();
    await token.grantRole(MINTER_ROLE, await calculator.getAddress());
    console.log("Granted MINTER_ROLE to RewardCalculator");

    // 3. Deploy Trade-In Settlement (Escrow)
    const TradeInSettlement = await ethers.getContractFactory("OzcarTradeInSettlement");
    const escrow = await TradeInSettlement.deploy(deployer.address);
    await escrow.waitForDeployment();
    console.log(`OzcarTradeInSettlement deployed to: ${await escrow.getAddress()}`);

    console.log("Deployment Complete!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

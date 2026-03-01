import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy OzcarToken (ERC20)
    const OzcarToken = await ethers.getContractFactory("OzcarToken");
    const token = await OzcarToken.deploy(deployer.address);
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    console.log("OzcarToken deployed to:", tokenAddress);

    // 2. Deploy VehicleNFT (ERC721)
    // Note: Replaced OzcarNFT with VehicleNFT as that is the one we upgraded
    const VehicleNFT = await ethers.getContractFactory("VehicleNFT");
    const nft = await VehicleNFT.deploy(deployer.address, tokenAddress);
    await nft.waitForDeployment();
    const nftAddress = await nft.getAddress();
    console.log("VehicleNFT deployed to:", nftAddress);

    // 3. Deploy OzcarReputation
    const OzcarReputation = await ethers.getContractFactory("OzcarReputation");
    const reputation = await OzcarReputation.deploy(deployer.address, tokenAddress);
    await reputation.waitForDeployment();
    const reputationAddress = await reputation.getAddress();
    console.log("OzcarReputation deployed to:", reputationAddress);

    // 4. Deploy OzcarEscrow (With Token address)
    const OzcarEscrow = await ethers.getContractFactory("OzcarEscrow");
    const escrow = await OzcarEscrow.deploy(deployer.address, tokenAddress);
    await escrow.waitForDeployment();
    const escrowAddress = await escrow.getAddress();
    console.log("OzcarEscrow deployed to:", escrowAddress);

    // 5. Fund VehicleNFT for Rewards
    // Mint 10,000 OZC to the NFT contract so it can distribute 15 OZC rewards
    console.log("Funding VehicleNFT with OZC for rewards...");
    const fundingTx = await token.mint(nftAddress, ethers.parseEther("10000"));
    await fundingTx.wait();
    console.log("VehicleNFT funded with 10,000 OZC");

    // Save addresses to frontend
    const addresses = {
        OzcarToken: tokenAddress,
        VehicleNFT: nftAddress,
        OzcarReputation: reputationAddress,
        OzcarEscrow: escrowAddress
    };

    const frontendDir = path.join(__dirname, "../../frontend/src/contracts");
    if (!fs.existsSync(frontendDir)) {
        fs.mkdirSync(frontendDir, { recursive: true });
    }

    fs.writeFileSync(
        path.join(frontendDir, "contract-addresses.json"),
        JSON.stringify(addresses, null, 2)
    );

    console.log("Contract addresses saved to frontend/src/contracts/contract-addresses.json");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

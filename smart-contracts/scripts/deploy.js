const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy OzcarToken
    const OzcarToken = await hre.ethers.getContractFactory("OzcarToken");
    const token = await OzcarToken.deploy(deployer.address);
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    console.log("OzcarToken deployed to:", tokenAddress);

    // 2. Deploy VehicleNFT
    const VehicleNFT = await hre.ethers.getContractFactory("VehicleNFT");
    const nft = await VehicleNFT.deploy(deployer.address);
    await nft.waitForDeployment();
    const nftAddress = await nft.getAddress();
    console.log("VehicleNFT deployed to:", nftAddress);

    // 3. Deploy OzcarEscrow
    const OzcarEscrow = await hre.ethers.getContractFactory("OzcarEscrow");
    const escrow = await OzcarEscrow.deploy(deployer.address);
    await escrow.waitForDeployment();
    const escrowAddress = await escrow.getAddress();
    console.log("OzcarEscrow deployed to:", escrowAddress);

    // Save addresses to frontend
    const addresses = {
        OzcarToken: tokenAddress,
        VehicleNFT: nftAddress,
        OzcarEscrow: escrowAddress,
    };

    const frontendDir = path.join(__dirname, "../../frontend/src/contracts");
    if (!fs.existsSync(frontendDir)) {
        fs.mkdirSync(frontendDir, { recursive: true });
    }

    fs.writeFileSync(
        path.join(frontendDir, "contract-addresses.json"),
        JSON.stringify(addresses, null, 2)
    );

    // Also copy artifacts (ABI)
    const artifactsDir = path.join(__dirname, "../artifacts/contracts");
    const frontendArtifactsDir = path.join(frontendDir, "abis");
    if (!fs.existsSync(frontendArtifactsDir)) {
        fs.mkdirSync(frontendArtifactsDir, { recursive: true });
    }

    // Copy ABIs
    ["OzcarToken", "VehicleNFT", "OzcarEscrow"].forEach(name => {
        const artifact = require(path.join(artifactsDir, `${name}.sol/${name}.json`));
        fs.writeFileSync(
            path.join(frontendArtifactsDir, `${name}.json`),
            JSON.stringify(artifact, null, 2)
        );
    });

    console.log("Artifacts and addresses saved to frontend.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

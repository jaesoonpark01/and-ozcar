// scripts/simulate_governance.ts
// 초보 차주의 거버넌스 참여 시뮬레이션 - 전체 자동 실행
import { ethers } from "hardhat";

async function main() {
    console.log("═══════════════════════════════════════════════");
    console.log("  🚗 OZCAR 거버넌스 시뮬레이션 시작");
    console.log("═══════════════════════════════════════════════\n");

    const [deployer, kimMinsu, mechanic, buyer] = await ethers.getSigners();

    // ═══════════════════════════════════════
    // Phase 1: 컨트랙트 배포
    // ═══════════════════════════════════════
    console.log("📦 Phase 1: 컨트랙트 배포...");

    // OZC Token
    const OzcarToken = await ethers.getContractFactory("OzcarToken");
    const ozcToken = await OzcarToken.deploy(deployer.address);
    await ozcToken.waitForDeployment();
    const ozcAddr = await ozcToken.getAddress();
    console.log("   ✅ OzcarToken:", ozcAddr);

    // VehicleNFT
    const VehicleNFT = await ethers.getContractFactory("VehicleNFT");
    const vehicleNFT = await VehicleNFT.deploy(deployer.address);
    await vehicleNFT.waitForDeployment();
    const nftAddr = await vehicleNFT.getAddress();
    console.log("   ✅ VehicleNFT:", nftAddr);

    // OzcarGovernance
    const Governance = await ethers.getContractFactory("OzcarGovernance");
    const governance = await Governance.deploy(deployer.address, ozcAddr);
    await governance.waitForDeployment();
    const govAddr = await governance.getAddress();
    console.log("   ✅ OzcarGovernance:", govAddr);

    // ═══════════════════════════════════════
    // Phase 2: 차량 등록 (VehicleNFT)
    // ═══════════════════════════════════════
    console.log("\n🚗 Phase 2: 김민수 차량 등록...");
    await vehicleNFT.connect(deployer).mintVehicle(
        kimMinsu.address,
        "QmAvante2022MetadataHash"
    );
    const nftBalance = await vehicleNFT.balanceOf(kimMinsu.address);
    console.log("   ✅ 김민수 보유 차량:", nftBalance.toString(), "대");

    // ═══════════════════════════════════════
    // Phase 3: OZC 토큰 분배
    // ═══════════════════════════════════════
    console.log("\n💰 Phase 3: OZC 토큰 분배...");

    // 김민수: 1000 OZC
    await ozcToken.transfer(kimMinsu.address, ethers.parseEther("1000"));
    console.log("   ✅ 김민수: 1,000 OZC");

    // 정비사: 500 OZC
    await ozcToken.transfer(mechanic.address, ethers.parseEther("500"));
    console.log("   ✅ 정비사: 500 OZC");

    // 구매자 (케이스 제출용): 100 OZC
    await ozcToken.transfer(buyer.address, ethers.parseEther("100"));
    console.log("   ✅ 구매자: 100 OZC");

    // 보상 풀 충전
    await ozcToken.transfer(govAddr, ethers.parseEther("10000"));
    console.log("   ✅ 보상 풀: 10,000 OZC");

    // ═══════════════════════════════════════
    // Phase 4: 배심원 등록
    // ═══════════════════════════════════════
    console.log("\n📝 Phase 4: 배심원 등록...");

    // 김민수 배심원 등록
    await ozcToken.connect(kimMinsu).approve(govAddr, ethers.parseEther("10"));
    await governance.connect(kimMinsu).registerAsJuror(1);
    console.log("   ✅ 김민수 → Citizen Jury (투표력 1x)");

    // 정비사 배심원 등록
    await ozcToken.connect(mechanic).approve(govAddr, ethers.parseEther("10"));
    await governance.connect(mechanic).registerAsJuror(1);
    console.log("   ✅ 정비사 → Citizen Jury (투표력 1x)");

    // 잔액 확인
    const kimOzc = await ozcToken.balanceOf(kimMinsu.address);
    console.log("   김민수 잔액:", ethers.formatEther(kimOzc), "OZC");

    // ═══════════════════════════════════════
    // Phase 5: 분쟁 케이스 제출
    // ═══════════════════════════════════════
    console.log("\n⚖️  Phase 5: 분쟁 케이스 제출...");
    console.log("   시나리오: 구매자가 사고이력 미고지 분쟁 제기");

    const caseTx = await governance.connect(buyer).submitCase(
        5, // VEHICLE_CONDITION_DISPUTE
        "QmDisputeEvidence_AccidentHistoryNotDisclosed"
    );
    const caseReceipt = await caseTx.wait();

    // 이벤트에서 caseId 추출
    const caseEvent = caseReceipt!.logs.find((log: any) => {
        try {
            const parsed = governance.interface.parseLog({ topics: [...log.topics], data: log.data });
            return parsed?.name === "CaseSubmitted";
        } catch { return false; }
    });

    const parsedEvent = governance.interface.parseLog({
        topics: [...caseEvent!.topics],
        data: caseEvent!.data
    });
    const caseId = parsedEvent!.args.caseId;
    console.log("   ✅ 케이스 ID:", caseId.slice(0, 18) + "...");

    // ═══════════════════════════════════════
    // Phase 6: 투표
    // ═══════════════════════════════════════
    console.log("\n🗳️  Phase 6: 배심원 투표...");

    // 김민수 투표 (구매자 주장 지지)
    await governance.connect(kimMinsu).vote(caseId, true);
    console.log("   ✅ 김민수 → Valid (구매자 주장 정당)");

    // 정비사 투표 (구매자 주장 지지)
    await governance.connect(mechanic).vote(caseId, true);
    console.log("   ✅ 정비사 → Valid (구매자 주장 정당)");

    // 투표 현황
    const votes = await governance.getCaseVotes(caseId);
    console.log("\n   📊 투표 현황:");
    let validPower = 0, invalidPower = 0;
    for (const v of votes) {
        const tierName = ["Citizen", "Expert", "Grand Jury"][Number(v.tier)];
        const emoji = v.decision ? "✅" : "❌";
        console.log(`      ${v.juror.slice(0, 10)}... [${tierName}] → ${emoji} (${v.votingPower}x)`);
        if (v.decision) validPower += Number(v.votingPower);
        else invalidPower += Number(v.votingPower);
    }
    console.log(`\n      Valid: ${validPower}표 vs Invalid: ${invalidPower}표`);

    // ═══════════════════════════════════════
    // Phase 7: 케이스 종료 + 보상 분배
    // ═══════════════════════════════════════
    console.log("\n⏰ Phase 7: 24시간 경과 → 케이스 종료...");

    // 시간 경과 시뮬레이션
    await ethers.provider.send("evm_increaseTime", [86400]);
    await ethers.provider.send("evm_mine", []);

    const beforeBalance = await ozcToken.balanceOf(kimMinsu.address);

    // 케이스 종료
    await governance.finalizeCase(caseId);

    const afterBalance = await ozcToken.balanceOf(kimMinsu.address);
    const reward = afterBalance - beforeBalance;

    const finalCase = await governance.cases(caseId);
    const statusNames = ["PENDING", "VALIDATED", "REJECTED", "DISPUTED"];

    console.log("   ✅ 케이스 종료!");
    console.log("   판결:", statusNames[Number(finalCase.status)]);
    console.log("   → 구매자 주장 인정, 환불 처리 진행");

    console.log("\n   💰 보상 결과:");
    console.log("      김민수 보상:", ethers.formatEther(reward), "OZC");
    console.log("      김민수 총 잔액:", ethers.formatEther(afterBalance), "OZC");

    // 최종 통계
    const finalStats = await governance.getJurorStats(kimMinsu.address);
    console.log("\n   📊 김민수 최종 통계:");
    console.log("      등급:", ["Citizen", "Expert", "Grand Jury"][Number(finalStats.tier)]);
    console.log("      투표력:", finalStats.votingPower.toString() + "x");
    console.log("      총 투표:", finalStats.totalVotes.toString());
    console.log("      정확한 투표:", finalStats.correctVotes.toString());
    console.log("      정확도:", finalStats.accuracy.toString() + "%");

    // ═══════════════════════════════════════
    // 결과 요약
    // ═══════════════════════════════════════
    console.log("\n═══════════════════════════════════════════════");
    console.log("  🎉 시뮬레이션 완료!");
    console.log("═══════════════════════════════════════════════");
    console.log(`
    김민수의 여정:
    ┌─────────────────────────────────────────┐
    │ 1. 차량 등록     → 아반떼 NFT 민팅      │
    │ 2. OZC 확보      → 1,000 OZC 보유       │
    │ 3. 배심원 등록   → Citizen (10 OZC 스테이킹) │
    │ 4. 케이스 투표   → 구매자 주장 지지      │
    │ 5. 보상 수령     → ${ethers.formatEther(reward)} OZC 획득         │
    │ 6. 정확도        → ${finalStats.accuracy}%                  │
    └─────────────────────────────────────────┘
    `);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

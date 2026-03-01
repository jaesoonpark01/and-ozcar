"use client";

/**
 * Ozcar 알림 서비스 (Mock)
 * 카카오 알림톡 및 푸시 메시지 발송 시뮬레이션
 */
export class NotificationService {
    static async sendGenesisLaunchAlimTalk(userPhone: string, userName: string) {
        console.log(`[AlimTalk Sent] To: ${userPhone}`);
        console.log(`내용: [Ozcar DAO] ${userName}님, 드라이버의 시대가 열렸습니다! Genesis NFT를 확인하세요.`);
        return { success: true, messageId: "msg_" + Math.random().toString(36).substr(2, 9) };
    }

    static async sendVoteReminderPush(userAddress: string, proposalTitle: string) {
        console.log(`[Push Sent] To: ${userAddress}`);
        console.log(`내용: 당신의 투표가 내 차의 가치를 결정합니다. '${proposalTitle}' 투표에 참여하세요!`);
        return { success: true };
    }

    static async sendRewardClaimedAlimTalk(userPhone: string, amount: number) {
        console.log(`[AlimTalk Sent] To: ${userPhone}`);
        console.log(`내용: [Ozcar Reward] 축하합니다! ${amount} OZC 리워드가 지급되었습니다.`);
        return { success: true };
    }
}

import {Reward, RewardList} from "../models/reward";

export interface RewardRepository {
    createReward(reward: Reward): Promise<void>;
    getRewardDetails(userId: string, rewardName: string): Promise<Reward>;
    getRewardList(userId: string): Promise<RewardList[]>;
}
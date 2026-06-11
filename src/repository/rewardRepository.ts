export interface RewardRepository {
    createReward(reward: Reward): Promise <void>;
}
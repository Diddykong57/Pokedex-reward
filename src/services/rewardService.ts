import {CreateRewardRequestDto} from "../dto/createRewardRequest.dto";
import {Reward, RewardList} from "../models/reward";

export interface RewardService {
    createReward(reward: CreateRewardRequestDto): Promise<Reward | undefined>
    getRewardDetails(userId: string, amount: number): Promise<Reward | null>
    getRewardList(userId: string): Promise<RewardList[]>
}
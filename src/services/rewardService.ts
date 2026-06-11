import {CreateRewardRequestDto} from "../dto/createRewardRequest.dto";

export interface RewardService {
    createReward(reward: CreateRewardRequestDto): Promise<void>
}
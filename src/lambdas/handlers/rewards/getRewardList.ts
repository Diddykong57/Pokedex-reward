import {RewardService} from "../../../services/rewardService";

export const getRewardListHandler = async (
    service: RewardService,
    userId: string,
) => {
    return await service.getRewardList(userId);
}
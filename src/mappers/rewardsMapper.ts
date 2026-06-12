import {REWARD_ITEM} from "../global/constants/pokemonAdded";
import {RewardItem} from "../repository/types/rewardItem";
import {Reward, RewardList} from "../models/reward";

export const rewardToRewardItem = (reward: Reward): RewardItem=> {
    return {
        PK: `${REWARD_ITEM.PK_PREFIX}#${reward.userId}`,
        SK: `${REWARD_ITEM.SK}#${reward.entityType}`,
        entityType: reward.entityType,
        text: reward.text,
        createdAt: reward.createdAt,
    }
}

export const toRewardFromRewardItem = (item: RewardItem): RewardList => ({
    reward: item.entityType,
    text: item.text,
})
import {REWARD_ITEM} from "../global/rewards/pokemonAdded";
import {RewardItem} from "../repository/types/rewardItem";

export const rewardToRewardItem = (reward: Reward): RewardItem=> {
    return {
        PK: `${REWARD_ITEM.PK_PREFIX}#${reward.userId}`,
        SK: `${REWARD_ITEM.SK}#${reward.entityType}`,
        entityType: reward.entityType,
        text: reward.text,
        createdAt: reward.createdAt,
    }
}
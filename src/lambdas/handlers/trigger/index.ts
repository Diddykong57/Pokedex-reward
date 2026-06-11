import {RewardServiceImpl} from "../../../services/impl/rewardServiceImpl";
import {DynamoRewardRepository} from "../../../repository/impl/dynamoRewardRepository";
import {RewardService} from "../../../services/rewardService";
import {RewardRepository} from "../../../repository/rewardRepository";

const repository: RewardRepository = new DynamoRewardRepository();
const service: RewardService = new RewardServiceImpl(repository);

export const triggerRewardHandler = async (event: any) => {
    for (const record of event.Records) {
        const body = JSON.parse(record.body);

        const dto = {
            userId: body.detail.userId,
            nbOfPokemonOwned: body.detail.nbOfPokemonOwned,
        }
        await service.createReward(dto);
    }


    // switch (event.event_type) {
    //     case
    // }
}
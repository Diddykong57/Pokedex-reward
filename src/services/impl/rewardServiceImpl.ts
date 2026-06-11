import {RewardService} from "../rewardService";
import {RewardRepository} from "../../repository/rewardRepository";
import {CreateRewardRequestDto} from "../../dto/createRewardRequest.dto";
import {generateId} from "../../utils/idUtils";
import {getCurrentDate} from "../../utils/dateUtils";
import {PokemonAddedRewards} from "../../global/rewards/pokemonAdded";

export class RewardServiceImpl implements RewardService {
    constructor(
       private readonly repository: RewardRepository
    ) {}

    async createReward(data: CreateRewardRequestDto): Promise<void> {
        const id = generateId();
        const now = getCurrentDate();

        const achievement = this.getAssociatedReward(data.nbOfPokemonOwned);

        if (achievement === null){
            return;
        }

        const reward: Reward = {
            id: id,
            userId: data.userId,
            entityType: achievement,
            text: `You have completed the achievement ${achievement}`,
            createdAt: now
        }

        await this.repository.createReward(reward);
        // return userId + text
    }

    getAssociatedReward(amount: number): string | null {
        return PokemonAddedRewards[amount] ?? null ;
    }
}
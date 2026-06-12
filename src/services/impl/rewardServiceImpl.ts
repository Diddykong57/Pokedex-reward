import {RewardService} from "../rewardService";
import {RewardRepository} from "../../repository/rewardRepository";
import {CreateRewardRequestDto} from "../../dto/createRewardRequest.dto";
import {generateId} from "../../utils/idUtils";
import {getCurrentDate} from "../../utils/dateUtils";
import {PokemonAddedRewards} from "../../global/constants/pokemonAdded";
import {Reward, RewardList} from "../../models/reward";
import {notFoundError} from "../../utils/errorUtils";

export class RewardServiceImpl implements RewardService {
    constructor(
       private readonly repository: RewardRepository
    ) {}

    async createReward(data: CreateRewardRequestDto): Promise<Reward | undefined> {
        const achievement = this.getAssociatedReward(data.nbOfPokemonOwned);

        if (achievement === null){
            return;
        }

        const id = generateId();
        const now = getCurrentDate();

        const existingReward = await this.isRewardAlreadyExisting(data);
        if (existingReward){
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
        return reward;
    }

    async getRewardDetails(userId: string, amount: number): Promise<Reward | null> {
        const rewardName = this.getAssociatedReward(amount);
        if (!rewardName){
            throw notFoundError(`pokemon-added: ${amount}`);
        }
        return await this.repository.getRewardDetails(userId, rewardName);
    }

    async getRewardList(userId: string): Promise<RewardList[]> {
        return await this.repository.getRewardList(userId);
    }

    private getAssociatedReward(amount: number): string | null {
        return PokemonAddedRewards[amount] ?? null ;
    }

    private async isRewardAlreadyExisting(data: {userId: string, nbOfPokemonOwned: number}) : Promise<boolean>{
        try {
            const existingReward = await this.getRewardDetails(data.userId, data.nbOfPokemonOwned);
            return existingReward ? true : false;
        } catch {
            return false;
        }
    }
}
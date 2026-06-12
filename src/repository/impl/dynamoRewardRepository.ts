import {RewardRepository} from "../rewardRepository";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand} from "@aws-sdk/lib-dynamodb";
import {rewardToRewardItem, toRewardFromRewardItem} from "../../mappers/rewardsMapper";
import {REWARD_ITEM} from "../../global/constants/pokemonAdded";
import {notFoundError} from "../../utils/errorUtils";
import {ERROR_MESSAGES} from "../../global/constants/errorMessages";
import {RewardItem} from "../types/rewardItem";
import {Reward, RewardList} from "../../models/reward";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export class DynamoRewardRepository implements RewardRepository{
    private readonly tableName = process.env.TABLE_NAME!
    async createReward(reward: Reward): Promise<void> {

        const rewardItem = rewardToRewardItem(reward);

        await docClient.send(
            new PutCommand({
                TableName: this.tableName,
                Item: rewardItem,
            })
        );
    }

    async getRewardDetails(userId: string, rewardName: string): Promise<Reward> {
        const pk = this.buildPk(userId);
        const sk = `${REWARD_ITEM.SK}#${rewardName}`;
        const response = await docClient.send(
            new GetCommand({
                TableName: this.tableName,
                Key: {PK: pk, SK: sk}
            })
        );

        if (!response.Item) {
            throw notFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }

        return response.Item as Reward;

    }

    async getRewardList(userId: string): Promise<RewardList[]> {
        let response;
        const pk = this.buildPk(userId);
        const params = {
            TableName: this.tableName,
            KeyConditionExpression: "PK = :pk",
            ExpressionAttributeValues: {
                ":pk": pk,
            },
        }

        response = await docClient.send(new QueryCommand(params));

        const rewardList = (response.Items ?? []) as RewardItem[];

        return rewardList.map(item => toRewardFromRewardItem(item));
    }

    private buildPk(userId: string): string {
        return `${REWARD_ITEM.PK_PREFIX}#${userId}`;
    }

}
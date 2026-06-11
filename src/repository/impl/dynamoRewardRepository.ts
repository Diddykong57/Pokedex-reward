import {RewardRepository} from "../rewardRepository";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, PutCommand} from "@aws-sdk/lib-dynamodb";
import {rewardToRewardItem} from "../../mappers/rewardsMapper";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export class DynamoRewardRepository implements RewardRepository{

    async createReward(reward: Reward): Promise<void> {

        const rewardItem = rewardToRewardItem(reward);

        await docClient.send(
            new PutCommand({
                TableName: process.env.TABLE_NAME!,
                Item: rewardItem,
            })
        );
    }

}
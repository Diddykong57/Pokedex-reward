import {RewardServiceImpl} from "../../../services/impl/rewardServiceImpl";
import {DynamoRewardRepository} from "../../../repository/impl/dynamoRewardRepository";
import {RewardService} from "../../../services/rewardService";
import {RewardRepository} from "../../../repository/rewardRepository";
import {isHttpError} from "http-errors";
import {ERROR_MESSAGES} from "../../../global/constants/errorMessages";
import {HTTP} from "../../../global/constants/httpStatus";
import {buildResponse} from "../utils/buildResponse";

const repository: RewardRepository = new DynamoRewardRepository();
const service: RewardService = new RewardServiceImpl(repository);

export const triggerRewardHandler = async (event: any) => {
    let responses = [];
    let response;
    try {
        for (const record of event.Records) {
            const body = JSON.parse(record.body);

            const dto = {
                userId: body.detail.userId,
                nbOfPokemonOwned: body.detail.nbOfPokemonOwned,
            }
            try {
                const callback = await service.createReward(dto);
                response = buildResponse(HTTP.CREATED, callback)
            } catch (error) {
                if (isHttpError(error)){
                    response = buildResponse(error.statusCode, error.message);
                } else {
                    response = buildResponse(HTTP.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
                }
            }
            responses.push(response);
        }
        return buildResponse(HTTP.CREATED, responses);
    } catch {
        return buildResponse(HTTP.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }




    // switch (event.event_type) {
    //     case
    // }
}
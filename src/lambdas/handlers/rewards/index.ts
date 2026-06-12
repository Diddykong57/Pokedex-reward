import type { APIGatewayProxyEvent } from "aws-lambda";
import {RewardRepository} from "../../../repository/rewardRepository";
import {RewardServiceImpl} from "../../../services/impl/rewardServiceImpl";
import {RewardService} from "../../../services/rewardService";
import {DynamoRewardRepository} from "../../../repository/impl/dynamoRewardRepository";
import {getAuthContext} from "../utils/authMiddleware";
import {getRewardDetailsHandler} from "./getRewardDetails";
import {getRewardListHandler} from "./getRewardList";
import {buildResponse} from "../utils/buildResponse";
import {HTTP} from "../../../global/constants/httpStatus";
import {ERROR_MESSAGES} from "../../../global/constants/errorMessages";
import {isHttpError} from "http-errors";

const repository: RewardRepository = new DynamoRewardRepository();
const service : RewardService = new RewardServiceImpl(repository);

export const rewardMainHandler = async (event: APIGatewayProxyEvent) => {
    switch (event.httpMethod) {
        case "GET":
            try {
                const auth = getAuthContext(event);
                if (event.pathParameters?.id) {
                    const response = await getRewardDetailsHandler(service, auth.userId, event.pathParameters.id);
                    return buildResponse(HTTP.OK, response)
                }
                const response = await getRewardListHandler(service, auth.userId);
                return buildResponse(HTTP.OK, response)
            } catch (error) {
                if (isHttpError(error)){
                    return buildResponse(error.statusCode, error.message);
                } else {
                    return buildResponse(HTTP.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
                }
            }


        default:
            return buildResponse(HTTP.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
    }
}
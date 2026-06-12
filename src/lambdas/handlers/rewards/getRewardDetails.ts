import {RewardService} from "../../../services/rewardService";
import {badRequestError} from "../../../utils/errorUtils";

export const getRewardDetailsHandler = async (
    service: RewardService,
    userId: string,
    parameter: string
) => {
    const amount = Number(parameter);

    if (!Number.isInteger(amount)) {
        throw badRequestError();
    }

    return await service.getRewardDetails(userId, amount);

}
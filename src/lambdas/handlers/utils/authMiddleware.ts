import { APIGatewayProxyEvent } from "aws-lambda";
import {unauthorizedError} from "../../../utils/errorUtils";
import {AuthContext} from "../../../global/types/auth";

export const getAuthContext = (event: APIGatewayProxyEvent): AuthContext => {
    const claims = event.requestContext.authorizer?.claims;

    if (!claims?.sub) {
        throw unauthorizedError("Missing authenticated user");
    }

    const rawGroups = claims["cognito:groups"] ?? "";

    return {
        userId: claims.sub,
        email: claims.email,
        groups: rawGroups ? rawGroups.split(",") : [],
    };
};

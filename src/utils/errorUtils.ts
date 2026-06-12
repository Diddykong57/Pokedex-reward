import createError, { HttpError } from "http-errors";

import { HTTP } from "../global/constants/httpStatus";
import { ERROR_MESSAGES } from "../global/constants/errorMessages";

type ErrorDetails = Record<string, unknown>;

function buildHttpError(statusCode: number, message: string, details?: ErrorDetails): HttpError {
    const error = createError(statusCode, message);
    const errorWithDetails = error as HttpError & { details?: ErrorDetails };

    if (details) {
        errorWithDetails.details = details;
    }

    return errorWithDetails;
}

export function badRequestError(message = ERROR_MESSAGES.BAD_REQUEST, details?: ErrorDetails) {
    return buildHttpError(HTTP.BAD_REQUEST, message, details);
}

export function unauthorizedError(message = ERROR_MESSAGES.UNAUTHORIZED, details?: ErrorDetails) {
    return buildHttpError(HTTP.UNAUTHORIZED, message, details);
}

export function forbiddenError(message = ERROR_MESSAGES.FORBIDDEN, details?: ErrorDetails) {
    return buildHttpError(HTTP.FORBIDDEN, message, details);
}

export function notFoundError(message = ERROR_MESSAGES.ITEM_NOT_FOUND, details?: ErrorDetails) {
    return buildHttpError(HTTP.NOT_FOUND, message, details);
}

export function conflictError(message = ERROR_MESSAGES.ENTITY_ALREADY_EXISTS, details?: ErrorDetails) {
    return buildHttpError(HTTP.CONFLICT, message, details);
}

export function internalServerError(message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR, details?: ErrorDetails) {
    return buildHttpError(HTTP.INTERNAL_SERVER_ERROR, message, details);
}

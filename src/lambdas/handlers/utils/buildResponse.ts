export const buildResponse = (statusCode: number, message: any) => {
    return {
        statusCode,
        body: JSON.stringify({
            message
        })
    }
}

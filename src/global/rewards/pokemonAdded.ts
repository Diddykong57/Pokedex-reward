export const REWARD_ITEM = {
    PK_PREFIX: "USER",
    SK: "REWARD"
}

export const PokemonAddedRewards: Record<number, string> =  {
    1: "FIRST_POKEMON",
    5: "FIVE_POKEMON",
    10: "TEN_POKEMON",
    15: "FIFTEEN_POKEMON",
    20: "TWENTY_POKEMON",
    25: "TWENTY_FIVE_POKEMON",
    50: "FIFTY_POKEMON",
    100: "HUNDRED_POKEMON",
    250: "TWO_HUNDRED_FIFTY_POKEMON",
    500: "FIVE_HUNDRED_POKEMON",
} as const;

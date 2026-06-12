export interface Reward {
    id: string;
    userId: string;
    entityType: string;
    text: string
    createdAt: string;
}

export interface RewardList {
    reward: string;
    text: string
}

export interface IComment {
    id?: number;
    userId?: number;
    itemId?: number;
    title: string;
    description: string;
    createdAt?: string;
    deletedAt?: string;
}

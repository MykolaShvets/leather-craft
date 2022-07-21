export interface IItem {
    id?: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    sale: number;
    amount: number;
    height: number;
    width: number;
    colorId: number;
    materialId: number;
    categoryId: number;
    createdAt?: string;
    deletedAt?: string | null;
}

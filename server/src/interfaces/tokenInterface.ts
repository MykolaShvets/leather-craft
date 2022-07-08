import { IUser } from '../entity';

export interface ITokenDataToSave{
    refreshToken: string;
    accessToken: string;
    userId: number;
}

export interface ITokenPair{
    refreshToken: string;
    accessToken: string;
}

export interface IUserPayload{
    userId: number;
    userEmail: string;
    role?: string;
}

export type ITokenData = ITokenPair & { user: IUser }

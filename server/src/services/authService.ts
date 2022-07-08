import { IUser } from '../entity';
import { ITokenData } from '../interfaces';
import { userService } from './userService';
import { tokenService } from './tokenService';
import { cartService } from './cartService';
import { wishlistService } from './wishlistService';

class AuthService {
    public async registration(user: IUser): Promise<ITokenData> {
        const { email } = user;
        const userFromDb = await userService.getByEmail(email);

        if (userFromDb) {
            throw new Error(`User with email: ${email} already exist `);
        }

        const newUser = await userService.createUser(user);

        await cartService.createCart(newUser.id);
        await wishlistService.createWishlist(newUser.id);

        return this._getTokenData(newUser);
    }

    private async _getTokenData(userData: IUser): Promise<ITokenData> {
        const { id, email } = userData;
        let { role } = userData;
        if (!role) {
            role = 'user';
        }
        const tokenPair = await tokenService.generateTokenPair({ userId: id, userEmail: email, role });
        await tokenService.saveTokenPair(id, tokenPair.refreshToken, tokenPair.accessToken);

        return {
            ...tokenPair,
            user: userData,
        };
    }
}

export const authService = new AuthService();

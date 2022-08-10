import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IWishlist, IWishlistItem } from '../../interfaces/wishlistInterface';
import { wishlistService } from '../../services/wishlistService';

interface IInitialState {
  wishlist: IWishlist | null;
  wishlistItems: IWishlistItem[];
}

const initialState: IInitialState = {
    wishlist: null,
    wishlistItems: [],
};

export const getUserWishlist = createAsyncThunk(
    'wishlistSlice/getUserWishlist',
    async (_, { dispatch }) => {
        try {
            const { data } = await wishlistService.getWishlist();
            dispatch(SET_WISHLIST({ wishlist: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const getAllWishlistItems = createAsyncThunk(
    'wishlistSlice/getAllWishlistItems',
    async (_, { dispatch }) => {
        try {
            const { data } = await wishlistService.getWishlistItems();
            dispatch(SET_WISHLIST_ITEMS({ wishlistItems: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const addWishlistItem = createAsyncThunk(
    'wishlistSlice/addWishlistItem',
    async (itemId: number, { dispatch }) => {
        try {
            await wishlistService.addWishlistItem(itemId);

            const { data } = await wishlistService.getWishlistItems();
            dispatch(SET_WISHLIST_ITEMS({ wishlistItems: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const deleteWishlistItem = createAsyncThunk(
    'wishlistSlice/deleteWishlistItem',
    async (wishlistItemId: number, { dispatch }) => {
        try {
            await wishlistService.deleteWishlistItem(wishlistItemId);

            const { data } = await wishlistService.getWishlistItems();
            dispatch(SET_WISHLIST_ITEMS({ wishlistItems: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

const wishlistSlice = createSlice({
    name: 'wishlistSlice',
    initialState,
    reducers: {
        SET_WISHLIST: (state, action: PayloadAction<{wishlist: IWishlist}>) => {
            state.wishlist = action.payload.wishlist;
        },
        SET_WISHLIST_ITEMS: (state, action: PayloadAction<{wishlistItems: IWishlistItem[]}>) => {
            state.wishlistItems = action.payload.wishlistItems;
        },
    },
});

export const wishlistReducer = wishlistSlice.reducer;

export const { SET_WISHLIST, SET_WISHLIST_ITEMS } = wishlistSlice.actions;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICart, ICartItem } from '../../interfaces/cartInterface';
import { cartService } from '../../services/cartService';

interface IInitialState {
    cart: ICart | null;
    cartItems: ICartItem[];
    totalPrice: number;
}

const initialState: IInitialState = {
    cart: null,
    cartItems: [],
    totalPrice: 0,
};

export const getUserCart = createAsyncThunk(
    'cartSlice/getUserCart',
    async (_, { dispatch }) => {
        try {
            const { data } = await cartService.getCart();
            dispatch(SET_CART({ cart: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const getAllCartItems = createAsyncThunk(
    'cartSlice/getAllCartItems',
    async (_, { dispatch }) => {
        try {
            const { data } = await cartService.getCartItems();

            dispatch(SET_CART_ITEMS({ cartItems: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const addCartItems = createAsyncThunk(
    'cartSlice/addCartItems',
    async (itemId: number, { dispatch }) => {
        try {
            await cartService.addCartItem(itemId);

            const { data } = await cartService.getCartItems();

            dispatch(SET_CART_ITEMS({ cartItems: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const deleteCartItem = createAsyncThunk(
    'cartSlice/deleteCartItem',
    async (itemId: number, { dispatch }) => {
        try {
            await cartService.deleteCartItem(itemId);

            const { data } = await cartService.getCartItems();

            dispatch(SET_CART_ITEMS({ cartItems: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        SET_CART: (state, action: PayloadAction<{cart: ICart}>) => {
            state.cart = action.payload.cart;
        },
        SET_CART_ITEMS: (state, action: PayloadAction<{cartItems: ICartItem[]}>) => {
            state.cartItems = action.payload.cartItems;
        },
        TOTAL_PRICE: (state, action: PayloadAction<{totalPrice: number}>) => {
            state.totalPrice += action.payload.totalPrice;
        },
    },
});

export const cartReducer = cartSlice.reducer;

export const { SET_CART, SET_CART_ITEMS, TOTAL_PRICE } = cartSlice.actions;

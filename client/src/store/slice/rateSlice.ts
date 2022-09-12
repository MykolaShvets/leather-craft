import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IRate } from '../../interfaces/rateInterface';
import { rateService } from '../../services/rateService';

interface IInitialState {
    itemRates: IRate[] | null;
    userRates: IRate[] | null;
}

const initialState: IInitialState = {
    itemRates: null,
    userRates: null,
};

export const getItemRates = createAsyncThunk(
    'rateSlice/getItemRates',
    async (itemId: number, { dispatch }) => {
        try {
            const { data } = await rateService.getByItemId(itemId);
            dispatch(SET_ITEM_RATES({ rates: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const getUserRate = createAsyncThunk(
    'rateSlice/getUserRate',
    async (_, { dispatch }) => {
        try {
            const { data } = await rateService.getByUserId();
            dispatch(SET_USER_RATE({ rates: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const createRate = createAsyncThunk<void, {itemId: number, rate: number}>(
    'rateSlice/createRate',
    async ({ itemId, rate }, { dispatch }) => {
        try {
            await rateService.createRate(itemId, rate);
            const { data } = await rateService.getByItemId(itemId);
            dispatch(SET_ITEM_RATES({ rates: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const deleteRate = createAsyncThunk<void, {rateId: number, itemId: number}>(
    'rateSlice/deleteRate',
    async ({ rateId, itemId }, { dispatch }) => {
        try {
            await rateService.deleteRate(rateId);
            const { data } = await rateService.getByItemId(itemId);
            dispatch(SET_ITEM_RATES({ rates: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

const rateSlice = createSlice({
    name: 'rateSlice',
    initialState,
    reducers: {
        SET_ITEM_RATES: (state, action: PayloadAction<{rates: IRate[]}>) => {
            state.itemRates = action.payload.rates;
        },
        SET_USER_RATE: (state, action: PayloadAction<{rates: IRate[]}>) => {
            state.userRates = action.payload.rates;
        },
    },
});

export const rateReducer = rateSlice.reducer;
export const { SET_ITEM_RATES, SET_USER_RATE } = rateSlice.actions;

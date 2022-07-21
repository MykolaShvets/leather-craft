import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../interfaces/itemInterface';
import { IItemProps } from '../../interfaces/itemPropertiesInterface';
import { itemPropsService } from '../../services/itemPropsService';
import { itemService } from '../../services/itemService';

interface IInitialState {
    items: IItem[] | null;
    item: IItem | null;
    colors: IItemProps[] | null;
    materials: IItemProps[] | null;
    categories: IItemProps[] | null;
}

const initialState: IInitialState = {
    items: null,
    item: null,
    categories: null,
    materials: null,
    colors: null,
};

export const getItemProps = createAsyncThunk(
    'itemSlice/getItemProps',
    async (_, { dispatch }) => {
        try {
            const colors = await itemPropsService.getAllColors();
            const materials = await itemPropsService.getAllMaterials();
            const categories = await itemPropsService.getAllCategories();
            dispatch(SET_ITEM_PROPS({ colors: colors.data, materials: materials.data, categories: categories.data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const createNewItem = createAsyncThunk<void, IItem>(
    'itemSlice/createNewItem',
    async (item, { dispatch }) => {
        try {
            await itemService.addItem(item);

            const { data } = await itemService.getAll();

            dispatch(SET_ITEMS({ items: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

const itemSlice = createSlice({
    name: 'itemSlice',
    initialState,
    reducers: {
        SET_ITEM_PROPS: (
            state,
            actions: PayloadAction<{colors: IItemProps[], materials: IItemProps[], categories: IItemProps[]}>,
        ) => {
            state.colors = actions.payload.colors;
            state.materials = actions.payload.materials;
            state.categories = actions.payload.categories;
        },

        SET_ITEMS: (state, actions: PayloadAction<{items: IItem[]}>) => {
            state.items = actions.payload.items;
        },
    },
});

export const itemReducer = itemSlice.reducer;

export const { SET_ITEM_PROPS, SET_ITEMS } = itemSlice.actions;

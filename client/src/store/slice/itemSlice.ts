import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../interfaces/itemInterface';
import { IItemProps } from '../../interfaces/itemPropertiesInterface';
import { itemPropsService } from '../../services/itemPropsService';
import { itemService } from '../../services/itemService';
import { IFilterItems } from '../../interfaces/filterItemInterface';

interface IInitialState {
    items: IItem[];
    item: IItem | null;
    colors: IItemProps[];
    materials: IItemProps[];
    categories: IItemProps[];
    filteredObject: IFilterItems | null;
    itemPage: number;
    currentProps: {
        category: IItemProps | null;
        color: IItemProps | null;
        material: IItemProps | null;
    }
}

const initialState: IInitialState = {
    items: [],
    item: null,
    categories: [],
    materials: [],
    colors: [],
    filteredObject: null,
    itemPage: 1,
    currentProps: {
        category: null,
        color: null,
        material: null,
    },
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

export const getCurrentProps = createAsyncThunk<void, {categoryId: number, colorId: number, materialId: number}>(
    'itemSlice/getCurrentProps',
    async ({ categoryId, colorId, materialId }, { dispatch }) => {
        try {
            const color = await itemPropsService.getColorById(colorId);
            const material = await itemPropsService.getMaterialById(materialId);
            const category = await itemPropsService.getCategoryById(categoryId);

            dispatch(SET_CURRENT_PROPS({ color: color.data, category: category.data, material: material.data }));
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

            const { data } = await itemService.getAll(1);

            dispatch(SET_ITEMS({ items: data.data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const getAllItems = createAsyncThunk<void, {page: number}>(
    'itemSlice/getAllItems',
    async ({ page }, { dispatch }) => {
        try {
            const { data } = await itemService.getAll(page);
            dispatch(SET_ITEMS({ items: data.data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const getFilteredItems = createAsyncThunk<void, {page: number, filteredObject: IFilterItems}>(
    'utemSlice/getFilteredItems',
    async ({ page, filteredObject }, { dispatch }) => {
        try {
            const { data } = await itemService.getByFilter(page, filteredObject);

            dispatch(SET_ITEMS({ items: data.data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const getCurrentItem = createAsyncThunk(
    'itemSlice/getCurrentItem',
    async (id: number, { dispatch }) => {
        try {
            const { data } = await itemService.getById(id);
            dispatch(SET_ITEM({ item: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const editItem = createAsyncThunk<void, {editedItem: IItem, id: number, page: number}>(
    'itemSlice/editItem',
    async ({ editedItem, id, page }, { dispatch }) => {
        try {
            await itemService.editById(editedItem, id);

            const { data } = await itemService.getById(id);
            dispatch(SET_ITEM({ item: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const deleteItem = createAsyncThunk<void, {id: number, page: number}>(
    'itemSloice/deleteItem',
    async ({ id, page }, { dispatch }) => {
        try {
            await itemService.deleteById(id);

            const { data } = await itemService.getAll(page);
            dispatch(SET_ITEMS({ items: data.data }));
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
        SET_CURRENT_PROPS: (
            state,
            actions:PayloadAction<{color: IItemProps, material: IItemProps, category: IItemProps}>,
        ) => {
            state.currentProps.color = actions.payload.color;
            state.currentProps.category = actions.payload.category;
            state.currentProps.material = actions.payload.material;
        },
        SET_ITEMS: (state, actions: PayloadAction<{items: IItem[]}>) => {
            state.items = actions.payload.items;
        },
        SET_ITEM: (state, actions: PayloadAction<{item: IItem}>) => {
            state.item = actions.payload.item;
        },
        SET_FILTER: (state, action: PayloadAction<{filter: IFilterItems | null}>) => {
            state.filteredObject = action.payload.filter;
        },
    },
});

export const itemReducer = itemSlice.reducer;

export const {
    SET_ITEM_PROPS, SET_CURRENT_PROPS, SET_ITEMS, SET_ITEM, SET_FILTER,
} = itemSlice.actions;

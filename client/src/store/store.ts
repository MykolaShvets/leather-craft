import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { userReducer } from './slice/userSlice';
import { itemReducer } from './slice/itemSlice';

const rootReducer = combineReducers({
    userReducer,
    itemReducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];

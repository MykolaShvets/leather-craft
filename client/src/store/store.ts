import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { userReducer } from './slice/userSlice';
import { itemReducer } from './slice/itemSlice';
import { cartReducer } from './slice/cartSlice';
import { wishlistReducer } from './slice/wishlistSlice';

const rootReducer = combineReducers({
    userReducer,
    itemReducer,
    cartReducer,
    wishlistReducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];

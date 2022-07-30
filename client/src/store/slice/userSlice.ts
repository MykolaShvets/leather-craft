import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../interfaces/userInterface';
import { authService } from '../../services/authService';
import { ILoginForm } from '../../interfaces/loginInterface';
import { IUserForm } from '../../interfaces/userFormInterface';
import { userService } from '../../services/userService';

interface IInitialState {
    user: IUser | null;
    isAuth: boolean;
}

const initialState: IInitialState = {
    user: null,
    isAuth: false,
};

export const regNewUser = createAsyncThunk(
    'userSlice/regNewUser',
    async (user: IUser, { dispatch }) => {
        try {
            const { data } = await authService.registration(user);

            await localStorage.setItem('accessToken', data.accessToken);
            await localStorage.setItem('refreshToken', data.refreshToken);

            dispatch(SET_USER({ user: data.user }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const loginUser = createAsyncThunk(
    'userSlice/loginUser',
    async (user: ILoginForm, { dispatch }) => {
        try {
            const { data } = await authService.login(user);

            await localStorage.setItem('accessToken', data.accessToken);
            await localStorage.setItem('refreshToken', data.refreshToken);

            dispatch(SET_USER({ user: data.user }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const exitUser = createAsyncThunk(
    'userSlice/exitUser',
    async (_, { dispatch }) => {
        try {
            await authService.logout();

            await localStorage.removeItem('accessToken');
            await localStorage.removeItem('refreshToken');

            dispatch(EXIT());
        } catch (e) {
            console.log(e);
        }
    },
);

export const refreshToken = createAsyncThunk(
    'userSlice/refreshToken',
    async (_, { dispatch }) => {
        try {
            const { data } = await authService.refresh();
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            dispatch(SET_USER({ user: data.user }));
        } catch (e) {
            dispatch(EXIT());
        }
    },
);

export const updateUser = createAsyncThunk<void, {user: IUserForm, id: number}>(
    'userSlice/updateUser',
    async ({ user, id }, { dispatch }) => {
        try {
            await userService.updateById(user, id);
            dispatch(refreshToken());
        } catch (e) {
            console.log(e);
        }
    },
);

export const deleteUser = createAsyncThunk(
    'userSlice/deleteUser',
    async (id: number, { dispatch }) => {
        try {
            await userService.deleteById(id);

            await localStorage.removeItem('accessToken');
            await localStorage.removeItem('refreshToken');

            dispatch(EXIT());
        } catch (e) {
            console.log(e);
        }
    },
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        SET_USER: (state, action: PayloadAction<{ user: IUser }>) => {
            state.user = action.payload.user;
            state.isAuth = true;
        },
        EXIT: (state) => {
            state.user = null;
            state.isAuth = false;
        },
    },
});

export const userReducer = userSlice.reducer;

export const { EXIT, SET_USER } = userSlice.actions;

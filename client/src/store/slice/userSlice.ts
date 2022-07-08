import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../interfaces/userInterface';
import { authService } from '../../services/authService';
import { ILoginForm } from '../../interfaces/loginInterface';

interface IInitialState {
    user: IUser | null;
    isAuth: boolean;
}

const initialState: IInitialState = {
    user: null,
    isAuth: false,
}

export const regNewUser = createAsyncThunk(
    'userSlice/regNewUser',
    async (user: IUser, {dispatch}) => {
        try {
            const {data} = await authService.registration(user);

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            dispatch(SET_USER({user: data.user}))


        } catch (e) {
            console.log(e);
        }
    }
);

export const loginUser = createAsyncThunk(
    'userSlice/loginUser',
    async (user: ILoginForm, {dispatch}) => {
        try {
            const {data} = await authService.login(user);

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            dispatch(SET_USER({user: data.user}))


        } catch (e) {
            console.log(e);
        }
    }
);

export const exitUser = createAsyncThunk(
    'userSlice/exitUser',
    async (_, {dispatch}) => {
        try {
            await authService.logout();
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            dispatch(EXIT())
        } catch (e) {
            console.log(e);
        }
    }
)

export const refreshToken = createAsyncThunk(
    'userSlice/refreshToken',
    async (_, {dispatch}) => {
        try {
            const {data} = await authService.refresh();
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            dispatch(SET_USER({user: data.user}))
        } catch (e) {
            dispatch(EXIT())
        }
    }
)


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
    }
});

export const userReducer = userSlice.reducer

export const {EXIT, SET_USER} = userSlice.actions;

import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/ShopPage/ShopPage';
import UserPage from './pages/UserPage/UserPage';
import AboutPage from './pages/AboutPage/AboutPage';
import AuthPage from './pages/AuthPage/AuthPage';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { refreshToken } from './store/slice/userSlice';
import { log } from 'util';

function App() {
    const {isAuth} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
            dispatch(refreshToken())

    }, [])

    return (
        <Routes>

            <Route path={'/'} element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={'/shop'} element={<ShopPage/>}/>
                {isAuth && <Route path={'/:userId'} element={<UserPage/>}/>}
                <Route path={'/about'} element={<AboutPage/>}/>
                { !isAuth && <Route path={'/login'} element={<AuthPage/>}/>}
                {!isAuth && <Route path={'/register'} element={<AuthPage/>}/>}
            </Route>
        </Routes>
    );
}

export default App;

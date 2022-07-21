import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './hooks/redux';
import { refreshToken } from './store/slice/userSlice';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/ShopPage/ShopPage';
import UserPage from './pages/UserPage/UserPage';
import AboutPage from './pages/AboutPage/AboutPage';
import AuthPage from './pages/AuthPage/AuthPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CartPage from './pages/CartPage/CartPage';
import WishlistPage from './pages/WishlistPage/WishlistPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import RatePage from './pages/RatePage/RatePage';
import CommentsPage from './pages/CommentsPage/CommentsPage';
import ItemControlPage from './pages/ItemControlPage/ItemControlPage';
import UserControlPage from './pages/UserControlPage/UserControlPage';
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage';
import NewsControlPage from './pages/NewsControlPage/NewsControlPage';
import Loader from './components/Loader/Loader';

function App() {
    const { isAuth, user } = useAppSelector((state) => state.userReducer);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkToken = async (): Promise<void> => {
            try {
                setIsLoading(true);
                const localRefreshToken = localStorage.getItem('refreshToken');
                if (!localRefreshToken) {
                    setIsLoading(false);
                    return;
                }
                await dispatch(refreshToken());
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        };

        checkToken();
    }, []);
    return (
        <div>
            {isLoading && <Loader />}
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    {isAuth && (
                        <Route path="/:userId" element={<UserPage />}>
                            <Route index element={<ProfilePage />} />
                            <Route path="cart" element={<CartPage />} />
                            <Route path="wishlist" element={<WishlistPage />} />
                            <Route path="orders" element={<OrdersPage />} />
                            <Route path="rates" element={<RatePage />} />
                            <Route path="comments" element={<CommentsPage />} />
                            {user?.role === 'admin' && (
                                <>
                                    <Route path="items" element={<ItemControlPage />} />
                                    <Route path="users" element={<UserControlPage />} />
                                    <Route path="news" element={<NewsControlPage />} />
                                    <Route path="analytics" element={<AnalyticsPage />} />
                                </>
                            )}
                        </Route>
                    )}
                    <Route path="/about" element={<AboutPage />} />
                    { !isAuth && <Route path="/login" element={<AuthPage />} />}
                    {!isAuth && <Route path="/register" element={<AuthPage />} />}
                </Route>
            </Routes>
        </div>
    );
}

export default App;

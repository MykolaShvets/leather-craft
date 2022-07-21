import React, { FC, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';

import './Header.css';
import Modal from '../Modal/Modal';
import CartPage from '../../pages/CartPage/CartPage';
import WishlistPage from '../../pages/WishlistPage/WishlistPage';

const Header: FC = () => {
    const { isAuth, user } = useAppSelector((state) => state.userReducer);

    const [cartModal, setCartModal] = useState<boolean>(false);
    const [wishlistModal, setWishlistModal] = useState<boolean>(false);

    return (
        <header className="header">
            <div className="header__container">
                <nav>
                    <ul className="header__menu">
                        <li><NavLink to="/" className="header__menu_link">Home</NavLink></li>
                        <li><NavLink to="shop" className="header__menu_link">Shop</NavLink></li>
                        <li><NavLink to="/about" className="header__menu_link">About</NavLink></li>
                    </ul>
                </nav>
                <div className="header__logo">
                    <Link to="/">LEATHER CRAFT</Link>
                </div>
                {isAuth
                    ? (
                        <ul className="user__menu">
                            <li>
                                <button onClick={() => setCartModal(true)}>Cart</button>
                                <Modal active={cartModal} setActive={setCartModal}><CartPage /></Modal>
                            </li>
                            <li>
                                <button onClick={() => setWishlistModal(true)}>Wishlist</button>
                                <Modal active={wishlistModal} setActive={setWishlistModal}><WishlistPage /></Modal>
                            </li>
                            <li>
                                <Link to={`${user?.id}`}>
                                    Hello, {user?.firstName}
                                </Link>
                            </li>
                        </ul>
                    )
                    : (
                        <ul className="user__menu">
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </ul>
                    )}
            </div>
        </header>
    );
};

export default Header;

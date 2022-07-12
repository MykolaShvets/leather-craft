import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './MobileMenu.css';
import { useAppSelector } from '../../hooks/redux';

const MobileMenu: FC = () => {
    const { isAuth, user } = useAppSelector((state) => state.userReducer);

    return (
        <div className="mobile-menu__container">
            <ul className="mobile__menu">
                <li><NavLink to="/" className="header__menu_link">Home</NavLink></li>
                <li><NavLink to="shop" className="header__menu_link">Shop</NavLink></li>
                <li><NavLink to="/about" className="header__menu_link">About</NavLink></li>
            </ul>
            {isAuth
                ? (
                    <ul className="user__menu_mobile">
                        <li>
                            <button>{user?.firstName}</button>
                        </li>
                        <li>
                            <button>Cart</button>
                        </li>
                        <li>
                            <button>Wish List</button>
                        </li>
                    </ul>
                )
                : (
                    <ul className="user__menu_mobile">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                )}
        </div>
    );
};

export default MobileMenu;

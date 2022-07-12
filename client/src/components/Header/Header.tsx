import React, { FC, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';

import './Header.css';
// import MobileMenu from '../MobileMenu/MobileMenu';

const Header: FC = () => {
    const { isAuth, user } = useAppSelector((state) => state.userReducer);
    const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__menu_mobile">
                    <button onClick={() => setIsMobileMenu(!isMobileMenu)}>{isMobileMenu ? 'Close' : 'Menu'}</button>
                    {/* eslint-disable-next-line max-len */}
                    {/* <div className={isMobileMenu ? 'visible' : 'invisible'} onClick={() => setIsMobileMenu(!isMobileMenu)}> */}
                    {/*    <MobileMenu /> */}
                    {/* </div> */}
                </div>
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

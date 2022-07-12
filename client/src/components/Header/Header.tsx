/* eslint-disable max-len */
import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

import { useAppSelector } from '../../hooks/redux';

import './Header.css';

const Header: FC = () => {
    const { isAuth, user } = useAppSelector((state) => state.userReducer);

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
                                <div>
                                    <FontAwesomeIcon icon={faUser} />  {user?.firstName}
                                </div>
                            </li>
                            <li>
                                <div><FontAwesomeIcon icon={faCartShopping} /> </div>
                            </li>
                            <li>
                                <div> <FontAwesomeIcon icon={faHeart} /> </div>
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

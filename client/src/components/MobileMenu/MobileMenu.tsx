import React, { useState } from 'react';
import {
    Badge, Box, Drawer, IconButton, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Favorite, Menu, ShoppingCart } from '@mui/icons-material';
import { useAppSelector } from '../../hooks/redux';

const MobileMenu = () => {
    const { isAuth, user } = useAppSelector((state) => state.userReducer);
    const { cartItems } = useAppSelector((state) => state.cartReducer);
    const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);

    const handleMobileMenu = () => {
        setIsMobileMenu(!isMobileMenu);
    };

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                onClick={handleMobileMenu}
                color="inherit"
            >
                <Menu />
            </IconButton>
            <Drawer
                open={isMobileMenu}
                onClose={handleMobileMenu}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '30px',
                        width: '100vw',
                        height: '100vh',
                    }}
                    onClick={handleMobileMenu}
                >
                    <Link to="/" className="header__menu_link">Home</Link>
                    <Link to="shop" className="header__menu_link">Shop</Link>
                    <Link to="/about" className="header__menu_link">About</Link>
                    {isAuth ? (
                        <Box sx={{ display: 'flex', gap: '15px' }}>
                            <Badge badgeContent={cartItems.length} color="primary">
                                <Link to={`${user?.id}/cart`}>
                                    <ShoppingCart color="action" />
                                </Link>
                            </Badge>
                            <Link to={`${user?.id}/wishlist`}><Favorite /></Link>
                            <Link to={`${user?.id}`}><Typography>{user?.firstName}</Typography> </Link>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Link to="/login">
                                <Typography fontSize={14}>Login</Typography>
                            </Link>
                            <Link to="/register">
                                <Typography fontSize={14}>Register</Typography>
                            </Link>
                        </Box>
                    )}
                </Box>
            </Drawer>
        </Box>
    );
};

export default MobileMenu;

import React, { FC } from 'react';
import {
    AppBar, Badge, Box, Container, Toolbar, Typography,
} from '@mui/material';
import { ShoppingCart, Favorite } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import MobileMenu from '../MobileMenu/MobileMenu';

const Header: FC = () => {
    const { isAuth, user } = useAppSelector((state) => state.userReducer);
    const { cartItems } = useAppSelector((state) => state.cartReducer);

    return (
        <AppBar position="fixed">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <MobileMenu />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '10px' }}>
                        <Link to="/" className="header__menu_link">
                            <Typography fontSize={18}>Home</Typography>
                        </Link>
                        <Link to="shop" className="header__menu_link">
                            <Typography fontSize={18}>Shop</Typography>
                        </Link>
                        <Link to="/about" className="header__menu_link">
                            <Typography fontSize={18}>About</Typography>
                        </Link>
                    </Box>
                    <Typography sx={{ flexGrow: 1 }} fontSize={24}>
                        <Link to="/">Leather Craft</Link>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        {isAuth ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Badge badgeContent={cartItems.length} color="secondary">
                                    <Link to={`${user?.id}/cart`}> <ShoppingCart /> </Link>
                                </Badge>
                                <Link to={`${user?.id}/wishlist`}> <Favorite /> </Link>
                                <Link to={`${user?.id}`}><Typography>Hello, {user?.firstName}</Typography> </Link>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Link to="/login">
                                    <Typography fontSize={18}>Login</Typography>
                                </Link>
                                <Link to="/register">
                                    <Typography fontSize={18}>Register</Typography>
                                </Link>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    );
};
export default Header;

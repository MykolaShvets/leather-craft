import React, { FC, useState } from 'react';
import {
    AppBar, Box, Container, Drawer, IconButton, Toolbar, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ShoppingCart, Favorite } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';

const Header: FC = () => {
    const { isAuth, user } = useAppSelector((state) => state.userReducer);
    const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);
    const handleMobileMenu = () => {
        setIsMobileMenu(!isMobileMenu);
    };

    return (
        <AppBar position="fixed">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={handleMobileMenu}
                            color="inherit"
                        >
                            <MenuIcon />
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
                                        <Link to={`${user?.id}/cart`}><ShoppingCart /></Link>
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
                                <Link to={`${user?.id}/cart`}> <ShoppingCart /> </Link>
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

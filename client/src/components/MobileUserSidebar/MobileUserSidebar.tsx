import React, { useEffect, useState } from 'react';
import {
    Box, Drawer, IconButton, Typography,
} from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';

const MobileUserSidebar = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(true);
    const [isSidebar, setIsSidebar] = useState<boolean>(false);
    const handleOpenSidebar = () => {
        setIsSidebar(true);
    };
    const handleCloseSidebar = () => {
        setIsSidebar(false);
    };
    const { user } = useAppSelector((state) => state.userReducer);

    useEffect(() => {
        if (user?.role === 'user') {
            setIsAdmin(false);
        }
    }, []);

    return (
        <Box sx={{ display: { sx: 'block', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenSidebar}
                color="inherit"
            >
                <ArrowForwardIos />
            </IconButton>
            <Drawer
                open={isSidebar}
                onClose={handleCloseSidebar}
            >
                <Box
                    sx={{
                        pt: '80px',
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={handleCloseSidebar}
                >
                    <Link to=" "><Typography>Profile</Typography></Link>
                    <Link to="cart"><Typography>Cart</Typography></Link>
                    <Link to="wishlist"><Typography>Wishlist</Typography></Link>
                    <Link to="orders"><Typography>Orders</Typography></Link>
                    <Link to="rates"><Typography>Rates</Typography></Link>
                    <Link to="comments"><Typography>Comments</Typography></Link>
                    {isAdmin && <Link to="items"><Typography sx={{ mt: '30px' }}>Items</Typography></Link>}
                    {isAdmin && <Link to="users"><Typography>Users</Typography></Link>}
                    {isAdmin && <Link to="news"><Typography>News</Typography></Link>}
                    {isAdmin && <Link to="analytics"><Typography>Analytics</Typography></Link>}
                </Box>
            </Drawer>
        </Box>
    );
};

export default MobileUserSidebar;

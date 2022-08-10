import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { useAppSelector } from '../../hooks/redux';
import MobileUserSidebar from '../MobileUserSidebar/MobileUserSidebar';

const UserSidebar = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(true);
    const { user } = useAppSelector((state) => state.userReducer);

    useEffect(() => {
        if (user?.role === 'user') {
            setIsAdmin(false);
        }
    }, []);
    return (
        <Box>
            <MobileUserSidebar />
            <Box sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                gap: '10px',
                width: '150px',
                p: '15px',
            }}
            >
                <Link to=" "><Typography>Profile</Typography></Link>
                <Link to="cart"><Typography>Cart</Typography></Link>
                <Link to="wishlist"><Typography>Wishlist</Typography></Link>
                <Link to="orders"><Typography>Orders</Typography></Link>
                <Link to="rates"><Typography>Rates</Typography></Link>
                <Link to="comments"><Typography>Comments</Typography></Link>
                {isAdmin && <Link to="items"><Typography>Items</Typography></Link>}
                {isAdmin && <Link to="users"><Typography>Users</Typography></Link>}
                {isAdmin && <Link to="news"><Typography>News</Typography></Link>}
                {isAdmin && <Link to="analytics"><Typography>Analytics</Typography></Link>}
            </Box>
        </Box>
    );
};

export default UserSidebar;

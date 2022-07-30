import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import UserSidebar from '../../components/UserSidebar/UserSidebar';

const UserPage: FC = () => (
    <Box sx={{ display: 'flex', gap: '30px' }}>
        <UserSidebar />
        <Outlet />
    </Box>
);

export default UserPage;

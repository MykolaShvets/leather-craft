import React, { FC } from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';

const Layout: FC = () => (
    <Container disableGutters maxWidth={false}>
        <header>
            <Header />
        </header>
        <Container maxWidth="lg" sx={{ paddingTop: '90px' }}>
            <main>
                <Outlet />
            </main>
        </Container>
    </Container>
);

export default Layout;

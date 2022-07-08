import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';

import './Layout.css';

const Layout: FC = () => (
    <div>
        <Header />
        <main className="main">
            <Outlet />
        </main>
    </div>
);

export default Layout;

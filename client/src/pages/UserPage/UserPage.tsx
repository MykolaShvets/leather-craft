import React, { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import UserPanel from '../../components/UserPanel/UserPanel';
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import './UserPage.css';

const UserPage: FC = () => {
    const { user } = useAppSelector((state) => state.userReducer);
    // const dispatch = useAppDispatch();

    const [isAdmin, setIsAdmin] = useState<boolean>(true);

    useEffect(() => {
        if (user?.role === 'user') {
            setIsAdmin(false);
        }
    }, []);

    return (
        <div className="user-page__container">
            <div className="user-page__sidebar">
                <UserPanel />
                {isAdmin && <AdminPanel />}
            </div>
            <div className="user-page__content">
                <Outlet />
            </div>

        </div>
    );
};

export default UserPage;

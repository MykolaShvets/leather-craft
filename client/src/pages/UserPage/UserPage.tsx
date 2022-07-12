import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';

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
        <div>
            {isAdmin ? 'admin' : 'user'}
        </div>
    );
};

export default UserPage;

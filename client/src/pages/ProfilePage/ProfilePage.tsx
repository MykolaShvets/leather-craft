import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import EditUserForm from '../../components/EditUserForm/EditUserForm';
import { IUser } from '../../interfaces/userInterface';
import Modal from '../../components/Modal/Modal';
import { exitUser } from '../../store/slice/userSlice';

const ProfilePage = () => {
    const [isUserEdit, setIsUserEdit] = useState<boolean>(false);
    const { user } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const exit = () => {
        dispatch(exitUser());
        navigate('/');
    };
    return (
        <div className="profile__container">
            <h2>
                Hello, {user?.firstName} {user?.lastName}!
                <button onClick={exit}>Exit</button>
            </h2>
            <div className="user__info">
                <p>Email: {user?.email}</p>
                <p>Phone: {user?.phone}</p>
                <button onClick={() => setIsUserEdit(true)}> Edit </button>
                <Modal setActive={setIsUserEdit} active={isUserEdit}>
                    <EditUserForm user={user as IUser} modalAction={setIsUserEdit} />
                </Modal>
            </div>
        </div>
    );
};

export default ProfilePage;

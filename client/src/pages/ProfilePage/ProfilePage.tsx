import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Button, Modal, Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteUser, exitUser } from '../../store/slice/userSlice';
import EditUserForm from '../../components/EditUserForm/EditUserForm';
import { IUser } from '../../interfaces/userInterface';

const ProfilePage = () => {
    const [isUserEdit, setIsUserEdit] = useState<boolean>(false);
    const { user } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const exit = () => {
        dispatch(exitUser());
        navigate('/');
    };
    const deleteCurrentUser = () => {
        dispatch(deleteUser(user?.id as number));
        navigate('/');
    };

    return (
        <Box
            width="100%"
            sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
            }}
        >
            <Typography variant="h2">Hello, {user?.firstName} {user?.lastName}!</Typography>
            <Box>
                <Typography textAlign="center">Your email: {user?.email}</Typography>
                <Typography textAlign="center">Your phone: {user?.phone}</Typography>
            </Box>
            <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
            }}
            >
                <Button variant="outlined" onClick={() => setIsUserEdit(!isUserEdit)}>Edit</Button>
                <Button variant="outlined" color="error" onClick={deleteCurrentUser}>Delete account</Button>
                <Button variant="outlined" onClick={exit}>Exit</Button>
            </Box>
            <Modal open={isUserEdit} onClose={() => setIsUserEdit(false)}>
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
                >
                    <EditUserForm user={user as IUser} modalAction={setIsUserEdit} />
                </Box>
            </Modal>
        </Box>
    );
};

export default ProfilePage;

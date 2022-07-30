import React, { FC, useState } from 'react';
import {
    Box, Button, IconButton, InputAdornment, TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import { ILoginForm } from '../../interfaces/loginInterface';
import { useAppDispatch } from '../../hooks/redux';
import { loginUser } from '../../store/slice/userSlice';
import { loginValidator } from '../../validators/userValidator';

const LoginForm: FC = () => {
    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>(
        { resolver: joiResolver(loginValidator), mode: 'onTouched' },
    );
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const login: SubmitHandler<ILoginForm> = (data) => {
        dispatch(loginUser(data));
        navigation('/', { replace: true });
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex', flexDirection: 'column', gap: '20px', width: { xs: '80%', md: '50%' },
            }}
        >
            <TextField
                {...register('email')}
                label="Email"
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
            />
            <TextField
                {...register('password')}
                label="Password"
                type={isPasswordHidden ? 'password' : 'text'}
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                                edge="end"
                            >
                                {isPasswordHidden ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>,
                }}
            />
            <Button
                onClick={handleSubmit(login)}
                variant="outlined"
                sx={{ fontSize: '18px' }}
            >LOGIN
            </Button>
        </Box>
    );
};

export default LoginForm;

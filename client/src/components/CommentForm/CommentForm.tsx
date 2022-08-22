import React, { FC } from 'react';
import {
    Box, Button, Paper, TextField,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IComment } from '../../interfaces/commentsInterface';
import { createComment } from '../../store/slice/commentSlice';
import { useAppDispatch } from '../../hooks/redux';

const CommentForm: FC<{itemId: number}> = ({ itemId }) => {
    const { register, handleSubmit } = useForm<IComment>();
    const dispatch = useAppDispatch();

    const addComment: SubmitHandler<IComment> = (data) => {
        const comment = {
            itemId,
            ...data,
        };
        dispatch(createComment({ itemId, comment }));
    };
    return (
        <Box sx={{ width: '80%' }}>
            <Paper sx={{
                display: 'flex', flexDirection: 'column', gap: '10px', p: 2,
            }}
            >
                <TextField
                    {...register('title')}
                    defaultValue=""
                    label="Title"
                    fullWidth
                    size="small"
                />
                <TextField
                    {...register('description')}
                    defaultValue=""
                    label="Comment..."
                    multiline
                    fullWidth
                />
                <Button onClick={handleSubmit(addComment)}>Comment</Button>
            </Paper>
        </Box>
    );
};

export default CommentForm;

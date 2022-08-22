import React, { FC, useEffect, useState } from 'react';
import {
    Box, IconButton, Paper, Typography,
} from '@mui/material';

import { Delete } from '@mui/icons-material';
import { IComment } from '../../interfaces/commentsInterface';
import { IUser } from '../../interfaces/userInterface';
import { userService } from '../../services/userService';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteCommentbyId } from '../../store/slice/commentSlice';

const CommentItem: FC<{ comment: IComment }> = ({ comment }) => {
    const { user } = useAppSelector((state) => state.userReducer);
    const [author, setAuthor] = useState<IUser | null>(null);
    const dispatch = useAppDispatch();

    const deleteComment = () => {
        dispatch(
            deleteCommentbyId({ commentId: comment.id as number, itemId: comment.itemId as number }),
        );
    };

    useEffect(() => {
        userService
            .getById(comment.userId as number)
            .then((value) => setAuthor(value.data));
    }, []);

    return (
        <Paper sx={{ width: '80%', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography fontSize="18px" fontWeight={800}>
                    {author?.firstName}
                </Typography>
                <Typography> {comment.createdAt?.slice(0, 10)} </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>{comment.description}</Typography>
                {user?.id === comment.userId && (
                    <IconButton onClick={deleteComment}>
                        <Delete />
                    </IconButton>
                )}
            </Box>
        </Paper>
    );
};

export default CommentItem;

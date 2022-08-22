import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCommentByItem } from '../../store/slice/commentSlice';
import CommentForm from '../CommentForm/CommentForm';
import CommentItem from '../CommentItem/CommentItem';

const ItemComments = () => {
    const { isAuth } = useAppSelector((state) => state.userReducer);
    const { item } = useAppSelector((state) => state.itemReducer);
    const { itemComments } = useAppSelector((state) => state.commentReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (item) {
            dispatch(getCommentByItem(item?.id as number));
        }
    }, []);

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
        }}
        >
            {isAuth && <CommentForm itemId={item?.id as number} />}
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', alignSelf: 'stretch',
            }}
            >
                {itemComments[0] && itemComments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
            </Box>
        </Box>
    );
};

export default ItemComments;

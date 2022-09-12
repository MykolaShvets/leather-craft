import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from '../../interfaces/commentsInterface';
import { commentsService } from '../../services/commentsService';

interface IInitialState {
    itemComments: IComment[];
    userComments: IComment[];
}

const initialState: IInitialState = {
    itemComments: [],
    userComments: [],
};

export const getCommentByItem = createAsyncThunk(
    'commentSlice/getByItem',
    async (itemId: number, { dispatch }) => {
        try {
            const { data } = await commentsService.getByItemId(itemId);

            dispatch(SET_ITEM_COMMENTS({ comments: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const createComment = createAsyncThunk<void, {itemId: number, comment: IComment}>(
    'commentSlice/createComment',
    async ({ itemId, comment }, { dispatch }) => {
        try {
            await commentsService.createComment(comment);

            const { data } = await commentsService.getByItemId(itemId);

            dispatch(SET_ITEM_COMMENTS({ comments: data }));
        } catch (e) {
            console.log(e);
        }
    },
);

export const deleteCommentbyId = createAsyncThunk<void, {itemId: number, commentId: number}>(
    'commentSlice/deleteCommentById',
    async ({ commentId, itemId }, { dispatch }) => {
        await commentsService.deleteCommentById(commentId);

        const { data } = await commentsService.getByItemId(itemId);

        dispatch(SET_ITEM_COMMENTS({ comments: data }));
    },

);

const commentSlice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers: {
        SET_ITEM_COMMENTS: (state, action: PayloadAction<{comments: IComment[]}>) => {
            state.itemComments = action.payload.comments;
        },
    },
});

export const commentReducer = commentSlice.reducer;

export const { SET_ITEM_COMMENTS } = commentSlice.actions;

/* eslint-disable react/require-default-props */
import React, {
    FC, SetStateAction, useEffect, useState, Dispatch,
} from 'react';
import { Box, IconButton } from '@mui/material';
import {
    Add, ShoppingCart, Favorite, FavoriteBorder, Delete, Edit,
} from '@mui/icons-material';

import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { addCartItems } from '../../store/slice/cartSlice';
import { addWishlistItem, deleteWishlistItem } from '../../store/slice/wishlistSlice';
import { deleteItem } from '../../store/slice/itemSlice';

const ItemActionBtns: FC<{ itemId: number, setIsEdit?: Dispatch<SetStateAction<boolean>> }> = ({ itemId, setIsEdit }) => {
    const { wishlistItems } = useAppSelector((state) => state.wishlistReducer);
    const { user } = useAppSelector((state) => state.userReducer);
    const { itemPage } = useAppSelector((state) => state.itemReducer);
    const [isItemInWishlist, setIsItemInWishlist] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const addToCart = () => {
        dispatch(addCartItems(itemId));
    };

    const addToWishlist = () => {
        dispatch(addWishlistItem(itemId));
    };

    const removeFromWishlist = () => {
        const wishlistItem = wishlistItems.filter((element) => element.itemId === itemId);
        dispatch(deleteWishlistItem(wishlistItem[0].id));
        setIsItemInWishlist(false);
    };

    const deleteThisItem = () => {
        dispatch(deleteItem({ id: itemId, page: itemPage }));
    };

    useEffect(() => {
        const itemInWishlist = !!wishlistItems.find((element) => element.itemId === itemId);
        if (itemInWishlist) {
            setIsItemInWishlist(true);
        }
    }, [wishlistItems.length]);

    return (
        <Box sx={{
            display: 'flex', justifyContent: 'space-between', p: '0px', width: '100%',
        }}
        >
            <IconButton onClick={addToCart}><Add /><ShoppingCart /></IconButton>
            { isItemInWishlist
                ? (<IconButton onClick={removeFromWishlist}><Favorite /></IconButton>)
                : (<IconButton onClick={addToWishlist}><FavoriteBorder /></IconButton>)}
            {user?.role === 'admin' && <IconButton onClick={deleteThisItem}><Delete /></IconButton>}
            {user?.role === 'admin' && setIsEdit && <IconButton onClick={() => setIsEdit(true)}><Edit /></IconButton>}
        </Box>
    );
};

export default ItemActionBtns;

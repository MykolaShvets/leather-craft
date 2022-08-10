import React, { FC, useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import {
    Add, ShoppingCart, Favorite, FavoriteBorder,
} from '@mui/icons-material';

import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { addCartItems } from '../../store/slice/cartSlice';
import { addWishlistItem, deleteWishlistItem } from '../../store/slice/wishlistSlice';

const ItemActionBtns: FC<{ itemId: number }> = ({ itemId }) => {
    const { wishlistItems } = useAppSelector((state) => state.wishlistReducer);
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
        </Box>
    );
};

export default ItemActionBtns;

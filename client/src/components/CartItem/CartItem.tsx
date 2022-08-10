import React, { FC, useEffect, useState } from 'react';
import {
    Box, IconButton, Paper, Typography,
} from '@mui/material';
import { Add, Clear, Remove } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { IItem } from '../../interfaces/itemInterface';
import { itemService } from '../../services/itemService';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ICartItem } from '../../interfaces/cartInterface';
import { addCartItems, deleteCartItem } from '../../store/slice/cartSlice';

const CartItem: FC<{ itemId: number }> = ({ itemId }) => {
    const [currentItem, setCurrentItem] = useState<IItem | null>(null);
    const [currentCartItems, setCurrentCartItems] = useState<ICartItem[]>([]);
    const { cartItems } = useAppSelector((state) => state.cartReducer);
    const dispatch = useAppDispatch();

    const removeOneFromCart = () => {
        dispatch(deleteCartItem(currentCartItems[0].id));
    };

    const addOneMore = () => {
        dispatch(addCartItems(itemId));
    };

    const deleteAllFromCart = () => {
        currentCartItems.forEach((item) => {
            dispatch(deleteCartItem(item.id));
        });
    };

    useEffect(() => {
        setCurrentCartItems(cartItems.filter((item) => item.itemId === itemId));
        if (currentItem === null) {
            itemService.getById(itemId).then((value) => setCurrentItem(value.data as IItem));
        }
    }, [cartItems.length]);

    return (
        <Paper sx={{ p: '20px' }}>
            {currentItem && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <img src={currentItem.imageUrl} alt={currentItem.name} width="40px" />
                        <Link to={`/items/${currentItem.id}`}><Typography variant="h5">{currentItem.name}</Typography></Link>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton onClick={removeOneFromCart}><Remove /></IconButton>
                        <Paper sx={{ p: 2 }}> <Typography>{ currentCartItems.length }</Typography></Paper>
                        <IconButton onClick={addOneMore}><Add /></IconButton>
                        <IconButton onClick={deleteAllFromCart}><Clear /></IconButton>
                    </Box>
                    <Typography>
                        { currentCartItems.length * (currentItem.price - (currentItem.price * (currentItem.sale / 100))) } USD
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};

export default CartItem;

import React, { useEffect, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { SentimentDissatisfied } from '@mui/icons-material';
import CartItem from '../../components/CartItem/CartItem';
import { useAppSelector } from '../../hooks/redux';

function CartPage() {
    const { cartItems, totalPrice } = useAppSelector((state) => state.cartReducer);
    const [uniqCartItemsIds, setUniqCartItemsIds] = useState<number[]>([]);

    const clearCartItems = () => {
        // array of all items ids in cart.
        const itemsIds : number[] = [];
        cartItems.forEach((item) => itemsIds.push(item.itemId));
        // set cartItems without dublicates.
        setUniqCartItemsIds(itemsIds.filter((item, index) => itemsIds.indexOf(item) === index));
    };

    useEffect(() => {
        if (cartItems.length) {
            clearCartItems();
        }
    }, [cartItems.length]);
    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', gap: '10px', width: '100%',
        }}
        >
            {uniqCartItemsIds.length <= 0
                ? (
                    <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Your Cart is empty
                        <SentimentDissatisfied />
                    </Typography>
                )
                : (uniqCartItemsIds.map((item) => <CartItem key={item} itemId={item} />))}
            <Divider />
            <Box sx={{
                display: 'flex', align: 'center', justifyContent: 'space-between',
            }}
            >
                <Typography>Total Price</Typography>
                <Typography>{totalPrice}</Typography>
            </Box>
        </Box>
    );
}

export default CartPage;

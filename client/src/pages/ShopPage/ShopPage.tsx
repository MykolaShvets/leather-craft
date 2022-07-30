import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllItems, getItemProps } from '../../store/slice/itemSlice';
import ItemCard from '../../components/ItemCard/ItemCard';

const ShopPage = () => {
    const {
        items, categories, colors, materials,
    } = useAppSelector((state) => state.itemReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getItemProps());
        dispatch(getAllItems());
    }, []);

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', gap: '20px' }}>
                {items
                       && categories
                       && colors
                       && materials
                       && items
                           .map((item) => (
                               <ItemCard item={item} itemProps={{ colors, categories, materials }} key={item.id} />
                           ))}
            </Box>
        </Box>
    );
};

export default ShopPage;

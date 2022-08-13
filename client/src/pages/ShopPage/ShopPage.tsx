import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllItems, getFilteredItems, getItemProps } from '../../store/slice/itemSlice';
import ItemCard from '../../components/ItemCard/ItemCard';
import ShopSidebar from '../../components/ShopSidebar/ShopSidebar';

const ShopPage = () => {
    const {
        items, categories, colors, materials, filteredObject,
    } = useAppSelector((state) => state.itemReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getItemProps());
        if (filteredObject !== null) {
            dispatch(getFilteredItems({ page: 1, filteredObject }));
        } else {
            dispatch(getAllItems({ page: 1 }));
        }
    }, [filteredObject]);

    return (
        <Box>
            <ShopSidebar />
            <Box sx={{
                display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', gap: '20px',
            }}
            >
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

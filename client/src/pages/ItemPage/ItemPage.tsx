import React, { FC, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
    Box, Divider, IconButton, Paper, Typography,
} from '@mui/material';
import { Add, Favorite, ShoppingCart } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCurrentItem, getCurrentProps } from '../../store/slice/itemSlice';

const ItemPage: FC = () => {
    const {
        item, currentProps,
    } = useAppSelector((state) => state.itemReducer);

    const dispatch = useAppDispatch();

    const { itemId } = useParams<{itemId: string}>();
    const { state } = useLocation() as any | null;

    useEffect(
        () => {
            dispatch(getCurrentItem(Number(itemId)));
        },
        [],
    );

    useEffect(
        () => {
            if (item && !state) {
                dispatch(getCurrentProps({
                    materialId: item.materialId,
                    colorId: item.colorId,
                    categoryId: item.categoryId,
                }));
            }
        },
        [item],
    );

    return (
        <Box>
            { item && (
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: '50px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 90px)',
                }}
                >
                    <Box sx={{ position: 'relative', width: '400px' }}>
                        <img src={item.imageUrl} alt={item.name} width="400px" />
                        {item.sale > 0 && (
                            <Typography
                                sx={{
                                    position: 'absolute', top: '0', right: '0', p: 1, bgcolor: 'red', borderRadius: '50%',
                                }}
                                fontWeight="bold"
                                color="#fff"
                            >
                                %SALE%
                            </Typography>
                        )}
                    </Box>
                    <Paper sx={{
                        p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '400px',
                    }}
                    >
                        <Typography variant="h3">{item.name}</Typography>
                        <Divider />
                        <Typography>{item.description}</Typography>
                        <Divider />
                        <Typography>Category: {state ? state.category.name : currentProps.category?.name}</Typography>
                        <Typography>Color: {state ? state.color.name : currentProps.color?.name}</Typography>
                        <Typography>Material: {state ? state.material.name : currentProps.material?.name}</Typography>
                        <Divider />
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                            <Typography color="red" fontWeight="bold">
                                {item.price - (item.price * (item.sale / 100))} USD
                            </Typography>
                            {item.sale > 0
                                && <Typography sx={{ textDecorationLine: 'line-through' }}>{item.price} USD</Typography>}
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '0px' }}>
                            <IconButton><Add /><ShoppingCart /></IconButton>
                            <IconButton><Favorite /></IconButton>
                        </Box>
                    </Paper>
                </Box>
            )}
        </Box>
    );
};

export default ItemPage;

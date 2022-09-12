import React, { FC, useEffect, useState } from 'react';
import { Box, Rating } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createRate, getItemRates } from '../../store/slice/rateSlice';

const ItemRate: FC<{itemId: number}> = ({ itemId }) => {
    const { isAuth } = useAppSelector((state) => state.userReducer);
    const { itemRates } = useAppSelector((state) => state.rateReducer);
    const dispatch = useAppDispatch();

    const [rate, setRate] = useState<number>(0);

    useEffect(() => {
        dispatch(getItemRates(itemId));
        itemRates.map((value) => setRate(rate + value.rate));
    }, [itemId]);
    return (
        <Box>
            <Rating
                name="simple-controlled"
                value={rate}
                onChange={(event, newValue) => {
                    dispatch(createRate)
                }}
            />
        </Box>
    );
};

export default ItemRate;

import React, { FC, useEffect, useState } from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { IItem } from '../../interfaces/itemInterface';
import { itemService } from '../../services/itemService';
import ItemActionBtns from '../ItemActionBtns/ItemActionBtns';

const WishlistItem: FC<{itemId: number}> = ({ itemId }) => {
    const [currentItem, setCurrentItem] = useState<IItem | null>(null);

    useEffect(() => {
        itemService.getById(itemId).then((value) => setCurrentItem(value.data));
    }, []);
    return (
        <Paper>
            {currentItem && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={currentItem.imageUrl} alt={currentItem.name} width="50px" />
                        <Link to={`/items/${currentItem.id}`}><Typography variant="h5">{currentItem.name}</Typography></Link>
                    </Box>
                    <Box>
                        <ItemActionBtns itemId={itemId} />
                    </Box>
                </Box>
            )}
        </Paper>
    );
};

export default WishlistItem;

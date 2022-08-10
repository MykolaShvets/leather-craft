import React, { FC } from 'react';
import { Box } from '@mui/material';
import WishlistItem from '../../components/WishlistItem/WishlistItem';
import { useAppSelector } from '../../hooks/redux';

const WishlistPage: FC = () => {
    const { wishlistItems } = useAppSelector((state) => state.wishlistReducer);

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', gap: '10px', width: '100%',
        }}
        >
            { wishlistItems.length > 0 && wishlistItems.map(({ itemId, id }) => <WishlistItem itemId={itemId} key={id} />)}
        </Box>
    );
};

export default WishlistPage;

import React, { FC, useEffect, useState } from 'react';
import {
    Box,
    Card, CardActions, CardContent, CardMedia, Divider, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { IItem } from '../../interfaces/itemInterface';
import { IItemProps } from '../../interfaces/itemPropertiesInterface';
import ItemActionBtns from '../ItemActionBtns/ItemActionBtns';

interface IAllItemProps {
    colors: IItemProps[];
    materials: IItemProps[];
    categories: IItemProps[];
}

const ItemCard: FC<{item: IItem, itemProps:IAllItemProps}> = ({ item, itemProps }) => {
    const { colors, materials, categories } = itemProps;
    const [category, setCategory] = useState<IItemProps | undefined>(undefined);
    const [color, setColor] = useState<IItemProps | undefined>(undefined);
    const [material, setMaterial] = useState<IItemProps | undefined>(undefined);

    useEffect(() => {
        setCategory(categories.find((value) => item.categoryId === value.id));
        setColor(colors.find((value) => item.colorId === value.id));
        setMaterial(materials.find((value) => item.materialId === value.id));
    }, [categories, colors, materials]);

    return (
        <Card sx={{ width: '250px', height: '350px', position: 'relative' }}>
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
            <Link to={`/items/${item.id}`} state={{ category, color, material }}>
                <CardMedia
                    component="img"
                    height="160px"
                    image={item.imageUrl}
                />
                <CardContent sx={{ p: '5px' }}>
                    <Typography variant="h5">{item.name}</Typography>
                    <Divider />
                    <Typography fontSize="13px">Category: {category && category.name};</Typography>
                    <Typography fontSize="13px">Color: {color && color.name};</Typography>
                    <Typography fontSize="13px">Material: {material && material.name};</Typography>
                    <Divider />
                    <Box sx={{ display: 'flex', gap: '20px' }}>
                        <Typography color="red" fontWeight="bold">{item.price - (item.price * (item.sale / 100))} USD</Typography>
                        {item.sale > 0 && <Typography sx={{ textDecorationLine: 'line-through' }}>{item.price} USD</Typography>}
                    </Box>
                </CardContent>
            </Link>
            <Divider />
            <CardActions sx={{ p: '0px' }}>
                <ItemActionBtns itemId={item.id as number} />
            </CardActions>
        </Card>
    );
};
export default ItemCard;

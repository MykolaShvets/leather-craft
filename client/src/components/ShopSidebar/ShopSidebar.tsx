import React, { useState } from 'react';
import {
    Box,
    Button,
    Drawer,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IFilterItems } from '../../interfaces/filterItemInterface';
import { SET_FILTER } from '../../store/slice/itemSlice';

const ShopSidebar = () => {
    const { register, handleSubmit } = useForm<IFilterItems>();
    const [isShopSidebar, setIsShopSidebar] = useState<boolean>(false);
    const {
        categories, colors, materials, filteredObject,
    } = useAppSelector(
        (state) => state.itemReducer,
    );
    const dispatch = useAppDispatch();

    const handleShopSidebar = () => {
        setIsShopSidebar(!isShopSidebar);
    };

    const filterItems: SubmitHandler<IFilterItems> = (data) => {
        dispatch(SET_FILTER({ filter: data }));
    };

    const clearFilter = () => {
        dispatch(SET_FILTER({ filter: null }));
    };

    return (
        <Box sx={{ marginBottom: '10px' }}>
            <IconButton onClick={handleShopSidebar}>
                <FilterList />
            </IconButton>
            {categories && colors && materials && (
                <Drawer open={isShopSidebar} onClose={handleShopSidebar}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: { xs: '100vw', md: '30vw' },
                            p: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '15px',
                        }}
                    >
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                defaultValue={filteredObject ? filteredObject.categoryId : ''}
                                {...register('categoryId')}
                                label="Category"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="material">Material</InputLabel>
                            <Select
                                labelId="material"
                                defaultValue={filteredObject ? filteredObject.materialId : ''}
                                {...register('materialId')}
                                label="Material"
                            >
                                {materials.map((material) => (
                                    <MenuItem key={material.id} value={material.id}>
                                        {material.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="color">Color</InputLabel>
                            <Select
                                labelId="color"
                                defaultValue={filteredObject ? filteredObject.colorId : ''}
                                {...register('colorId')}
                                label="Color"
                            >
                                {colors.map((color) => (
                                    <MenuItem key={color.id} value={color.id}>
                                        {color.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button onClick={handleSubmit(filterItems)}>Filter</Button>
                        <Button onClick={clearFilter}>Clear Filter</Button>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default ShopSidebar;

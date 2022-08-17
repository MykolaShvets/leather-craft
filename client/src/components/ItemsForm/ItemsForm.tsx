/* eslint-disable react/require-default-props */
import React, {
    Dispatch, FC, SetStateAction, useEffect,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';

import { IItem } from '../../interfaces/itemInterface';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createNewItem, editItem, getItemProps } from '../../store/slice/itemSlice';

const ItemsForm: FC<{isEdit?: boolean, setIsEdit?: Dispatch<SetStateAction<boolean>>}> = ({ isEdit, setIsEdit }) => {
    const { register, handleSubmit, reset } = useForm<IItem>();
    const {
        colors, materials, categories, item, itemPage,
    } = useAppSelector((state) => state.itemReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getItemProps());
    }, []);

    const addNewItem:SubmitHandler<IItem> = (data) => {
        if (isEdit === true && setIsEdit && item) {
            dispatch(editItem({ editedItem: data, id: item?.id as number, page: itemPage }));
            setIsEdit(false);
            return;
        }
        dispatch(createNewItem(data));
        reset();
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex', flexDirection: 'column', gap: '20px',
            }}
        >
            <Box sx={{
                display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '20px',
            }}
            >
                <TextField
                    defaultValue={isEdit ? item?.name : ''}
                    {...register('name')}
                    label="Name"
                    sx={{ width: { md: '30%' } }}
                />
                <TextField
                    defaultValue={isEdit ? item?.imageUrl : ''}
                    {...register('imageUrl')}
                    type="url"
                    label="Image URL"
                    sx={{ width: { md: '70%' } }}
                />
            </Box>
            <TextField
                defaultValue={isEdit ? item?.description : ''}
                {...register('description')}
                label="Description"
                multiline
            />
            <Box sx={{
                display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: '20px',
            }}
            >
                <FormControl sx={{ width: { xs: '100%', sm: '30%' } }}>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        labelId="category"
                        defaultValue={isEdit ? item?.categoryId : ''}
                        {...register('categoryId')}
                        label="Category"
                    >
                        {categories && categories
                            .map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl sx={{ width: { xs: '100%', sm: '30%' } }}>
                    <InputLabel id="material">Material</InputLabel>
                    <Select
                        labelId="material"
                        defaultValue={isEdit ? item?.materialId : ''}
                        {...register('materialId')}
                        label="Material"
                    >
                        {materials && materials
                            .map((material) => <MenuItem key={material.id} value={material.id}>{material.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl sx={{ width: { xs: '100%', sm: '30%' } }}>
                    <InputLabel id="color">Color</InputLabel>
                    <Select
                        labelId="color"
                        defaultValue={isEdit ? item?.colorId : ''}
                        {...register('colorId')}
                        label="Color"
                    >
                        {colors && colors
                            .map((color) => <MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{
                display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: '20px',
            }}
            >
                <TextField
                    defaultValue={isEdit ? item?.height : ''}
                    {...register('height')}
                    type="number"
                    size="small"
                    label="Height"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                    }}
                />
                <TextField
                    defaultValue={isEdit ? item?.width : ''}
                    {...register('width')}
                    type="number"
                    size="small"
                    label="Width"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                    }}
                />
                <TextField
                    defaultValue={isEdit ? item?.price : ''}
                    {...register('price')}
                    type="number"
                    size="small"
                    label="Price"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">USD</InputAdornment>,
                    }}
                />
                <TextField
                    defaultValue={isEdit ? item?.sale : ''}
                    {...register('sale')}
                    type="number"
                    size="small"
                    label="Sale"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
                />
                <TextField
                    defaultValue={isEdit ? item?.amount : ''}
                    {...register('amount')}
                    type="number"
                    size="small"
                    label="Amount on storage"
                />
            </Box>
            <Button variant="outlined" onClick={handleSubmit(addNewItem)}>SAVE</Button>
        </Box>
    );
};

export default ItemsForm;

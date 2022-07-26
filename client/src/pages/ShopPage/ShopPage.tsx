import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllItems, getItemProps } from '../../store/slice/itemSlice';
import ItemCard from '../../components/ItemCard/ItemCard';
import './ShopPage.css';

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
        <div className="shop__container">
            {items
                && categories
                && colors
                && materials
                && items.map((item) => <ItemCard item={item} itemProps={{ colors, categories, materials }} key={item.id} />)}
        </div>
    );
};

export default ShopPage;

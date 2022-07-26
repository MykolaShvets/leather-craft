import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCurrentItem, getItemProps } from '../../store/slice/itemSlice';
import { IItemProps } from '../../interfaces/itemPropertiesInterface';
import './ItemPage.css';

const ItemPage: FC = () => {
    const {
        item, categories, colors, materials,
    } = useAppSelector((state) => state.itemReducer);

    const dispatch = useAppDispatch();

    const { itemId } = useParams<{itemId: string}>();

    const [category, setCategory] = useState<IItemProps | undefined>(undefined);
    const [color, setColor] = useState<IItemProps | undefined>(undefined);
    const [material, setMaterial] = useState<IItemProps | undefined>(undefined);

    useEffect(() => {
        dispatch(getItemProps());
        if (itemId) {
            dispatch(getCurrentItem(+itemId));
            setCategory(categories.find((value) => item?.categoryId === value.id));
            setColor(colors.find((value) => item?.colorId === value.id));
            setMaterial(materials.find((value) => item?.materialId === value.id));
        }
    }, [categories, colors, materials]);

    return (
        <div className="item__page_container">
            {item && (
                <div className="item__page_content">
                    <img src={item.imageUrl} alt={item.name} />
                    <div className="itm__page_info">
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <div className="item__page_props">
                            <p>Category: {category?.name}</p>
                            <p>Color: {color?.name}</p>
                            <p>Material: {material?.name}</p>
                        </div>
                        <div className="item__page_price">
                            <p className="current__price">
                                {item.price - (item.price * (item.sale / 100))}
                            </p>
                            {item.sale > 0 && <p className="full__price">{item.price}</p>}
                        </div>
                        <div className="item__page_btns">
                            <button>Add to cart</button>
                            <button>Add to wishlist</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemPage;

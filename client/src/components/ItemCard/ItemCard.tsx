import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IItem } from '../../interfaces/itemInterface';
import './ItemCard.css';
import { IItemProps } from '../../interfaces/itemPropertiesInterface';

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
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {item
                && itemProps
                && (
                    <div className={item.sale > 0 ? 'item__card sale' : 'item__card'}>
                        <Link to={`/items/${item.id}`}>
                            <img src={item.imageUrl} alt="item" />
                            <h2 className="item__card_title"> {item.name}</h2>
                            <div className="item__card_price">
                                <p className="item__price_current">{item.price - (item.price * (item.sale / 100))}</p>
                                { (item.sale > 0) && <p className="item__price_full">{item.price}</p>}
                            </div>
                            <p className="item__card_category">Category: {category && category.name}</p>
                            <p className="item__card_color">Color: {color && color.name}</p>
                            <p className="item__card_materials">Material: {material && material.name}</p>
                        </Link>
                        <div className="item__card_btns">
                            <button>Add to cart</button>
                            <button>Add to wishlist</button>
                        </div>
                    </div>
                )}
        </>
    );
};
export default ItemCard;

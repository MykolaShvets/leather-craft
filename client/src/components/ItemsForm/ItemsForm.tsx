import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IItem } from '../../interfaces/itemInterface';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createNewItem, getItemProps } from '../../store/slice/itemSlice';
import './ItemForm.css';

const ItemsForm = () => {
    const { register, handleSubmit, reset } = useForm<IItem>();
    const { colors, materials, categories } = useAppSelector((state) => state.itemReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!colors || !materials || !categories) {
            dispatch(getItemProps());
        }
    }, []);

    const addNewItem:SubmitHandler<IItem> = (data) => {
        dispatch(createNewItem(data));
        reset();
    };

    return (
        <form className="item__form" onSubmit={handleSubmit(addNewItem)}>
            <label> Name: <input type="text" {...register('name')} /></label>
            <label> Image URL: <input type="url" {...register('imageUrl')} /> </label>
            <label>
                Price: <input type="number" min={0} {...register('price')} />
             Sale: <input type="number" min={0} {...register('sale')} />
            </label>
            <label>Amount on storage: <input type="number" min={0} {...register('amount')} /></label>
            <label>
                Height(mm) X Width(mm) :
                <div>
                    <input type="number" min={0} {...register('height')} />
                     X
                    <input type="number" min={0} {...register('width')} />
                </div>
            </label>
            <label>Description: <textarea cols={50} rows={3} {...register('description')} /></label>
            <div className="item-props">
                <label> Color:
                    <select {...register('colorId')}>
                        {colors?.map(({ name, id }) => <option value={id} key={id}>{name}</option>)}
                    </select>
                </label>
                <label> Material:
                    <select {...register('materialId')}>
                        {materials?.map(({ name, id }) => <option value={id} key={id}>{name}</option>)}
                    </select>
                </label>
                <label> Category:
                    <select {...register('categoryId')}>
                        {categories?.map(({ name, id }) => <option value={id} key={id}>{name}</option>)}
                    </select>
                </label>
            </div>
            <button>ADD</button>
        </form>
    );
};

export default ItemsForm;

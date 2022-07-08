import React, { FC } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { exitUser } from '../../store/slice/userSlice';

const HomePage: FC = () => {

    const dispatch = useAppDispatch()

    const exit = () => {
        dispatch(exitUser())
        console.log('ddd');
    }


    return (
        <div>
            HomePage
            <button onClick={() => exit()}>Exit</button>
        </div>
    );
};

export default HomePage;

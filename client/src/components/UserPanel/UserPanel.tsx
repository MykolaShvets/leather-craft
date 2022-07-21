import React from 'react';
import { Link } from 'react-router-dom';

const UserPanel = () => (
    <ul className="user__panel">
        <li className="user__panel_item"><Link to=" "> Profile </Link></li>
        <li className="user__panel_item"><Link to="cart"> Cart </Link></li>
        <li className="user__panel_item"><Link to="wishlist"> Wishlist </Link></li>
        <li className="user__panel_item"><Link to="orders"> Orders </Link></li>
        <li className="user__panel_item"><Link to="rates"> Rates </Link></li>
        <li className="user__panel_item"><Link to="comments"> Comments </Link></li>
    </ul>
);

export default UserPanel;

import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => (
    <ul className="admin__panel">
        <li className="admin__panel_item"><Link to="items">Items</Link></li>
        <li className="admin__panel_item"><Link to="users">Users</Link></li>
        <li className="admin__panel_item"><Link to="news">News</Link></li>
        <li className="admin__panel_item"><Link to="analytics">Analytics</Link></li>
    </ul>
);

export default AdminPanel;

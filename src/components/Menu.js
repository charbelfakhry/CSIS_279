import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

const Menu = () => {

    useEffect(() => {

    }, [])


    return (
        <div className="container">
            <hr />
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/users">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/userForm" className="nav-link">Form</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">About Us</Link>
                    </li>
                </ul>
            </div>
        </nav>
        </div>
    );
};



export default Menu;
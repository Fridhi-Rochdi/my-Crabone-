import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState("A propos");

    return (
        <header className='flex border'>
            <div className="logo-nav">
                <img src="12.png" alt="logo" width={"60px"} height={"60px"} style={{ borderRadius: "50px" }} />
               
            </div>
            <ul className='menu-nav flex'>
                <li onClick={() => setShowMenu('A propos')}><Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}> Home</Link> {showMenu === 'A propos' ? <hr /> : null}</li>
                <li onClick={() => setShowMenu('About-Us')}>
                    <Link  style={{ textDecoration: 'none', color: 'inherit' }} to='/about'>Dashbord </Link> {showMenu === 'About-Us' ? <hr /> : null}
                </li>
                <li onClick={() => setShowMenu('Shop')}><Link  style={{ textDecoration: 'none', color: 'inherit' }} to='./AddUserForm'>Administration </Link> {showMenu === 'Shop' ? <hr /> : null}</li>
               
            </ul>
            <div className='login-nav flex'>
            <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}><button className='login'>Login </button></Link>
                
                
            </div>
        </header>
    );
}

export default Navbar;

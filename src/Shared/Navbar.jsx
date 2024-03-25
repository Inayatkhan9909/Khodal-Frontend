import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaRegMessage } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css"
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <div className='navbar-container'>

            <div className="app-title">
                <h1>Khodal</h1>
            </div>
            <div className="navbar-search">
                <input type="text"
                    placeholder='search'

                />
                <CiSearch className='search-icon' />
            </div>

            <div className="personal-items">
                <div className="message">
                    <Link to='/message'> <FaRegMessage className='message-icon' /></Link>
                </div>
                <div className="notification">
                    <Link to='/notification'><IoIosNotificationsOutline className='notification-icon'/></Link>
                </div>
                <div className="profile">
                    <Link to='/user/profile'> <CgProfile className='profile-icon'/></Link>
                </div>
            </div>



        </div>
    )
}

export default Navbar
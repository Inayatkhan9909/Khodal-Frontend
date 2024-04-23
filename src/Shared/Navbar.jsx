import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaRegMessage } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgMenu } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css"
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

const Navbar = () => {
    const [showDropdown, setshowDropdown] = useState(false);

    const handleDropdown = () => {
        setshowDropdown(!showDropdown);
    }

    return (
        <>

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
                        <Link to='/message'> <FaRegMessage className='message-icon' color='black' /></Link>
                    </div>
                    <div className="notification">
                        <Link to='/notification'><IoIosNotificationsOutline color='black' className='notification-icon' /></Link>
                    </div>
                    <div className="profile">
                        <Link to='/user/profile'> <CgProfile className='profile-icon' color='black' /></Link>
                    </div>
                </div>



            </div>

            {/* Navbar dropdown query */}

            <div className="navbarfull_container_query">

                <div className='navbar1-container_query'>

                    <div className="app-title_query">
                        <h1>Khodal</h1>
                    </div>

                    <div className="dropdown-div">
                        <button onClick={handleDropdown}><CgMenu className='dropdown_icon' /></button>
                        {showDropdown && <Dropdown/>}
                    </div>

                        
                </div>

                <div className='navbar2_search-container_query'>

                    <div className="navbar-search_query">
                        <input type="text"
                            placeholder='search'
                        />
                        <CiSearch className='search-icon' />
                    </div>

                </div>
            </div>



        </>
    )
}

export default Navbar
import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { IoHomeOutline,IoSettingsOutline  } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BsCameraReels } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { LiaUserFriendsSolid } from "react-icons/lia";
const Dropdown = () => {
    const navigate = useNavigate(); 

    const [isloggedin, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem("token");
  
  
    useEffect(() => {
      if (token !== null) {
        setIsLoggedIn(true);
       
  
      }
    }, [token])

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/user/login");
      };
  return (
    <div className='dropdown_container'>

        <ul>
            <li><Link to=""><span><IoHomeOutline/></span><span>Home</span></Link></li>
            <li><Link to="">< BsCameraReels/><span>Reels</span></Link></li>
            <li><Link to=""><CiSquarePlus/><span>Create</span></Link></li>
            <li><Link to=""><CgProfile/><span>Profile</span></Link></li>
            <li><Link to=""><LiaUserFriendsSolid/><span>Friends</span></Link></li>
            <li><Link to=""><IoSettingsOutline /><span>Settings</span></Link></li>
            <li>
            
            {isloggedin && <button className='logout-button' onClick={handleLogout}> LogOut</button>}
          
            </li>
        </ul>

    </div>
  )
}

export default Dropdown
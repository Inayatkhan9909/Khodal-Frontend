import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BsCameraReels } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { LiaUserFriendsSolid } from "react-icons/lia";
import PostFeed from './PostFeed';
import ReelsFeed from '../Reels/ReelsFeed'

  

const Home = () => {
    const [showReels,setshowReels]= useState(false);

    const handleHome = () =>{
        setshowReels(false);
    }

    const handleReels = ()=>{
      setshowReels(true);
    }

    return (
        <>
            <div className='home-container' >

                <div className="home-navbar">
                    <ul>

                        <li><button onClick={handleHome}><span>Home</span></button></li>
                        <li><button onClick={handleReels}><span>Reels</span></button></li>
                        <li><Link to="/reels/create">< BsCameraReels /><span>create Reels</span></Link></li>
                        <li><Link to="/user/createpost"><CiSquarePlus /><span>Create</span></Link></li>
                        <li><Link to="/user/profile"><CgProfile /><span>Profile</span></Link></li>
                        <li><Link to=""><LiaUserFriendsSolid /><span>Friends</span></Link></li>
                        <li><Link to=""><IoSettingsOutline /><span>Settings</span></Link></li>

                    </ul>

                </div>

                <div className="home-content">

             {
                showReels ? <ReelsFeed/> : <PostFeed/>
             }  

                </div>

            </div>
        </>

    )
}

export default Home
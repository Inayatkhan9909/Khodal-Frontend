import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BsCameraReels } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { LiaUserFriendsSolid } from "react-icons/lia";
import PostFeed from './PostFeed';



const Home = () => {


    return (
        <>


            <div className='home-container' >

                <div className="home-navbar">
                    <ul>

                        <li><Link to=""><span><IoHomeOutline /></span><span>Home</span></Link></li>
                        <li><Link to="/reels/feed">< BsCameraReels /><span>Reels</span></Link></li>
                        <li><Link to="/user/createpost"><CiSquarePlus /><span>Create</span></Link></li>
                        <li><Link to="/user/profile"><CgProfile /><span>Profile</span></Link></li>
                        <li><Link to=""><LiaUserFriendsSolid /><span>Friends</span></Link></li>
                        <li><Link to=""><IoSettingsOutline /><span>Settings</span></Link></li>

                    </ul>

                </div>

                <div className="home-content">

                <PostFeed/>

                </div>

            </div>


        </>



    )
}

export default Home
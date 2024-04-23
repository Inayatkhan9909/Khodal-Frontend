import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
import { useDispatch, useSelector } from 'react-redux';
import { AddLikeaction, getAllposts } from '../Redux/actions';
import { BsThreeDots } from "react-icons/bs";
import ModifyPost from '../Posts/ModifyPost';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BsCameraReels } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { LiaUserFriendsSolid } from "react-icons/lia";
import Loading from './Loading';
import { jwtDecode } from 'jwt-decode';
import Comments from '../Posts/Comments';
import timeAgo from '../utils/time';



const Home = () => {
    const dispatch = useDispatch();
    const [showmodifyindex, setshowmodifyindex] = useState(false);
    const [likedPosts, setLikedPosts] = useState([]);
    const [changeLikedata, setchangeLikedata] = useState(false);
    const [showcommentIndex, setshowcommentIndex] = useState(null);
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const data = useSelector((state) => state.getPosts.posts);
    const posts = data
    const postlikemessage = useSelector((state => state.AddlikeStore.message))


    useEffect(() => {
        if (data && data.posts) {
            const initialLikedStatus = data.posts.map((post) => {
                const alreadyLiked = post.likedby.includes(userId)
                return alreadyLiked;

            })
            setLikedPosts(initialLikedStatus);
        }

    }, [data, userId])

    useEffect(() => {
        dispatch(getAllposts())

    }, [dispatch, changeLikedata])

    if (!posts) {
        return (
            <div><Loading /></div>
        )
    }
    // console.log(posts)

    const handlemodify = (index) => {

        setshowmodifyindex(previndex => previndex === index ? null : index);
    }


    const likehandle = (postId, index) => {

        dispatch(AddLikeaction(postId, token))
        if (postlikemessage) {

            setchangeLikedata(!changeLikedata)
        }
        else {
            setchangeLikedata(changeLikedata)
        }

        setLikedPosts(prevLikedPosts => {
            const newLikedPosts = [...prevLikedPosts];
            newLikedPosts[index] = !newLikedPosts[index];
            return newLikedPosts;
        });

    }


    const handleComment = (index) => {

        setshowcommentIndex(prevIndex => prevIndex === index ? null : index);
    }

    return (
        <>


            <div className='home-container' >

                <div className="home-navbar">
                    <ul>

                        <li><Link to=""><span><IoHomeOutline /></span><span>Home</span></Link></li>
                        <li><Link to="">< BsCameraReels /><span>Reels</span></Link></li>
                        <li><Link to="/user/createpost"><CiSquarePlus /><span>Create</span></Link></li>
                        <li><Link to=""><CgProfile /><span>Profile</span></Link></li>
                        <li><Link to=""><LiaUserFriendsSolid /><span>Friends</span></Link></li>
                        <li><Link to=""><IoSettingsOutline /><span>Settings</span></Link></li>

                    </ul>

                </div>

                <div className="home-content">


                    {

                        posts.posts.map((post, index) => (

                            <div className="card" key={index}>
                                <div className="post_heading">

                                    <div className='username_postadded'><h3>{post.author}</h3> <span> added a new post</span></div>
                                    <button onClick={() => handlemodify(index)}> <BsThreeDots size={22} /></button>
                                    {showmodifyindex === index ? <ModifyPost postId={post._id} /> : null}

                                </div>
                                <div className="caption-time">

                                    <p>{timeAgo(post.CreatedAt)}</p>
                                    <p>{post.caption}</p>

                                </div>
                                <div className="post_image_container">
                                    <img src={post.imageurl} width={100} alt="no" />
                                </div>

                                <div className="reactioncount">

                                    <span>{post.likedby.length} likes</span>
                                    <span>{post.comments.length} comments</span>

                                </div>
                                <div className="like-comment">

                                    <div className="like" onClick={() => likehandle(post._id, index)} >
                                        {likedPosts[index] ? <AiFillLike style={{ fill: 'blue' }} size={30} /> : <AiOutlineLike size={30} />}
                                    </div>

                                    <div className="comment">
                                        <button onClick={() => handleComment(index)}> <FaRegComment size={30} /></button>
                                        {showcommentIndex === index && <Comments showcommentIndex={showcommentIndex} setshowcommentIndex={setshowcommentIndex}
                                            postId={post._id} />}
                                    </div>

                                </div>
                            </div>

                        ))

                    }

                </div>

            </div>


        </>



    )
}

export default Home
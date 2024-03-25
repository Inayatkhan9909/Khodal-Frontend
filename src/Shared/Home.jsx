import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from "react-icons/md";
import "./Home.css"
import { useDispatch, useSelector } from 'react-redux';
import { AddLikeaction, getAllposts } from '../Redux/actions';
import { BsThreeDots } from "react-icons/bs";
import ModifyPost from '../Posts/ModifyPost';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Loading from './Loading';
import { jwtDecode } from 'jwt-decode';
import Comments from '../Posts/Comments';



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

    function timeAgo(timestamp) {
        const currentTime = new Date();
        const postTime = new Date(timestamp);
        const elapsedMilliseconds = currentTime - postTime;
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
        const elapsedMinutes = Math.floor(elapsedSeconds / 60);
        const elapsedHours = Math.floor(elapsedMinutes / 60);
        const elapsedDays = Math.floor(elapsedHours / 24);
        const elapsedWeeks = Math.floor(elapsedDays / 7);
        const elapsedMonths = Math.floor(elapsedDays / 30);

        if (elapsedSeconds < 60) {
            return 'just now';
        } else if (elapsedMinutes < 60) {
            return `${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''} ago`;
        } else if (elapsedHours < 24) {
            return `${elapsedHours} hour${elapsedHours > 1 ? 's' : ''} ago`;
        } else if (elapsedDays === 1) {
            return 'yesterday';
        } else if (elapsedDays < 7) {
            return `${elapsedDays} day${elapsedDays > 1 ? 's' : ''} ago`;
        } else if (elapsedWeeks === 1) {
            return '1 week ago';
        } else if (elapsedWeeks < 4) {
            return `${elapsedWeeks} weeks ago`;
        } else if (elapsedMonths === 1) {
            return '1 month ago';
        } else if (elapsedMonths < 12) {
            return `${elapsedMonths} months ago`;
        } else {
            return postTime.toLocaleD
        }
    }


    return (
        <>


            <div className='home-container' >

                <div className="home-navbar">
                    <ul>
                        <li>
                            <Link to=''>Home</Link>
                        </li>
                        <li>
                            <Link to=''>Reels</Link>
                        </li>
                        <li>
                            <Link to='/user/createpost'> < MdOutlineAddBox /> Create</Link>
                        </li>
                        <li>
                            <Link to=''>Friends</Link>
                        </li>
                        <li>
                            <Link to=''>Groups</Link>
                        </li>
                        <li>
                            <Link to=''>Settings</Link>
                        </li>

                    </ul>


                </div>

                <div className="home-content">


                    {

                        posts.posts.map((post, index) => (

                            <div className="card" key={index}>
                                <div className="post_heading">

                                    <h4>{post.author}</h4>
                                    <button onClick={() => handlemodify(index)}> <BsThreeDots size={22} /></button>
                                    {showmodifyindex === index ? <ModifyPost postId={post._id} /> : null}

                                </div>
                                <div className="caption-time">

                                    <p>{timeAgo(post.CreatedAt)}</p>
                                    <p>{post.caption}</p>

                                </div>
                                <img src={post.imageurl} width={100} alt="no" />

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
                                            postId={post._id} username={post.author} />}
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
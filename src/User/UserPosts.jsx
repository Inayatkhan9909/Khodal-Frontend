import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import "../Shared/Home.css"
import { AddLikeaction, getAllposts } from '../Redux/actions';
import { BsThreeDots } from "react-icons/bs";
import ModifyPost from '../Posts/ModifyPost';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Loading from '../Shared/Loading';
import Comments from '../Posts/Comments';
import timeAgo from '../utils/time';

const UserPosts = () => {

    const [singlepost, setsinglepost] = useState([]);
    const [showmodifyindex, setshowmodifyindex] = useState(false);
    const [likedPosts, setLikedPosts] = useState([]);
    const [changeLikedata, setchangeLikedata] = useState(false);
    const [showcommentIndex, setshowcommentIndex] = useState(null);
    const dispatch = useDispatch();
    const postlikemessage = useSelector((state => state.AddlikeStore.message))
    const data = useSelector((state) => state.getPosts.posts);
    const posts = data
    console.log(posts)
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    useEffect(() => {
        dispatch(getAllposts())

    }, [dispatch])
    useEffect(() => {
        if (data) {
            const userPosts = posts.posts.filter(post => post.user === userId);
            if (userPosts) {
                userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setsinglepost(userPosts);
            }
        }
    }, [data, posts.posts, userId]);
    console.log("ss " + singlepost.length)
    console.log(JSON.stringify(singlepost));


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

            


                {

                    singlepost.map((post, index) => (

                        <div className="card_userpost" key={index}>
                            <div className="post_heading">

                            <div className='username_postadded'><h3>{post.author }</h3> <span> added a new post</span></div>
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
                                        postId={post._id} username={post.author} />}
                                </div>


                            </div>
                        </div>

                    ))

                }


           

        </>
    )
}

export default UserPosts
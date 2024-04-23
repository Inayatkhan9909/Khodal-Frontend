import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Loading from './Loading';
import { getAllposts } from '../Redux/actions';

const SinglePost = () => {
    const [singlepost,setsinglepost]= useState({});
    const location = useLocation();
    const postId = new URLSearchParams(location.search).get("postId");
    const dispatch = useDispatch();
    const data = useSelector((state) => state.getPosts.posts);
    const posts = data
    console.log(posts)

    useEffect(() => {
        dispatch(getAllposts())

    }, [dispatch])
    useEffect(() => {
        if (data) {
            const foundPost = posts.posts.find(post => post._id === postId);
            if (foundPost) {
                setsinglepost(foundPost);
            }
        }
    }, [data,posts.posts, postId]);
    console.log(singlepost)

    return (
        <div>

<div className="home-content">


{

   

     singlepost ?   <div className="card" >
            <div className="post_heading">

                <h4>{singlepost.author}</h4>
             

            </div>
            <div className="caption-time">

                <p>{singlepost.CreatedAt}</p>
                <p>{singlepost.caption}</p>

            </div>
            <img src={singlepost.imageurl} width={100} alt="no" />

            <div className="reactioncount">

                <span>{singlepost.likedby ?singlepost.likedby.length : 0} likes</span>
                <span>{singlepost.comments ? singlepost.comments.length : 0} comments</span>

            </div>
            <div className="like-comment">

            


            </div>
        </div>

     : <Loading/>

}


</div>

        </div>
    )
}

export default SinglePost
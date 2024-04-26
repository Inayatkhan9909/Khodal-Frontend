import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AddLikeaction, getAllposts, getReelsAction } from '../Redux/actions';
import { BsThreeDots } from "react-icons/bs";
import ModifyPost from '../Posts/ModifyPost';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Loading from '../Shared/Loading';
import { jwtDecode } from 'jwt-decode';
import Comments from '../Posts/Comments';
import timeAgo from '../utils/time';

const ReelsFeed = () => {

    const dispatch = useDispatch();
    const [showmodifyindex, setshowmodifyindex] = useState(false);
    const [likedReels, setlikedReels] = useState([]);
    const [changeLikedata, setchangeLikedata] = useState(false);
    const [showcommentIndex, setshowcommentIndex] = useState(null);
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const data = useSelector((state) => state.getReelsStore.data);
    const reels = data
    const postlikemessage = useSelector((state => state.AddlikeStore.message))

    console.log(data)
    useEffect(() => {
        if (data && data.reels) {
            const initialLikedStatus = data.reels.map((reel) => {
                const alreadyLiked = reel.likedby.includes(userId)
                return alreadyLiked;
            })
            setlikedReels(initialLikedStatus);
        }

    }, [data, userId])

    useEffect(() => {
        dispatch(getReelsAction()) 

    }, [dispatch, changeLikedata])

    if (!data) {
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

        setlikedReels(prevlikedReels => {
            const newlikedReels = [...prevlikedReels];
            newlikedReels[index] = !newlikedReels[index];
            return newlikedReels;
        });

    }


    const handleComment = (index) => {

        setshowcommentIndex(prevIndex => prevIndex === index ? null : index);
    }

    return (
        <>

            {

                reels.reels.map((post, index) => (

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
                            <video src={post.videourl} autoPlay controls>vi</video>
                        </div>

                        <div className="reactioncount">

                            <span>{post.likedby.length} likes</span>
                            <span>{post.comments.length} comments</span>

                        </div>
                        <div className="like-comment">

                            <div className="like" onClick={() => likehandle(post._id, index)} >
                                {likedReels[index] ? <AiFillLike style={{ fill: 'blue' }} size={30} /> : <AiOutlineLike size={30} />}
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
        </>
    )
}

export default ReelsFeed
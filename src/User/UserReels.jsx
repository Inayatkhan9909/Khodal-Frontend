import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../Shared/Home.css"
import { AddLikeaction, getAllReels, getReelsAction } from '../Redux/actions';
import { BsThreeDots } from "react-icons/bs";
import ModifyPost from '../Posts/ModifyPost';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Loading from '../Shared/Loading';
import Comments from '../Posts/Comments';
import timeAgo from '../utils/time';
import "../Reels/Reels.css";
import { CiShare2 } from 'react-icons/ci';

const UserReels = ({ userId }) => {

  const [singlereel, setsinglereel] = useState([]);
  const [showmodifyindex, setshowmodifyindex] = useState(false);
  const [likedReels, setLikedreels] = useState([]);
  const [changeLikedata, setchangeLikedata] = useState(false);
  const [showcommentIndex, setshowcommentIndex] = useState(null);
  const dispatch = useDispatch();
  // const postlikemessage = useSelector((state => state.getReelsStore.message)) addlikestore
  const response = useSelector((state) => state.getReelsStore);
  const Allreels = response
  console.log(Allreels)
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(getReelsAction())

  }, [dispatch])


  useEffect(() => {
    if (Allreels.data) {
      const userReels = Allreels.data.reels.filter(reel => reel.user === userId);

      if (userReels) {
        userReels.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setsinglereel(userReels);

      }

    }
  }, [Allreels.data]);

  useEffect(() => {
    if (Allreels.data) {
      const initialLikedStatus = Allreels.data.reels.map((reel) => {
        const alreadyLiked = reel.likedby.includes(userId)
        return alreadyLiked;

      })
      setLikedreels(initialLikedStatus);
    }

  }, [Allreels.data, userId])

  // useEffect(() => {
  //   dispatch(getAllposts())

  // }, [dispatch, changeLikedata])

  if (!response.data) {
    return (
      <div><Loading /></div>
    )
  }

  const handlemodify = (index) => {

    setshowmodifyindex(previndex => previndex === index ? null : index);
  }


  const likehandle = (postId, index) => {

    // dispatch(AddLikeaction(postId, token))
    // if (postlikemessage) {

    //     setchangeLikedata(!changeLikedata)
    // }
    // else {
    //     setchangeLikedata(changeLikedata)
    // }

    // setlikedReels(prevlikedReels => {
    //     const newlikedReels = [...prevlikedReels];
    //     newlikedReels[index] = !newlikedReels[index];
    //     return newlikedReels;
    // });

  }

  const handleVideoClick = (e) => {
    const video = e.target;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleComment = (index) => {

    setshowcommentIndex(prevIndex => prevIndex === index ? null : index);
  }



  return (
    <>
      <div className="reels_feed_container" >
        {singlereel.map((post, index) => (
          <div className="reel_card" key={index}>
            <div className="reel_video_container">
              <video src={post.videourl} autoPlay loop playsInline onClick={handleVideoClick}></video>
              <div className="reel_details">
                <div className='username_reel'><h3>{post.author}</h3> <span>Follow </span></div>
                <p>{timeAgo(post.CreatedAt)}</p>
                <p>{post.caption}</p>
                <div className="like_comment_show">
                  <span>{post.likedby.length} likes</span>
                  <span>{post.comments.length} comments</span>
                </div>
              </div>
            </div>
            <section className="Action_section">
              <div className="reel_like" onClick={() => likehandle(post._id, index)}>
                {likedReels[index] ? <AiFillLike style={{ fill: 'blue' }} size={30} /> : <AiOutlineLike fill='white' size={30} />}
              </div>
              <div className="reel_comment">
                <button onClick={() => handleComment(index)}> <FaRegComment fill='white' size={30} /></button>
                {showcommentIndex === index && <Comments showcommentIndex={showcommentIndex} setshowcommentIndex={setshowcommentIndex} postId={post._id} />}
              </div>
              <div className="reel_share">
                <button><CiShare2 fill='white' size={30} /></button>
              </div>
              <div className="reel_modify">
                <button onClick={() => handlemodify(index)}> <BsThreeDots size={22} fill='white' /></button>
                {showmodifyindex === index ? <ModifyPost postId={post._id} /> : null}
              </div>
            </section>
          </div>
        ))}
      </div>

    </>
  )
}

export default UserReels
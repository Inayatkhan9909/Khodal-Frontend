import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../Shared/Home.css"
import { AddLikeaction, getAllReels } from '../Redux/actions';
import { BsThreeDots } from "react-icons/bs";
import ModifyPost from '../Posts/ModifyPost';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Loading from '../Shared/Loading';
import Comments from '../Posts/Comments';
import timeAgo from '../utils/time';

const UserReels = ({userId}) => {


  return (
      <>
         <div>i am UserReels</div>

      </>
  )
}

export default UserReels
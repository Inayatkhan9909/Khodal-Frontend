import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetProfileAction, GetProfilebyUsernameAction } from '../Redux/actions';
import Loading from '../Shared/Loading';
import "./Form.css"
import { CgProfile } from "react-icons/cg";
import ProfileDetails from './ProfileDetails';
import UserPosts from './UserPosts';
import { followUserreducer } from '../Redux/reducers';
import { useParams } from 'react-router-dom';

const OthersProfile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const response = useSelector((state) => state.GetProfilebyUsernameStore);
  const Clickeduser = response.data
  console.log(Clickeduser)
  const { username } = useParams();


  useEffect(() => {
    if (username !== null) {

      dispatch(GetProfilebyUsernameAction(username))

    }
  }, [dispatch, username])


  if (!Clickeduser) {

    return (
      <div><Loading /></div>
    )
  }

  const handleFollow = () => {
    try {

      dispatch(followUserreducer(token));


    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
        
      <div className='profile-container'>

<div className="profile_details_overall">
  {

    Clickeduser && <div className="profile-details">

      <div className="profile-main-content">

        {

          <div className='profilepic-div'>
            {Clickeduser.user.profilepic ? <img src={Clickeduser.user.profilepic} className='profilepic_img' alt="Profile" /> : <CgProfile size={100} />}


          </div>
        }

        <div className="name_username_container">

          <div className='profile-name'>

            <span>{Clickeduser.user.fullname}</span>

          </div>

          <div className="username">
            <span>{Clickeduser.user.username}</span>
          </div>

          <div className="follwer_following_container">

            <div className="follow_count_container">

              <div className="follow_count">
                 {<span className='follow_count_span_number'>{Clickeduser.user.followers ? Clickeduser.user.followers.length : 0}</span>}<span> followers</span> 
              </div>

              <div className="follow_count">
                {<span className='follow_count_span_number'>{Clickeduser.user.following ? Clickeduser.user.following.length : 0} </span>} <span> following</span>
              </div>

            </div>

            <div className="follow_button_container">

              <button onClick={handleFollow}>follow</button>
              <button>Message</button>

            </div>

          </div>

        </div>


      </div>
      {
        <div className="user_about_container">

          {Clickeduser.user.about && <div className="user_about_show">
            <span><strong>About:</strong></span>
            <p>{Clickeduser.user.about}</p>
          </div>}

        </div>
      }

      <div>

      </div>

    </div>

  }

  <div className='profile_details2'>
    {
      // Clickeduser && <ProfileDetails />

    }
  </div>


</div>

<div className="">  {/* className="user_posts_container" */}
  {/* <UserPosts />  */}
</div>

</div>

    </>
  )
}

export default OthersProfile
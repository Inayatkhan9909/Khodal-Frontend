import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetProfileAction, GetProfilebyUsernameAction } from '../Redux/actions';
import Loading from '../Shared/Loading';
import "./Form.css"
import { CgProfile } from "react-icons/cg";
import ProfileDetails from './ProfileDetails';
import UserPosts from './UserPosts';
import { followuserAction } from '../Redux/actions';
import { useParams } from 'react-router-dom';
import UserReels from './UserReels';
import { jwtDecode } from 'jwt-decode'

const OthersProfile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showReels, setshowReels] = useState(false);
  const [alreadyfollowd,setalreadyfollowed] = useState(false);
  const response = useSelector((state) => state.GetProfilebyUsernameStore);
  const Clickeduser = response.data
  console.log(Clickeduser)
  const { username } = useParams();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;

  const handleFollow = () => {
    try {

      dispatch(followuserAction(username,token));


    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (username !== null) {

      dispatch(GetProfilebyUsernameAction(username))

    }
  }, [dispatch, username,handleFollow])


  if (!Clickeduser) {

    return (
      <div><Loading /></div>
    )
  }


  const handlePosts = () => {
    setshowReels(false);
  }

  const handleReels = () => {
    setshowReels(true);
  }
  return (
    <>

      <div className='profile-container'>

        <div className="profile_details_overall">
          {
            Clickeduser.user && <div className="profile-details">

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
              Clickeduser.user && <div className='profile-details_form'>

                <div className="profile_details_oll_container">
                  <section className='profile_details_oll'><span className='s1'><strong>Email</strong> : </span> <span> {Clickeduser.user.email ? Clickeduser.user.email : <span>NA</span>} </span> </section>
                  <section className='profile_details_oll'><span className='s1'><strong>Address</strong> : </span> <span> {Clickeduser.user.address ? `${Clickeduser.user.address}, ${Clickeduser.user.city}, ${Clickeduser.user.country}` : <span>NA</span>} </span> </section>
                  <section className='profile_details_oll'><span className='s1'><strong>Gender</strong> : </span> <span> {Clickeduser.user.gender ? Clickeduser.user.gender : <span>NA</span>} </span> </section>
                  <section className='profile_details_oll'><span className='s1'><strong>Phone</strong> : </span> <span> {Clickeduser.user.phone ? Clickeduser.user.phone : <span>NA</span>} </span> </section>
                </div>

              </div>

            }
          </div>


        </div>

        <div className="user_content">

          <div className="user-content_type">
            <button onClick={handlePosts}>Home</button>
            <button onClick={handleReels}>Reels</button>
          </div>

          <div className="user_posts_container">
            {showReels ? <UserReels userId={Clickeduser.user && Clickeduser.user._id} /> : <UserPosts userId={Clickeduser.user && Clickeduser.user._id} />}
          </div>

        </div>
      </div>

    </>
  )
}

export default OthersProfile
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetProfileAction } from '../Redux/actions';
import Loading from '../Shared/Loading';
import "./Form.css"
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import ProfileDetails from './ProfileDetails';
import UserPosts from './UserPosts';
import { followUserreducer } from '../Redux/reducers';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const [isloggedin, setIsLoggedIn] = useState(false);
  const [image, setimage] = useState(null);
  const [about, setabout] = useState('');
  const [showAboutForm, setshowAboutForm] = useState(false);
  const [reloadComponent, setReloadComponent] = useState(false);
  const [showUpload, setshowUpload] = useState(true);
  const [loadingAbout, setloadingAbout] = useState(false);
  const [loadingprofile, setloadingprofile] = useState(false);

  const response = useSelector((state) => state.AddProfileStore);
  const user = response.data

  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
      dispatch(GetProfileAction(token))

    }
  }, [dispatch, token, reloadComponent])

  useEffect(() => {
    if (user && user.user && user.user.about) {
      setabout(user.user.about);
    }
  }, [user]);


  if (!response) {

    return (
      <div><Loading /></div>
    )
  }


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/user/login");
  };



  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setimage(reader.result)
      }
    }
  };

  const handleLinkClick = () => {
    fileInputRef.current.click();
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append('token', token);
    formData.append('image', image);

    try {
      setloadingprofile(true);
      const response = await axios.post("http://localhost:4599/user/addprofilepic", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.message === "profile updated successfully") {
        console.log("success dalta");
        setloadingprofile(false);
        setReloadComponent(prevState => !prevState);
        setshowUpload(!showUpload)
      } else {
        console.log("failure dalta");
        setshowUpload(!showUpload)
        setloadingprofile(false);

      }

    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleAboutClick = () => {
    setshowAboutForm(!showAboutForm);
  };

  const handleAboutChange = (e) => {
    const { value } = e.target;
    setabout(value);
  }

  const handleAboutSubmit = async (e) => {
    e.preventDefault();
    try {
      setloadingAbout(true);
      const response = await axios.post("http://localhost:4599/user/addabout", { token, about });
      if (response.data.message === "About added successfully") {
        console.log("success dalta");
        setloadingAbout(false);
        setReloadComponent(prevState => !prevState);
        setshowAboutForm(!showAboutForm);

      } else {
        console.log("failure dalta");
        setshowAboutForm(!showAboutForm);
      }

    }
    catch (error) {
      console.log(error)
    }

  }

  const handleFollow =()=>{
    try {
      
      dispatch(followUserreducer(token));


    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='profile-container'>

      <div className="profile_details_overall">
        {

          user && <div className="profile-details">

            <div className="logout-div">
              {isloggedin && <button onClick={handleLogout}> LogOut</button>}
            </div>

            <div className="profile-main-content">

              {
                loadingprofile ? <Loading /> :
                  <div className='profilepic-div'>
                    {user.user.profilepic ? <img src={user.user.profilepic} className='profilepic_img' alt="Profile" /> : <CgProfile size={100} />}
                    {showUpload &&
                      <form onSubmit={handleFormSubmit}>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          onChange={handleFileInputChange}
                        />
                        {image && <img src={image} width={100} alt="no" />}
                        {image && <button type="submit" className='add_profilepic_btn'>Upload</button>}
                      </form>
                    }
                    {user.user.profilepic ? (
                      <button type="button" onClick={handleLinkClick} className='add_profilepic_btn'>Change profile</button>
                    ) : (
                      <button type="button" onClick={handleLinkClick} className='add_profilepic_btn'>Add profile</button>
                    )}


                  </div>
              }

              <div className="name_username_container">

                <div className='profile-name'>

                  <span>{user.user.fullname}</span>

                </div>

                <div className="username">
                  <span>{user.user.username}</span>
                </div>

                <div className="follwer_following_container">

                  <div className="follow_count_container">

                    <div className="follow_count">
                      {<span className='follow_count_span_number'>{user.user.followers ? user.user.followers.length : 0}</span>}<span> followers</span>
                    </div>

                    <div className="follow_count">
                      {<span className='follow_count_span_number'>{user.user.following ? user.user.following.length : 0} </span>} <span> following</span>
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
              loadingAbout ? <Loading /> :
                <div className="user_about_container">

                  {user.user.about && !showAboutForm && <div className="user_about_show">
                    <span><strong>About:</strong></span>
                    <p>{user.user.about}</p>
                  </div>}
                  <div className="user_about-addbtn">
                    {
                      showAboutForm ? <form className='user_about_form' onSubmit={handleAboutSubmit}>
                        <textarea name="about"
                          value={about}
                          onChange={handleAboutChange}
                          cols="30" rows="12"
                        ></textarea>

                        <button type='submit'>Update</button>

                      </form> :

                        user.user.about ? (<button onClick={handleAboutClick} className='add_profilepic_btn'>Edit About</button>) :
                          (<button onClick={handleAboutClick} className='add_profilepic_btn'>Add About</button>)

                    }

                  </div>

                </div>

            }

            <div>

            </div>

          </div>

        }

        <div className='profile_details2'>
          {
            user && <ProfileDetails />

          }
        </div>


      </div>

      <div className="user_posts_container">
        {/* <UserPosts /> */}
      </div>

    </div>
  )
}

export default Profile
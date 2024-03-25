import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { GetProfileAction } from '../Redux/actions';
import Loading from '../Shared/Loading';
import "./Form.css"
import { CgProfile } from "react-icons/cg";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [isloggedin, setIsLoggedIn] = useState(false);
  const response = useSelector((state) => state.AddProfileStore);
  const user = response.data


  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
      dispatch(GetProfileAction(token))

    }
  }, [dispatch, token])


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

  return (
    <div className='profile-container'>

      <div className="logout-div">
        {isloggedin && <button onClick={handleLogout}> LogOut</button>}
      </div>
      {

        user && <div className="profile-details">
          {user.profilepic ? <img src={user.profilepic} width={100} alt="Profile" /> : <CgProfile size={100} />}
          {user.profilepic ? <Link>Change profile</Link> : <Link>Add profile</Link>}
          <span>{user.user.username}</span>
          <span>{user.user.email}</span>

          <span>{user.user.posts && user.user.posts.length} posts</span>
        </div>
      }

    </div>
  )
}

export default Profile
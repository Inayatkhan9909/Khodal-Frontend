import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetProfileAction } from '../Redux/actions';
import Loading from '../Shared/Loading';

import { Link } from 'react-router-dom';

const ProfileDetails = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const response = useSelector((state) => state.AddProfileStore.data);
    const user = response.user

    useEffect(() => {
        if (token !== null) {

            dispatch(GetProfileAction(token))
        }
    }, [dispatch,token])

    if (!response) {
        return (
            <div><Loading /></div>
        )
    }


    return (
        <div className='profile-details_form'>

            <div className="edit_profile_details-btn">
                <Link to='/user/editprofile'>Edit</Link>
            </div>

            <div className="profile_details_oll_container">
                <section className='profile_details_oll'><span className='s1'><strong>Email</strong> : </span> <span> {user.email ? user.email : <span>NA</span>} </span> </section>
                <section className='profile_details_oll'><span className='s1'><strong>Address</strong> : </span> <span> {user.address ? `${user.address}, ${user.city}, ${user.country}` : <span>NA</span>} </span> </section>
                <section className='profile_details_oll'><span className='s1'><strong>Gender</strong> : </span> <span> {user.gender ? user.gender : <span>NA</span>} </span> </section>
                <section className='profile_details_oll'><span className='s1'><strong>Phone</strong> : </span> <span> {user.phone ? user.phone : <span>NA</span>} </span> </section>
            </div>

            <div className="complete_profile_details-btn">
                {
                    !(user.email && user.gender && user.address && user.phone) && <Link to='/user/completeprofile'>complete your profile</Link>
                }
            </div>  

        </div>
    )
}

export default ProfileDetails
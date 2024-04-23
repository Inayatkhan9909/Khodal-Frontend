import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Shared/Loading';
import { GetProfileAction } from '../Redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");
    const response = useSelector((state) => state.AddProfileStore.data);
    // const user = response.user
    const [profileData , setprofileData] = useState({
        fullname: response.user?.fullname || "",
        username: response.user?.username || "",
        email: response.user?.email || "",
        address: response.user?.address || "",
        city: response.user?.city || "",
        country: response.user?.country || "",
        phone: response.user?.phone || "",
        gender: response.user?.gender || ""
});


    useEffect(() => {
        if (token !== null) {

            dispatch(GetProfileAction(token))

        }
    }, [dispatch, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setprofileData({ ...profileData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const response = await axios.put("http://localhost:4599/user/editprofile", {
                token: token,
                fullname: profileData.fullname,
                email: profileData.email,
                username: profileData.username,
                gender: profileData.gender,
                phone: profileData.phone,
                address: profileData.address,
                city: profileData.city,
                country: profileData.country
            });
            if (response.data.message === "Changes saved  successfully") {
                toast.success(response.data.message);
                console.log(response.data.message)
                navigate('/user/profile');
            }
            else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")

        }

    }

    if (!response) {
        return (
            <div><Loading /></div>
        )
    }
    return (
        <>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <div className='profile-details_form_complete_profile'>

                <div className="profile_details_oll_container">

                    <form onSubmit={handleSubmit}>

                        <h2>Edit profile</h2>

                        <section className='profile_details_oll'><span><strong>fullname</strong> : </span>
                            <input type="text"
                                name='fullname'
                                defaultValue={response.user.fullname}
                                onChange={handleChange}

                            />

                        </section>
                        <section className='profile_details_oll'><span><strong>Username</strong> : </span>
                            <input type="text"
                                name='username'
                                defaultValue={response.user.username}
                                onChange={handleChange}

                            />

                        </section>
                        <section className='profile_details_oll'><span><strong>Email</strong> : </span>
                            <input type="email"
                                name='email'
                                defaultValue={response.user.email}
                                onChange={handleChange}

                            />

                        </section>

                        <section className='profile_details_oll'><span><strong>Gender</strong> : </span>
                            <input type="text"
                                name='gender'
                                defaultValue={response.user.gender}
                                onChange={handleChange}

                            />

                        </section>

                        <section className='profile_details_oll'><span><strong>Phone</strong> : </span>
                            <input type="tel"
                                name='phone'
                                defaultValue={response.user.phone}
                                onChange={handleChange}

                            />

                        </section>

                        <section className='profile_details_oll'><span><strong>Address</strong> : </span>
                            <input type="text"
                                name='address'
                                defaultValue={response.user.address}
                                onChange={handleChange}

                            />

                        </section>

                        <section className='profile_details_oll'><span><strong>City</strong> : </span>
                            <input type="text"
                                name='city'
                                defaultValue={response.user.city}
                                onChange={handleChange}

                            />
                        </section>

                        <section className='profile_details_oll'><span><strong>Country</strong> : </span>
                            <input type="text"
                                name='country'
                                defaultValue={response.user.country}
                                onChange={handleChange}

                            />
                        </section>

                        <div className="complete_profile_details-btn">
                            {
                                <button>Update changes</button>
                            }
                        </div>
                    </form>

                </div>




            </div>

        </>
    )
}

export default EditProfile
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Shared/Loading';
import { GetProfileAction } from '../Redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const CompleteProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [address, setaddress] = useState('');
    const [city, setcity] = useState('');
    const [country, setcountry] = useState('');
    const [phone, setphone] = useState('');
    const [gender, setgender] = useState('');
    const token = localStorage.getItem("token");
    const response = useSelector((state) => state.AddProfileStore.data);
    const user = response
    console.log(response)
    useEffect(() => {
        if (token !== null) {
            dispatch(GetProfileAction(token))
        }
    }, [dispatch, token]);


    const handleSubmit = async () => {

        const response = await axios.post("http://localhost:4599/user/completeprofile", {
            token: token,
            gender: gender,
            phone: phone,
            address: address,
            city: city,
            country: country
        });
        if (response.data.message === "Details added successfully") {
            toast.success(response.data.message);
            console.log(response.data.message)
            navigate('/user/profile');
        }
        else {
            toast.error(response.data.message);
            console.log(response.data.message);
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

                        <h2>Complete profile</h2>

                        {!user.gender && <section className='profile_details_oll'><span><strong>Gender</strong> : </span>
                            <input type="text"
                                name='gender'
                                onChange={(e) => {
                                    setgender(e.target.value);
                                }}

                            />

                        </section>}

                        {!user.address && <section className='profile_details_oll'><span><strong>Phone</strong> : </span>
                            <input type="tel"
                                name='phone'
                                onChange={(e) => {
                                    setphone(e.target.value);
                                }}

                            />

                        </section>}

                        {!user.address && <section className='profile_details_oll'><span><strong>Address</strong> : </span>
                            <input type="text"
                                name='address'
                                onChange={(e) => {
                                    setaddress(e.target.value);
                                }}

                            />

                        </section>}

                        {
                            !user.city && <section className='profile_details_oll'><span><strong>City</strong> : </span>
                                <input type="text"
                                    name='city'
                                    onChange={(e) => {
                                        setcity(e.target.value);
                                    }}

                                />
                            </section>
                        }
                        {
                            !user.country && <section className='profile_details_oll'><span><strong>Country</strong> : </span>
                                <input type="text"
                                    name='country'
                                    onChange={(e) => {
                                        setcountry(e.target.value);
                                    }}

                                />
                            </section>
                        }


                        <div className="complete_profile_details-btn">
                            {
                                <button>complete</button>
                            }
                        </div>
                    </form>

                </div>




            </div>

        </>

    )
}

export default CompleteProfile
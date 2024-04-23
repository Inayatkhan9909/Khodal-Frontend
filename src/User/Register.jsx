import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Form.css"
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../Redux/actions';


const Register = () => {

    const navigate = useNavigate();
    const [formdata, setformdata] = useState({
        fullname:"",
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformdata({ ...formdata, [name]: value })
    }

    const response = useSelector((state) => state.userregistration)

    const dispatch = useDispatch();
    const handlesubmit = async (e) => {
        e.preventDefault();

        dispatch(userRegister(formdata))
        console.log(response)
        if(response.message === "Registration successfull")
        {
            toast.success(response.message);
            console.log(response.message);
            navigate('/user/login');
        }
        else{
            toast.error(response.message);
            console.log(response.message)
        }
      
       

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
            <div className='form-main-container'>

                <div className="sideshow">
                    <h1>TheView</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur molestias doloremque magni!</p>
                </div>

                <div className="form-container">
                    <h1>Register!</h1>
                    <form onSubmit={handlesubmit}>

                        <div className="input-div">
                            <input type="text" name="fullname"
                                placeholder='Full Name'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-div">
                            <input type="text" name="username"
                                placeholder='Username'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-div">
                            <input type="email" name="email"
                                placeholder='email'
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-div">
                            <input type="password" name="password"
                                placeholder='password'
                                onChange={handleChange}
                            />
                        </div>

                        <div className="button-div">
                            <button >Register</button>
                        </div>

                        <div className="alredyregistered">
                            <span>Already have account? <Link to='/user/login'>Login here</Link></span>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Register
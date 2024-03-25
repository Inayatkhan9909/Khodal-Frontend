import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Form.css"
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../Redux/actions';

const Login = () => {
    const navigate = useNavigate();
    const [formdata, setformdata] = useState({
        username: "",
        password: ""
    });
    const handlechange = (e) => {
        const { name, value } = e.target;
        setformdata({ ...formdata, [name]: value });
    }
       
    const response = useSelector(state => state.userLoginstore)
     const data= response.data
        
    const dispatch = useDispatch();
    const handlesubmit = async (e) => {
        e.preventDefault();
      try {
             
       
        dispatch(userLogin(formdata))

        if (data && data.message === "logged in successfully") {
            localStorage.setItem('token', data.token);
            toast.success(data.message);
            navigate('/');
        } else {
            toast.error(data.message);
        }
        
      }
       catch (error) {
          console.log(error);
          toast.error("something went wrong");
      }



    }

    // if(!data)
    // {
    //    return(
    //        <div>loading...</div>
    //    )
    // }

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
                    <h1>login!</h1>
                    <form onSubmit={handlesubmit}>

                        <div className="input-div">
                            <input type="text" name="username"
                                placeholder='username'
                                onChange={handlechange}
                            />
                        </div>
                        {/* <div className="input-div">
                    <input type="email" name="email"
                        placeholder='email'

                    />
                </div> */}

                        <div className="input-div">
                            <input type="password" name="password"
                                placeholder='password'
                                onChange={handlechange}
                            />
                        </div>

                        <div className="button-div">
                            <button type='submit'>login</button>
                        </div>

                        <div className="alredyregistered">
                            <span>Don't have Account? <Link to='/user/login'>Create one here</Link></span>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Login
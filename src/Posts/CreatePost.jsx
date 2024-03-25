import React, { useEffect, useState } from 'react'
import IsAuthenticated from '../Authontixations/tokenAuth';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../Redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import "./Post.css"

const CreatePost = () => {

    IsAuthenticated();

    const [token, settoken] = useState('');
    const [caption, setcaption] = useState('');
    const [image, setimage] = useState(null);


    const handleimage = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.readyState === 2) {
                setimage(reader.result)
            }
        }
    }

    const formData = new FormData();

    formData.append('token', token);
    formData.append('caption', caption);
    formData.append('image', image);

    const dispatch = useDispatch();




    useEffect(() => {


        const storedtoken = localStorage.getItem('token');
        if (storedtoken) {

            settoken(storedtoken);
        }

    }, [])

    const response = useSelector((state) => state.createPost)
    console.log(response.data)
    const handlesubmit = async (e) => {
        e.preventDefault();
        dispatch(createPost(formData))
        await toast.success(response.message)
       

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

            <div className='post-container'>
                <form onSubmit={handlesubmit}>

                    <label htmlFor="caption">title</label>
                    <input type="text" name="caption"
                        placeholder='caption'
                        onChange={(e) => {
                            setcaption(e.target.value);
                        }}
                    />

                    <label htmlFor="image">image</label>
                    <input type="file" name="image"
                        onChange={handleimage}
                    />

                    <button type='submit'>add</button>

                </form>

            </div>

        </>
    )
}

export default CreatePost
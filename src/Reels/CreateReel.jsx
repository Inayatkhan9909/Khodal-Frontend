import React, { useEffect, useState } from 'react'
import IsAuthenticated from '../Authontixations/tokenAuth';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, createReelAction } from '../Redux/actions';
import { ToastContainer, toast } from 'react-toastify';

const CreateReel = () => {
    IsAuthenticated();
    const dispatch = useDispatch();
    const [token, settoken] = useState('');
    const [caption, setcaption] = useState('');
    const [video, setvideo] = useState(null);



    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setvideo(file)
        }

        console.log(file)
    };

    console.log(video);


    const formData = new FormData();
    formData.append('token', token);
    formData.append('caption', caption);
    formData.append('video', video);

    useEffect(() => {


        const storedtoken = localStorage.getItem('token');
        if (storedtoken) {

            settoken(storedtoken);
        }

    }, [])

    const response = useSelector((state) => state.createReelStore.message)
    if (response) {
        console.log(response)
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        dispatch(createReelAction(formData))
        if (response) {
            toast.success(response)
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

            <div className='post-container'>
                <form onSubmit={handlesubmit}>

                    <label htmlFor="caption">title</label>
                    <input type="text" name="caption"
                        placeholder='caption'
                        onChange={(e) => {
                            setcaption(e.target.value);
                        }}
                    />

                    <label htmlFor="video">video</label>
                    <upload></upload>
                    <input type="file" name="video"
                        onChange={handleChange}
                    />

                    <button type='submit'>add</button>

                </form>

            </div>


            )

        </>
    )
}

export default CreateReel



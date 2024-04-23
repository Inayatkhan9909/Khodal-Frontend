import React, { useEffect, useState } from 'react'
import "./Post.css"
import { useDispatch, useSelector } from 'react-redux'
import { getAllposts } from '../Redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";
import { IoSendOutline } from "react-icons/io5";
import axios from 'axios';

const Comments = ({ postId, setshowcommentIndex }) => {
    const dispatch = useDispatch();
    const [Currentpost, setCurrentpost] = useState([]);
    const data = useSelector((state) => state.getPosts.posts);
    const [token, settoken] = useState('');
    const [content, setcontent] = useState('');

    useEffect(() => {

        const storedtoken = localStorage.getItem('token');
        if (storedtoken) {

            settoken(storedtoken);
        }

    },[])

    useEffect(() => {
        if (data) {
            const post = data.posts.filter(post => post._id === postId);
            setCurrentpost(post);
        }
    }, [data, postId]);


    useEffect(() => {
        dispatch(getAllposts())

    }, [dispatch])
    console.log(Currentpost);
             
    const ExitComment = () => {
        setshowcommentIndex(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response = await axios.post("http://localhost:4599/post/addcomment",{
            postId:postId,
            token:token,
            content:content
           });
           if(response.data.message === "comment added")
           {
            toast.success(response.data.message);
           }
           else
           {
            toast.error(response.data.message);
           }
             

        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong");
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

            <div className="comment-container">
                <div className="exit_comment">

                    <button onClick={ExitComment}><RxCross2 size={28} style={{ backgroundColor: '#f1f1f1', border: 'none', cursor: 'pointer' }} /></button>

                </div>
        

                <div className="comment_content">
                    {
                        Currentpost.Comments ? <div>
                             kdjls
                            </div> 
                            : <div className='no_comment_avaliable'>No comment yet</div>
                    }
                </div>

                <div className="line"></div>

                <div className="add_comment-container">
                    <form onSubmit={handleSubmit}>

                        <input type="text"
                            name='content'
                            placeholder='write here'
                            onChange={(e) => {
                                setcontent(e.target.value);
                            }}
                            />

                        <button type='submit'><IoSendOutline size={28} /></button>
                    </form>

                </div>
            </div>


        </>
    )
}

export default Comments
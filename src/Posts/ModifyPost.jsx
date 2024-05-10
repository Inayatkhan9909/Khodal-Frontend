import React from 'react'
import IsAuthenticated from '../Authontixations/tokenAuth';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { BsShare } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeletePost } from '../Redux/actions';
import { ToastContainer,toast } from 'react-toastify';


const ModifyPost = ({ postId}) => {
    IsAuthenticated();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const response = useSelector((state) => state.deletePoststore);
    console.log(response)
    const handledelete = () => {

        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (confirmed) {
            const token = localStorage.getItem('token');

            dispatch(DeletePost(postId, token));
            navigate("/")
            console.log(response);
            if (response === "post deleted succesfully") {
                toast.success(response)
               
                navigate("/");
            }
            else {
                toast.error(response)
            }
        }
        else {
            console.log("not confirmed")
        }

    }

    const handleEdit = () => {
        navigate(`/posts/editpost?postId=${postId}`)

    }

    const handleviewpost = () => {
        navigate(`/posts/viewpost?postId=${postId}`)
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
            <div className='ModifyPost_container'>

                <ul>
                    <li >
                        <button onClick={handledelete}><MdDelete /> Delete</button>
                    </li>
                    <li>
                        <button onClick={handleEdit}><CiEdit /> Edit</button>
                    </li>
                    <li>
                        <button onClick={handleviewpost}>viewpost</button>
                    </li>
                    <li>
                        <button><BsShare /> share</button>
                    </li>
                </ul>

            </div>

        </>
    )
}

export default ModifyPost
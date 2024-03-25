import React, { useEffect, useState } from 'react'
import IsAuthenticated from '../Authontixations/tokenAuth';
import "./Post.css"
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { EditPostAction, GetPostbyId } from '../Redux/actions';
import { useLocation} from 'react-router-dom';
import Loading from '../Shared/Loading';

const EditPost = () => {
    //  const { postId } = useParams();
    IsAuthenticated();
    const location = useLocation(); 
    
    const postId = new URLSearchParams(location.search).get("postId");

    
    const [token, settoken] = useState('');
    const [caption, setcaption] = useState('');
    const [image, setimage] = useState(null);
    const dispatch = useDispatch();
   
    

    // Getting data from GetPostbyId 
    useEffect(() => {
      
        const storedtoken = localStorage.getItem('token');
        if (storedtoken) {

            settoken(storedtoken);
        }
        if(postId) 
        {
            dispatch(GetPostbyId(postId))
        }
        else{
            console.log("no post id found")
        }

    }, [dispatch])

    const data = useSelector((state) => state.getpostbyIdstore.data)
    const response = useSelector((state) => state.editpoststore)
  

    //   Update data with Editpost/updatepost

    const handleChange = (e) => {
        e.preventDefault();
        setcaption(e.target.value)
    };
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
    formData.append('postId',postId)

    

    const handlesubmit = async (e) => {
        e.preventDefault();
        
        dispatch(EditPostAction(formData))
        if(response.message === 'Post updated successfully')
        {
           toast.success(response.message)
        }
        else
        {
            toast.error(response.data)
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
            <div>
               {  data ?<div className='post-container'>
                    <form onSubmit={handlesubmit}>

                        <label htmlFor="caption">title</label>
                        <input type="text" name="caption"
                            placeholder='caption'
                            onChange={handleChange}
                            defaultValue={data.post.caption}
                        />

                        <img src={data.post.imageurl} width={200} alt="no" />

                        <label htmlFor="image">image</label>
                        <input type="file" name="image"
                            onChange={handleimage}
                           
                        />
         
                        <button type='submit'>Update</button>

                    </form>

                </div>

                   : <Loading/>     }
            </div>

        </>


    )
}

export default EditPost
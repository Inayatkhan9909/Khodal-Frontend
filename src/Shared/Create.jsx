import React, { useState } from 'react'
import CreateReel from '../Reels/CreateReel';
import CreatePost from '../Posts/CreatePost';
import './Home.css'

const Create = () => {
        const [reelBtn,setreelBtn] = useState(false);

        function handleCreatereel()  {
              setreelBtn(true);
        }
        function handleCreatepost()  {
              setreelBtn(false);
        }

  return (
    <div className='Create_container'>

        <section>
            <button onClick={handleCreatepost}>Post</button>
            <button onClick={handleCreatereel}>Reel</button>
        </section>

        <div className="create_component">
            {
                reelBtn ? <CreateReel/> : <CreatePost/>
            }
        </div>
          

    </div>
  )
}

export default Create
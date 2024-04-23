import axios from "axios";

const baseUrl = "http://localhost:4599"

export const getAllposts = () => async (action) => {

  try {

    action({
      type: "request"
    });

    const fuldata = await axios.get("http://localhost:4599/post/getPosts");
    const data = fuldata.data
    action({
      type: "success",
      message: data.message,
      Payload: data
    });

  }
  catch (error) {
    action({
      type: "failure",
      message:error.message
    })

  }
}


export const createPost = (formData) => async (action) => {

  try {

    action({
      type: "createPostRequest"
    });

    const response = await axios.post(`${baseUrl}/post/CreatePost`, formData);
    const data = response.data
    action({
      type: "createPostSuccess",
      PayloadData: data,
      Payloadmessage: data.message
    });

  }
  catch (error) {
    action({
      type: "createPostFailure",
      Payloadmessage: error.message
    });
  }

}

export const DeletePost = (postId, token) => async (action) => {
  try {

    action({
      type: "DeletePostRequest"
    });
    const response = await axios.delete("http://localhost:4599/post/DeltePost", {

      data: {
        postId: postId,
        token: token
      }
    });

    action({
      type: "DeltePostSuccess",
      datapayload: response.data
    });

  }
  catch (error) {

    action({
      type: "DeltePostFailure",
      messagepayload: "Something went wrong"
    });

  }
}

export const GetPostbyId = (postId) => async (action) => {

  try {
    action({
      type: "GetPostbyIdRequest"
    });

    const response = await axios.get(`http://localhost:4599/post/GetPostbyId?postId=${postId}`);

    action({
      type: "GetPostbyIdSuccess",
      Payload: response.data,
      message: response.data.message
    })
  }
  catch (error) {
    action({
      type: "GetPostbyIdFailure",
      dataPayload: error.message
    })
  }
}

export const EditPostAction = (formData) => async (action) => {

  try {
    action({
      type: "EditPostRequest"
    })

    const response = await axios.put("http://localhost:4599/post/EditPost", formData);

    action({
      type: "EditPostSuccess",
      padyload: response.data,
      message: response.data.message
    })

  }
  catch (error) {
    action({
      type: "EditPostFailure",
      padyload: error.message
    })
  }
}

export const AddLikeaction = (postId, token) => async (action) => {
  try {
    action({
      type: "AddLikerequest"
    })


    const response = await axios.post("http://localhost:4599/post/AddLike", { postId, token })

    action({
      type: "AddLikeSuccess",
      message: response.message
    })
  }

  catch (error) {
    action({
      type: "AddLikeFailure",
      message: error.message
    })
  }

}

export const AddcommentAction = (postId, content, token) => async (action) => {

  try {
    action({
      type: "AddcommentRequest"
    });
    const response = await axios.post("http://localhost:4599/post/addcomment", { postId, content, token });

    action({
      type: "AddcommentSuccess",
      message: response.message
    });

  }
  catch (error) {
    action({
      type: "AddcommentFailure",
      message: error.message
    });
  }
}

export const userRegister = (formData) => async (action) => {

  try {

    action({
      type: "userRegisterRequest"
    });

    const response = await axios.post(`${baseUrl}/user/register`, formData);

    action({
      type: "userRegisterSuccess",
      Payloadmessage: response.data.message

    });

  }

  catch (error) {
    console.log(error)

    action({
      type: "userRegisterFailure",
      Payloadmessage: "Something went wrong"

    });
  }

}

export const userLogin = (formData) => async (action) => {

  try {

    action({
      type: "userLoginRequest"
    });

    const response = await axios.post(`${baseUrl}/user/login`, formData);

    action({
      type: "userLoginSuccess",
      Payload: response.data,
      message:response.data.message
    });


  }
  catch (error) {
    action({
      type: "userLoginFailure",
      message: { message: "somethingwent wrong" }
    });
  }
}


export const GetProfileAction = (token) => async (action) => {

  try {
    action({
      type: "GetProfileRequest"
    });

    const response = await axios.get("http://localhost:4599/user/GetProfile",{
      headers: {
        Authorization: `Bearer ${token}`
    }
    });
     
    action({
      type: "GetProfileSuccess",
      Payload: response.data,
      message: response.data.message
    });

  }
  catch (error) {

    action({
      type: "GetProfileFailure",
      message: error.message
    });

  }

}
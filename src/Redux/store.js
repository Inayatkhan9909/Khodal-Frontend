import { configureStore } from "@reduxjs/toolkit";
import {
       getPostsreducer, createPostreducer, userRegisterreducer,
       userLoginreducer, DeletePostreducer, GetPostbyIdreducer,
       EditPostreducer, AddLikereducer, Addcommentreducer, GetProfilereducer,
       getReelsreducer,
       createReelreducer,
       followUserreducer,
       GetProfilebyUsernamereducer
} from "./reducers";
import { GetProfilebyUsernameAction } from "./actions";


export const store = configureStore({

       reducer: {
              getPosts: getPostsreducer,
              createPost: createPostreducer,
              userregistration: userRegisterreducer,
              userLoginstore: userLoginreducer,
              deletePoststore: DeletePostreducer,
              getpostbyIdstore: GetPostbyIdreducer,
              editpoststore: EditPostreducer,
              AddlikeStore: AddLikereducer,
              AddcommentStore: Addcommentreducer,
              AddProfileStore: GetProfilereducer,
              getReelsStore:getReelsreducer,
              createReelStore:createReelreducer,
              followuserStore:followUserreducer,
              GetProfilebyUsernameStore:GetProfilebyUsernamereducer
       }
});
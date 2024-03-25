import { configureStore } from "@reduxjs/toolkit";
import {
       getPostsreducer, createPostreducer, userRegisterreducer,
       userLoginreducer, DeletePostreducer, GetPostbyIdreducer,
       EditPostreducer, AddLikereducer, Addcommentreducer, GetProfilereducer
} from "./reducers";


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
              AddProfileStore: GetProfilereducer
       }
});
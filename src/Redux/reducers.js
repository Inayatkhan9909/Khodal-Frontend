import { createReducer } from "@reduxjs/toolkit";


export const getPostsreducer = createReducer({}, (builder) => {

    builder
        .addCase("request", (state) => {
            state.loading = true
        })

        .addCase("success", (state, action) => {
            state.loading = false
            state.posts = action.Payload
            state.message = action.message
        })

        .addCase("failure", (state, action) => {
            state.loading = false
            state.message = action.message
        })
})


export const createPostreducer = createReducer({}, (builder) => {

    builder
        .addCase("createPostRequest", (state) => {
            state.loading = true
        })

        .addCase("createPostSuccess", (state, action) => {
            state.loading = false
            state.data = action.Payload
            state.message = action.message
        })

        .addCase("createPostFailure", (state, action) => {
            state.loading = false
            state.message = action.message
        })
})

export const DeletePostreducer = createReducer({}, (builder) => {
    builder.addCase("createPostRequest", (state) => {
        state.loading = true
    })
        .addCase("createPostSuccess", (state, action) => {
            state.loading = false
            state.data = action.PayloadData
        })
        .addCase("createPostFailure", (state, action) => {
            state.loading = false
            state.data = action.PayloadData
        })
})

export const GetPostbyIdreducer = createReducer({}, (builder) => {
    builder.addCase("GetPostbyIdRequest", (state,) => {
        state.loading = true
    })
        .addCase("GetPostbyIdSuccess", (state, action) => {
            state.loading = true
            state.data = action.Payload
            state.message = action.message
        })
        .addCase("GetPostbyIdFailure", (state, action) => {
            state.loading = true
            state.message = action.message
        })
})

export const EditPostreducer = createReducer({}, (builder) => {
    builder.addCase("EditPostRequest", (state) => {
        state.loading = true
    })
        .addCase("EditPostSuccess", (state, action) => {
            state.loading = false
            state.data = action.Payload
            state.message = action.message
        })
        .addCase("EditPostFailure", (state, action) => {
            state.loading = false
            state.message = action.message
        })
})

export const AddLikereducer = createReducer({}, (builder) => {
    builder.addCase("AddLikerequest", (state) => {
        state.loading = true
    })
        .addCase("AddLikeSuccess", (state, action) => {
            state.loading = true
            state.message = action.message
        })
        .addCase("AddLikeFailure", (state, action) => {
            state.loading = true
            state.message = action.message
        })
})

export const Addcommentreducer = createReducer({}, (builder) => {
    builder.addCase("AddcommentRequest", (state) => {
        state.loading = true
    })
        .addCase("AddcommentSuccess", (state, action) => {
            state.loading = true
            state.message = action.message
        })
        .addCase("AddcommentFailure", (state, action) => {
            state.loading = true
            state.message = action.message
        })
})


export const userRegisterreducer = createReducer({}, (builder) => {
    builder.addCase("userRegisterRequest", (state) => {
        state.loading = true

    })
        .addCase("userRegisterSuccess", (state, action) => {
            state.loading = false
            state.message = action.Payloadmessage

        })
        .addCase("userRegisterFailure", (state, action) => {
            state.loading = false
            state.message = action.Payloadmessage
        })
})

export const userLoginreducer = createReducer({}, (builder) => {
    builder.addCase("userLoginRequest", (state) => {
        state.loading = true
    })
        .addCase("userLoginSuccess", (state, action) => {
            state.loading = false
            state.data = action.Payload
            state.message = action.message

        })
        .addCase("userLoginFailure", (state, action) => {
            state.loading = false
            state.message = action.message
        })
})

export const GetProfilereducer = createReducer({}, (builder) => {
    builder.addCase("GetProfileRequest", (state) => {
        state.loading = true
    })
        .addCase("GetProfileSuccess", (state, action) => {
            state.loading = false
            state.data = action.Payload
            state.message = action.message
        })
        .addCase("GetProfileFailure", (state, action) => {
            state.loading = false
            state.message = action.message
        })
});

export const getReelsreducer = createReducer({}, (builder) => {
    builder.addCase("getReelsRequest", (state) => {
        state.loading = true
    })
        .addCase("getReelsSuccess", (state, action) => {
            state.loading = false
            state.data = action.Payload
            state.message = action.message
        })
        .addCase("getReelsFailure", (state, action) => {
            state.loading = false
            state.message = action.message
        })
});

export const createReelreducer = createReducer({}, (builder) => {
    builder.addCase("createReelRequest", (state) => {
        state.loading = true
    })
        .addCase("createReelSuccess", (state, action) => {
            state.loading = false
            state.data = action.Payload
            state.message = action.message
        })
        .addCase("createReelFailure", (state, action) => {
            state.loading = false
            state.message = action.message
        })
});
import * as types from "./actionType"

const initialState = {
    posts: [],
    isLoading: false,
    isError: false,
}


const postreducer = (oldState = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case types.GET_POSTS_REQUEST:
            return { ...oldState, isLoading: true }
        case types.GET_POSTS_SUCCESS:
            return { ...oldState, isLoading: false, posts: payload }
        case types.GET_POSTS_ERROR:
            return { ...oldState, isLoading: false, isError: true }


        case types.POST_POSTS_REQUEST:
            return { ...oldState, isLoading: true }
        case types.POST_POSTS_SUCCESS:
            return { ...oldState, isLoading: false, posts: [...oldState.posts,payload ]}
        case types.POST_POSTS_ERROR:
            return { ...oldState, isLoading: false, isError: true }

        default:
            return oldState
    }
}

export {postreducer}
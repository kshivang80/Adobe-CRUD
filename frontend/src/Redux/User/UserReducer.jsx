import * as types from "./actionType"

const initialState = {
    users: [],
    isLoading: false,
    isError: false,
    message:""
}


const userreducer = (oldState = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case types.GET_USER_REQUEST:
            return { ...oldState, isLoading: true,  message:"" }
        case types.GET_USER_SUCCESS:
            return { ...oldState, isLoading: false, users: payload,message:"" }
        case types.GET_USER_ERROR:
            return { ...oldState, isLoading: false, isError: true ,message:payload}


        case types.POST_USER_REQUEST:
            return { ...oldState, isLoading: true , message:""}
        case types.POST_USER_SUCCESS:
            return { ...oldState, isLoading: false, users: [...oldState.users,payload ], message:""}
        case types.POST_USER_ERROR:
            return { ...oldState, isLoading: false, isError: true ,  message:payload}


            

        default:
            return oldState
    }
}

export {userreducer}
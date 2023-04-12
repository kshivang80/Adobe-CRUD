import * as types from "./actionType"
import axios from "axios"




///////POST POST request


const getPostRequest=()=>{
    return {
        type:types.GET_POSTS_REQUEST
    }
}

const getPostSuccess=(payload)=>{
    return {
        type:types.GET_POSTS_SUCCESS,
        payload
    }
}

const getPostError=()=>{
    return {
        type:types.GET_POSTS_ERROR,
    }
}

const postPostRequest=()=>{
    return {
        type:types.POST_POSTS_REQUEST,
    }
}

const postPostSuccess=(payload)=>{
    return {
        type:types.POST_POSTS_SUCCESS,
        payload
    }
}

const postPostError=()=>{
    return {
        type:types.POST_POSTS_ERROR,
    }
}






 // post  request

 const getPost=(params)=>(dispatch)=>{

    dispatch(getPostRequest())
    axios.get(`http://localhost:8080/allposts`,params)
    .then((r)=>{
        console.log(r.data)
        dispatch(getPostSuccess(r.data))

    })
    .catch((e)=>{
        dispatch(getPostError())
    })
 }

 const postPost=(params)=>(dispatch)=>{

    dispatch(postPostRequest())
    axios.post(`http://localhost:8080/posts`,params)
    .then((r)=>{
        console.log(r.data)
        dispatch(postPostSuccess(r.data))

    })
    .catch((e)=>{
        dispatch(postPostError())
        //console.log("hi")
    })
 }



 export {postPost,getPost}

import { useToast } from "@chakra-ui/react"
import * as types from "./actionType"
import axios from "axios"
// import {
//     auth_signIn_error,
//     auth_signIn_loading,
//     auth_signIn_success,
//     auth_signOut,
    

// } from './actionType'




const getUserRequest=()=>{
    return {
        type:types.GET_USER_REQUEST
    }
}

const getUserSuccess=(payload)=>{
    return {
        type:types.GET_USER_SUCCESS,
        payload
    }
}

const getUserError=()=>{
    return {
        type:types.GET_USER_ERROR,
    }
}


const postUserRequest=()=>{
    return {
        type:types.POST_USER_REQUEST
    }
}

const postUserSuccess=(payload)=>{
    return {
        type:types.POST_USER_SUCCESS,
        payload
    }
}

const postUserError=()=>{
    return {
        type:types.POST_USER_ERROR,
    }
}


///////login request

// export const SignIn = (data, next, toaster, nav) =>async (dispatch) => {
//     dispatch({type:auth_signIn_loading});
//     const {login_success, wrong_email, wrong_password, other} = toaster;
//     try{
//         let req = await axios.post('http://localhost:8080/login', data)
//         if(!req.data.error){
//             dispatch({type:auth_signIn_success, payload:{token:req.data.token, type:req.data.type}});
//             next();
//             nav();
//             login_success();
//         }else{
//             dispatch({type:auth_signIn_error, payload:req.data.message});
//             if(req.data.message==='Wrong Passwod! Please try again.'){
//                 wrong_password();
//             }else if(req.data.message==='No such user present/Invalid email'){
//                 wrong_email();
//             }
            
//         }
//     }catch(err){
//         dispatch({type:auth_signIn_error, payload:err});
//         other(err.message)
//     }
// }

//

// export const SignOut = () => {
//     return ({type:auth_signOut})
// }






const getUsers=(params)=>(dispatch)=>{
   

    dispatch(getUserRequest())
    axios.get(`http://localhost:8080/allusers`,params)
    .then((r)=>{
        //console.log(r.data,"new darat")
        dispatch(getUserSuccess(r.data))
        

    })
    .catch((e)=>{
        dispatch(getUserError())
        console.log("error")
    })
 }






 const postUsers=(params)=>(dispatch)=>{

    dispatch(postUserRequest())
    axios.post(`http://localhost:8080/users`,params)
    .then((r)=>{
        console.log(r.data)
        dispatch(postUserSuccess(r.data))

    })
    .catch((e)=>{
        dispatch(postUserError())
    })
 }


 // post  request





 export {getUsers,postUsers}

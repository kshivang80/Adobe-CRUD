import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../Pages/Home'
import Userform from '../Pages/Userform'
import Updateusers from '../Pages/Updateusers'
import Postform from '../Pages/Postform'
import Updateform from '../Pages/Updateform'
import Postlist from '../Pages/Postlist'
import Userlist from '../Pages/Userlist'
import UserAnalytics from '../Pages/UserAnalytics'
import PostAnalytics from '../Pages/PostAnalytics'
import Login from '../Pages/Login'

const AllRoutes = () => {


  return (
    <div>
     <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/userform" element={<Userform/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/updateuser" element={<Updateusers/>}></Route>
        <Route path="/postform" element={<Postform/>}></Route>
        <Route path="/updatepost" element={<Updateform/>}></Route>
        <Route path="/postlist" element={<Postlist/>}></Route>
        <Route path="/userlist" element={<Userlist/>}></Route>
        <Route path="/useranalytics" element={<UserAnalytics/>}></Route>
        <Route path="/postanalytics" element={<PostAnalytics/>}></Route>

     </Routes>
       
    </div>
  )
}

export default AllRoutes
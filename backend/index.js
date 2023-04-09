const express=require("express");
const cors=require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/User.route");
const { authentication } = require("./middleware/Authentication.middleware");
const { postRouter } = require("./routes/Post.router");
require("dotenv").config()



const app=express()
app.use(express.json())
app.use(cors())


app.get("/", async (req,res)=>{
    res.send("This is our Home page")
})
app.use("/",userRouter)
//userRouter
app.use(authentication)
app.use("/",postRouter)





app.listen(process.env.PORT, async ()=>{
    try{
        await  connection
      console.log(`Connected with Data Base ${process.env.PORT}`)

  }catch(err){
      console.log({"Error":"Error is Coming while DB Connection"})
      console.log(err)
  }
})

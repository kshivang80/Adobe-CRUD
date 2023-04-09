const express=require("express")
const { UserModel } = require("../model/User.model")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const bcrypt=require("bcrypt")


const userRouter=express.Router()


// Create a new user

userRouter.get("/allusers" ,async (req,res)=>{
    let queryData = req.query;
    try{
        const car = await UserModel.find(queryData);
              res.send(car);
        
    }catch(err){
        console.log(err)
    }
})

// userRouter.post('/users', async (req, res) => {

//     try {
//       const user = new UserModel(req.body);
//       await user.save();
//       res.status(201).send(user);
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   });

//register

userRouter.post("/users", async(req,res)=>{
    const {name,email,bio,password} =req.body

  try{
      //For Encrypting pass
      bcrypt.hash(password,5, async(err,newsecure_password)=>{
        
          //storing new password in db
          if(err){
              console.log(err)

          }else{
              const user=new UserModel({name,email,bio,password:newsecure_password})
              await user.save()
              res.send("You are Register")

          }


      })

  }catch(err){
      res.send({"Error":"Error While registring"})
      console.log(err)

  }

})










  //Login Section

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try{
        const user=await UserModel.find({email})
        const hashed_pass=user[0].password

        if(user.length>0){
            bcrypt.compare(password,hashed_pass,(err,result)=>{

                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.key)
                    res.send({"Msg":"Login Successful","token":token})
               
                }else{
                    res.send("Wrong Credentials")
                }
            })
        }else{
            res.send("Wrong Credentials")
        }


    }catch(err){
        res.send({"Error":"Error While Login"})
        console.log(err)

    }
})

  // Retrieve a user by id
userRouter.get('/users/:id', async (req, res) => {
    const ID=req.params.id
    try {
      const user = await UserModel.findById({_id:ID});
     
      res.send(user);

    } catch (err) {
        //console.log(err);
     //res.send({ Error: "Error Coming While GET BY ID Request" });
     res.status(404).send(err.message);

    }
  });


//PUT and Patch Request

userRouter.put("/users/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  

  try {
   // await UserModel.findByIdAndUpdate({ _id: ID }, payload);
   const user = await UserModel.findByIdAndUpdate({ _id: ID }, { name: req.body.name, bio: req.body.bio, updated_at: Date.now }, { new: true });    console.log(user)
    res.send(`The document with id:${ID} has been updated`);
  } catch (err) {
    console.log(err);
    console.log({ Error: "Error coming While Put Request" });
    res.status(404).send(err.message);
  }
});


// DELETE REQUEST

userRouter.delete("/users/:id", async (req, res) => {
  const ID = req.params.id;

  try {
    await UserModel.findByIdAndDelete({ _id: ID });
    res.send(`The document with id:${ID} has been deleted`);
  } catch (err) {
    console.log(err);
    console.log({ Error: "Error coming While DELETE Request" });
    res.status(404).send(err.message);
  }
});


// Retrieve the total number of users
userRouter.get('/analytics/users', async (req, res) => {
    try {
      const count = await UserModel.countDocuments();
      res.send({ count });
    } catch (error) {
      res.status(500).send(error);
    }
  });


  // userRouter.get('/analytics/users/top-active', async (req, res) => {
  //   try {
  //     const users = await UserModel.aggregate([
  //       { $lookup: { from: 'posts', localField: '_id', foreignField: 'userID', as: 'posts' } },
  //       { $project: { name: 1, email: 1, bio: 1, created_at: 1, updated_at: 1, post_count: { $size: '$posts' } } },
  //       { $sort: { post_count: -1 } },
  //       { $limit: 5 }
  //     ]);
  //     res.send(users);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).send('Server Error');
  //   }
  // });







module.exports={
    userRouter
}


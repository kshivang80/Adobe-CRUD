const express=require("express")
const { PostModel } = require("../model/Post.model")
//const { PostModel} =require("../Model/Post.model")


const postRouter=express.Router()


postRouter.get("/allposts",async(req,res)=>{
    let queryData=req.query

    try{
        const post= await PostModel.find(queryData)
        res.send(post)

    }catch(err){
        console.log(err)
        console.log({"Error":"Error While Get Request"})

    }
})

postRouter.post("/posts",async(req,res)=>{
    let data=req.body

    try{
      //For adding in to database
      const new_post=new PostModel(data)
      await new_post.save()
      res.send("Post Data is added  Successfully")

    }catch(err){

      console.log(err)
      console.log({"Error":"Error While Post Request"})


    }

})

// Patch REQUEST

postRouter.put("/posts/:id",async(req,res)=>{

    const ID=req.params.id
    const payload=req.body

    //For finding ID
    const post =await PostModel.findOne({_id:ID})
   // console.log(post,"post user id")
    const userID_in_post=post.userID
    const userID_making_req=req.body.userID


    try{
        if(userID_making_req !==userID_in_post){
            res.send({"Msg":"You are not authorized person"})

        }else{
            await PostModel.findByIdAndUpdate({_id:ID},payload)
            res.send(`updated the Post whose ID is ${ID}`)
        }

    }catch(err){
        console.log(err)
        console.log({"Error":"Error While Patch Request"})

    }
})

// DELETE REQUEST

postRouter.delete("/posts/:id",async(req,res)=>{

    const ID=req.params.id
    //const payload=req.body

    //For finding ID
    const post =await PostModel.findOne({_id:ID})
    console.log(post,"post user id")
    const userID_in_post=post.userID
    const userID_making_req=req.body.userID


    try{
        if(userID_making_req !==userID_in_post){
            res.send({"Msg":"You are not authorized person"})

        }else{
            await PostModel.findByIdAndDelete({_id:ID})
            res.send(`delete the Post whose ID is ${ID}`)
        }

    }catch(err){
        console.log(err)
        console.log({"Error":"Error While delete Request"})

    }
})

// like incress
// postRouter.post('/posts/:id/like', (req, res) => {


//     Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true }, (err, post) => {
//       if (err) return res.status(500).json({ error: err.message });
//       if (!post) return res.status(404).json({ error: 'Post not found' });
//       return res.status(200).json(post);
//     });
//   });


// POST /posts/:id/like: Increment the like count of a post by id
postRouter.post('/posts/:id/like', async (req, res) => {

    try {
      const post = await PostModel.findByIdAndUpdate(req.params.id, {
        $inc: { likes: 1 },
        updated_at: Date.now()
      }, { new: true });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



  postRouter.post('/posts/:id/unlike', async (req, res) => {
    //const { id } = req.params;

    const ID=req.params.id

    try {
      const post = await PostModel.findByIdAndUpdate({_id:ID}, { $inc: { likes: -1 } }, { new: true });
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      if (post.likes < 0) {
        post.likes = 0;
        await post.save();
      }
      return res.json(post);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });


  // Retrieve the total number of users
postRouter.get('/analytics/posts', async (req, res) => {
    try {
      const count = await PostModel.countDocuments();
      res.send({ count });
    } catch (error) {
      res.status(500).send(error);
    }
  });

// Retrieve the top 5 most liked posts
postRouter.get('/analytics/posts/top-liked', async (req, res) => {
    try {
      const topPosts = await PostModel.aggregate([
        { $sort: { likes: -1 } },
        { $limit: 5 }
      ]);
      res.send(topPosts);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  


module.exports={
    postRouter
}

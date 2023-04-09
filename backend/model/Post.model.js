const mongoose = require("mongoose")

const postSchema = mongoose.Schema({

    userID:{type:String},
    
    content: {
        type: String,
        minlength: 1,
        maxlength: 300,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
    created_at: { type: Date, default: Date.now, },
    updated_at: { type: Date, default: Date.now, },

},
// {
//     timestamps: true
// }
)

const PostModel=mongoose.model("post",postSchema)

module.exports={
    PostModel
}
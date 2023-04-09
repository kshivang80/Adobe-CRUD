const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    name: { type: String, require: true, minlength: 1, maxlength: 50 },
    email: { type: String, require: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, },
    password:{type:String,required:true},
    bio: { type: String, maxlength: 200 },
    created_at: { type: Date, default: Date.now, },
    updated_at: { type: Date, default: Date.now, },

}
)

const UserModel = mongoose.model("User", userSchema)

module.exports = {
    UserModel
}
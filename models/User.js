const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    tasks:{
        type:Array,
        default:[]
    }

})
mongoose.model("User",userSchema)
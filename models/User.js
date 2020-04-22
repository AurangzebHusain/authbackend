const  mongoose=require("mongoose");
const crypto=require("crypto");
require('dotenv').config();


var userSchema=new mongoose.Schema({
    name:{type:String,required:true,maxlength:32},
    email:{type:String,required:true,unique:true,maxlength:32},
    salt:String,
    encry_password:{
        type:String,required:true
    },
})


userSchema.virtual("password")
.set(function(password){

    this._password=password;
    this.salt=process.env.SECRET;
    this.encry_password=this.securePassword(password);
})
.get(function(){
    return this._password;
})
userSchema.methods={
    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password;
    },

    securePassword:function(plainpassword){
        if(!plainpassword) return "";
        try{
            return crypto
            .createHmac('sha256',this.salt)
            .update(plainpassword)
            .digest('hex')
        }
        catch(error){
            return error;
        }
    }
}

module.exports=mongoose.model("User",userSchema);
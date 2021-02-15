const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    name : {
  type : String,
  required : [true,'Please tell us your name']
    },
    email :{
        type : String,
        required : [true,"Please tell us your email"],
        unique:true,
        lowercase : true,
        validate :[validator.isEmail,'Please give a valid email']
    },
    photo :{
        type: String
    },
    password:{
        type: String,
        required : [true,'Please give a password'],
        minlength : 8,
        select : false
    },
    passwordConfirm : {
type : String,
required : [true,'Please confirm your password'],
validate : {
    validator :function(el){
        return el === this.password;
    },
    message : "Password is not same"
}
    }
})

userSchema.pre('save',async function(next){
if(!this.isModified('password'))
return next();

this.password = await bcrypt.hash(this.password,12)
// console.log("bcrypt")
this.passwordConfirm = undefined;

next();
})

userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}

const User = mongoose.model('user',userSchema);
module.exports = User;
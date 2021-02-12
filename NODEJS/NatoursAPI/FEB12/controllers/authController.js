const jwt  = require('jsonwebtoken');
const {promisify} = require('util');
const User = require('./../models/userModel');
const AppError = require('./../utilities/appError');

exports.signup = async (req,res,next)=>{
    try{
        // console.log('0');
    const newUser =await User.create({
        name : req.body.name,
        email : req.body.email,
        password :req.body.password,
        passwordConfirm : req.body.passwordConfirm
    });
        // console.log('1');
    const token = jwt.sign({id : newUser._id},'1-2-3-4-4-5-5-6-6')
    // console.log('2');
    res.status(201).json({
        staus : 'success',
        token,
        data : {
            user : newUser
        }
    })
}
catch(err){
    res.status(404).json({
        staus :"fail",
        message : err
      })
}
}


exports.login = async (req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password){
     return next(new AppError('please provide email and password',400)); 
    }
const user = await User.findOne({email}).select('+password');


if(!user || !(await user.correctPassword(password,user.password))) return next(new AppError('Incorrect email or password',401))


    const token  = jwt.sign({id : user._id},'1-2-3-4-4-5-5-6-6');

    res.status(200).json({
        status : 'success',
        token
    })

}

exports.protect =  (req,res,next)=>{
    let token;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
 token = req.headers.authorization.split(' ')[1];
}
if(!token)
{
    return next(new AppError('you are not logged in, please log in',401))
}
 const decoded =  jwt.verify(token,'1-2-3-4-4-5-5-6-6')
console.log(decoded);
next();
}
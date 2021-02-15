const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    name:{
      type: String,
      required : [true,"must have a name"],
      unique:true,
      trim:true
    },
    ratingAverage:{
      type: Number,
    default : 4.5,
    },
    ratingQuantity:{
      type: Number,
    default : 0,
    },
    duration : {
      type : Number,
      required : [true, "must have duration"]
    },
    maxGroupSize : {
      type : Number,
      required : [true,'must have size']
    },
    difficulty : {
      type : String,
      required:[true,"must have a difficulty"],
    },
       price : {
      type:Number,
     required:[true,"must have a price"],
    },
    description : {
      type:String,
    },
    priceDiscount : {
      type:Number
    },

     sumary:{
       type:String,
       trim:true
     },
     imageCover:{
       type: String,
       required :  [true,"Require cover image"]
     },
     images : [String],
    createdAt : {
      type :Date,
      default:Date.now(),
      select:false
    },
    startDates : [Date]
  })
  const Tour = new mongoose.model('Tour',tourSchema);
  module.exports=Tour;
  
  
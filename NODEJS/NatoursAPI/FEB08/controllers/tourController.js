const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAllTours =async (req,res)=>{
 try{
   const queryObj = {...req.query}
   const exclude = ['page','sort','limit','fields']
   exclude.forEach(el=>delete queryObj[el]);
   console.log(req.query)
   console.log(queryObj)

    const tours = await Tour.find(queryObj);
  res.status(200).json({
      status : 'success',
      result : {
        length : tours.length,
        tours 
      }

     
  })
}catch(err){
res.status(404).json({
  status : "fail",
  message : err
})
}
  }
exports.getTour = async (req, res) => {
  try{
const tour = await Tour.findById(req.params.id)
res.status(201).json({
  status : "success",
  data :{
    tour
  }
})
  }catch(err){
res.status(404).json({
  staus :"fail",
  message : err
})
  }
  

  // const tour = tours.find(el => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour
  //   }
  // });
  
};

exports.createTour = async(req, res) => {
  try{
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
} catch(err){
   res.status(400).json({
     status : "failed",
     message : err
    });
  }
}
exports.updateTour = async(req, res) => {
  try{
const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
  new :true,
  runValidators:true 
})
  res.status(200).json({
    status: 'success',
    data: {
      tour 
    }
  });
}catch(err){
res.status(400).json({
     status : "failed",
     message : err
    });
}
};

exports.deleteTour =async (req, res) => {
  try{
    await Tour.findByIdAndDelete(req.params.id)
  res.status(204).json({
    status: 'success',
    data: {
      deletedDataId : req.params.id
    }
  });
}
catch(err){
  res.status(204).json({
    status: 'failed'
})
}
};


// module.exports = {
//   getDetails: async () => {
//     try {
//       console.log('Inside getDetails COntroller')
//     } catch (error) {
      
//     }
//   },
//   setDetails: async () => {
//     try {~
      
//     } catch (error) {
      
//     }
//   }
// }
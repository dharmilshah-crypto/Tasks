const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAllTours =async (req,res)=>{
 try{
//   console.log(req.url);
//    const queryObj = {...req.query}
//    const exclude = ['page','limit']
//    exclude.forEach(el=>delete queryObj[el]);
//    console.log(queryObj);

//    let queryStr = JSON.stringify(queryObj);
//    console.log(queryStr);

//    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
//    console.log(queryStr);

// let tours = Tour.find(req.);
// console.log(req.query);
// if(req.querys.sort)
// {
//    const sortBy = req.query.sort.split(',').join(" ");
//   querys = querys.sort(sortBy)
// }

// if(req.query.fields)
// {
//   const fields = req.query.fields.split(',').join(" ");
//   console.log(fields)
//   querys = querys.select(fields)
// }
// else{
//   querys = querys.select('-__v')
// }
// const tours = await querys;

//filtering
const queryObj = { ...req.query }

   const exclude = ['page','limit','fields','sort']
   exclude.forEach(el=>delete queryObj[el]);

//advanced filtering
let queryStr = JSON.stringify(queryObj);
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);


let query = Tour.find(JSON.parse(queryStr))
//sorting
if(req.query.sort)
{
   const sortBy = req.query.sort.split(',').join(' ');
  query = query.sort(sortBy)
}
//  else{
//   query=query.sort('createdAt')
//  }

//fieldlimiting
if (req.query.fields)
{
  const fields = req.query.fields.split(',').join(' ');
  console.log(fields);
  query=query.select(fields);
}
//  else{
//   query=query.select('-__v');
//  }

//pagination
const page = req.query.page * 1 || 1;
const limit = req.query.limit * 1 || 100;
const skip = (page*limit)-limit;
query = query.skip(skip).limit(limit);

if(req.query.page)
{
  const numTours = await Tour.countDocuments();
  if(skip >= numTours) throw new Error('Page Doesnot Exist');
}
//execute
const tours = await query;

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
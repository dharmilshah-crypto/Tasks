const dotenv = require('dotenv');
const mongoose = require('mongoose');   
const fs =require('fs')
const Tour = require('./models/tourModel')

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
console.log(process.env.DATABASE_PASSWORD)
mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("successful");
}).catch(err=>{
  console.log("error00");
})

const tours =JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,'utf-8'))
const importData = async () => {
    try{
        await Tour.create(tours);
            console.log("success to load")
    }catch(err){
        console.log(err);
        }

}
const deleteData = async ()=>{
    try{
        await Tour.deleteMany();
            console.log("success to delete")
    }catch(err){
        console.log(err);
        }
}
// deleteData();
// if(process.argv === '--import'){
importData();

// }
// else if(process.argv === '--delete'){

// process.exit();
// }
// console.log(process.argv);
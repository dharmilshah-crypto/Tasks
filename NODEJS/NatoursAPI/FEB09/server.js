// const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');


// const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
// console.log(process.env.DATABASE_PASSWORD)
mongoose.connect('mongodb+srv://User:User2304-@cluster0.n0ujr.mongodb.net/Natours?retryWrites=true&w=majority',{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("successful");
}).catch(err=>{
  console.log("error00");
})



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

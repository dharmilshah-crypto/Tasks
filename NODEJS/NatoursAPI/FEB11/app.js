const express = require('express');
const morgan = require('morgan');

const app = express();
const AppError = require('./utilities/appError');
const globalErrorHandler = require('./controllers/errorController')  
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1) MIDDLEWARES
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all("*",(req,res,next)=>{
  // res.status(404).json({
  //   status : "fail",
  //   message : `Cant find ${req.originalUrl} on this server`
  // })
  //   const err = new Error(`Cant find ${req.originalUrl} on this server`)
  // err.status = "fail";
  // err.statusCode = 404; 
next(new AppError(`Cant find ${req.originalUrl} on this server`,404))
})

app.use(globalErrorHandler)

module.exports = app;

const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();


// 1. Middleware
console.log(process.env.NODE_ENV );
if(process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// "express.json()" middleware is bascially a functionn that can modify the incoming request data.

app.use((req, res, next) => {
  console.log('Hello from this middleware 👋');
  next();
});

//   app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString();
//     next();
//   });

// Route Handler


// // get
// app.get('/api/v1/tours', getAllTours);

// // get with params
// app.get('/api/v1/tours/:id', getTour);

// // post
// app.post('/api/v1/tours', createTour);

// // patch
// app.patch('/api/v1/tours/:id', updateTour);

// // delete
// app.delete('/api/v1/tours/:id', deleteTour);


// this is midddleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
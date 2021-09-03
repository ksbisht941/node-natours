const fs = require("fs");
const bodyParser = require("body-parser");
const Tour = require("./../models/tourModel");

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Invalid ID",
//     });
//   }

//   // console.log(req.body);
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   // console.log(req.body);
//   //   if (!req.body.name || !req.body.price) {
//   //     return res.status(400).json({
//   //       code: "400",
//   //       status: "fail",
//   //       message: "Missing name or price"
//   //     });
//   //   }

//     next();
// }

// Tours

exports.getAllTours = async (req, res) => {
  // console.log(req.requestTime);

  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: "success",
      requestAt: req.requestTime,
      length: tours.length,
      code: "200",
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.find({_id: req.params.id});

    res.status(200).json({
      status: "success",
      code: "200",
      data: {
        tour,
      },
    });
  } catch (err) {
    B;
    res.status(404).json({
      code: "404",
      status: "failed",
    });
  }

  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id == req.params.id);

  // if (!tour) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "Invalid ID",
  //   });
  // }

  // res.status(200).json({
  //   status: "success",
  //   length: tours.length,
  //   code: "200",
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {
  console.log('createTour', req.body);
  try {
    // #1 Method
    // const newTour = new Tour({})
    // newTour.save()

    // #2 Method
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      code: 201,
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    // console.log("Error 💥", err);
    res.status(400).json({
      code: 400,
      status: "failed",
      message: err,
    });
  }

  // console.log("create", req.body);
  // const newId = tours[tours.length - 1].id + 1;

  // const newTour = Object.assign({ id: newId }, req.body);

  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       message: "success",
  //       code: "201",
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
  // console.log(res);
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: "success",
      code: "200",
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      code: "404",
      status: "failed",
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {

    await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      code: "200",
      message: 'Tour delete successfully 💥'
    });
  } catch(err) {
    res.status(404).json({
      status: "failed",
      code: "404",
      message: 'Unable to delete tour 💥'
    });
  }
  
};

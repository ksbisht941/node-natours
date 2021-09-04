// const fs = require("fs");
// const bodyParser = require("body-parser");
const Tour = require("./../models/tourModel");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price',
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};



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
    // #1 method
    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy'
    // });

    // #2 method
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // BUILD QUERY
    // 1A) Basic Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log("queryStr", JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      // console.log(sortBy);
      query = query.sort(req.query.sort);

      // sort('price r')
    } else {
      query = query.sort("-createdAt");
    }

    // 3) Limiting fields
    // console.log(req.query.fields);
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      // console.log(numTours);
      if (skip >= numTours) throw new Error('This page does not exist');
      
    }

    // EXECUTE QUERY
    const tours = await query;
    // query.sort().select().skip().limit()

    res.status(200).json({
      code: "200",
      status: "success",
      requestAt: req.requestTime,
      length: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      code: '404',
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
  // console.log('createTour', req.body);
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
      runValidators: true,
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
      message: "Tour delete successfully 💥",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      code: "404",
      message: "Unable to delete tour 💥",
    });
  }
};

const fs = require("fs");
var bodyParser = require('body-parser');  

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  // console.log(req.body);
  next();
};

exports.checkBody = (req, res, next) => {
  // console.log(req.body);
  //   if (!req.body.name || !req.body.price) {
  //     return res.status(400).json({
  //       code: "400",
  //       status: "fail",
  //       message: "Missing name or price"
  //     });
  //   }

    next();
}

// Tours
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: "success",
    requestAt: req.requestTime,
    length: tours.length,
    code: "200",
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id == req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    length: tours.length,
    code: "200",
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  console.log("create", req.body);
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        message: "success",
        code: "201",
        data: {
          tour: newTour,
        },
      });
    }
  );
  // console.log(res);
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    code: "200",
    data: {
      tour: "<Updated tours here...>",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: "success",
    code: "200",
    data: {
      tour: "<Updated tours here...>",
    },
  });
};

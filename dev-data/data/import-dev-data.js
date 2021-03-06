const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const Tour = require("./../../models/tourModel");
const Review = require("./../../models/reviewModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

// READ JSON FILE
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  // try {
  //   await Tour.create(tours);
  //   console.log("Data successfully loaded!");
  //   process.exit();
  // } catch (err) {
  //   console.log(err);
  // }

  try {
    await Review.create(reviews);
    console.log("Data successfully loaded!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  // try {
  //   await Tour.deleteMany();
  //   console.log("Data successfully deleted!");
  //   process.exit();
  // } catch (err) {
  //   console.log(err);
  // }

  try {
    await Review.deleteMany();
    console.log("Data successfully deleted!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);

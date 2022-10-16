const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');
// const DBConnect = require("./utils/dbConnect");

const app = require('./app');

// database connection
// DBConnect();
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {
    console.log(`Database connected successfully`.green.bold);
  })
  .catch((err) => {
    console.log(`Not Connected to Database ERROR! `.red.bold, err);
  });

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

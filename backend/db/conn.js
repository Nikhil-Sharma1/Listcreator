const mongoose = require('mongoose');
require('dotenv').config();
const DB = process.env.DATABASE;
// console.log("This is " + DB);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => err ? console.log(err) :
  console.log('Connected to spottabl database'));



require('dotenv').config();

const mongoose = require('mongoose');

// dotenv.config({ path: './config.env' });

require('./db/conn');
const Users = require('./model/userschema');
const PORT = process.env.PORT;









//User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.use(express.json());
//link router files
app.use(require('./router/auth'));



// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("frontend/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//   })
// }

app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});

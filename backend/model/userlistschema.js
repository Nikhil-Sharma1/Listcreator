const mongoose = require('mongoose');
const userlistSchema = new mongoose.Schema({
  lname: {
    type: String,
    required: true
  },
  luniqueId: {
    type: String,
    required: true
  },
  uuniqueId: {
    type: String,
    required: true
  },
  ufname: {
    type: String,
    required: true
  },
  ulname: {
    type: String,
    required: true
  },
});
//create collection
const UserList = mongoose.model('USER LIST', userlistSchema);
module.exports = UserList;
const mongoose = require('mongoose');
const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  uniqueId: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  createdById: {
    type: String,
    required: true
  }
});
//create collection
const List = mongoose.model('LIST', listSchema);
module.exports = List;
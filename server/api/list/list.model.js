const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  position: {
    type: Number,
    default: 0
  },
  cards: {
    type: [String],
    default: [],
    require: true
  }
},{
    timestamps: {
      createAt: "create_at",
      updateAt: "update_at"
  }
});

module.exports = mongoose.model('List', listSchema);

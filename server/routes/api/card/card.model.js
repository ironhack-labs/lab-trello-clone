const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String,
    dueDate: Date,
    position: Number,
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Card", CardSchema);

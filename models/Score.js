const mongoose = require("mongoose");

const ScoreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    // appropriate: true, custom val?
    // max num char ?
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Scores", ScoreSchema);

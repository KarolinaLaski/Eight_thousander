var mongoose = require("mongoose");

var mountainSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  height: { type: Number },
  location: String,
  ascents: { type: Number },
  deaths:{ type: Number },
  summiters: [
     {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Summiter"
     }
  ]
});

module.exports = mongoose.model("Mountain", mountainSchema);

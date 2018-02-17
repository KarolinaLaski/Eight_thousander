var mongoose = require("mongoose");

var summiterSchema = mongoose.Schema({
    name: String,
    nationality: String,
    image: String,
    birthday: { type: Date, default: new Date() },
    about: String,
    mountains: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Mountain"
      }
    ]
});

module.exports = mongoose.model("Summiter", summiterSchema);

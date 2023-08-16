const mongoose = require("mongoose");

const sec2Schema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  inputValues: [Number], // Add this field for storing input values
  searchValue: Number, // Add this field for storing search value
});

const Section2 = mongoose.model("Section2", sec2Schema); // Adjust the model name
module.exports = Section2; // Adjust the export name

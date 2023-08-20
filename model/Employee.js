const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  skills: String,
  roll: String,
  image: String,
});
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;

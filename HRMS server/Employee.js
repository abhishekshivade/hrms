// Employee.js

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
EmployeeID: String,
  FirstName: String,
  LastName:String,
  Designation: String
});

module.exports = mongoose.model('Employee', employeeSchema);

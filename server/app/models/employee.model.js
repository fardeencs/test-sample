const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: String,
    jobTitle: String
}, {
  timestamps: true
});


module.exports  = mongoose.model('Employee', EmployeeSchema);
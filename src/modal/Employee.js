const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    //required: true,
  },
  typeId: {
    type: ObjectId,
    required: true,
  },

  address: {
    type: {
      ward: {
        type: String,
      },
      district: {
        type: String,
      },
      city: {
        type: String,
      },
    },
  },
  gender: {
    type: Boolean,
    default: false,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

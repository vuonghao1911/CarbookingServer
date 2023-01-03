const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const placeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  busStation: [
    {
      location: {
        type: String,
      },
    },
  ],
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;

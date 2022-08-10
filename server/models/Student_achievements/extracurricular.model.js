const mongoose = require("mongoose");

const extracurricularSchema = new mongoose.Schema({
  category: {
    type: String,
    require: [true, "Please enter category"],
  },
  description: {
    type: String,
    require: [true, "Please enter description"],
  },
  position: {
    type: String,
    require: [true, "Please enter your position"],
  },
  date: {
    type: Date,
    require: [true, "Please enter date of achievement"],
  },
  club: {
    type: String,
    require: false,
  },
  certificate: {
    public_id: {
      type: String,
      require: false,
    },
    url: {
      type: String,
      require: false,
    },
  },
  event_images: {
    images: [
      {
        public_id: {
          type: String,
          require: false,
        },
        url: {
          type: String,
          require: false,
        },
      },
    ],
  },
});

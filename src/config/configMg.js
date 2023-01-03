const mongoose = require("mongoose");

const connectMG = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://vuonghao1:1j2SyRDpNHE7kFlw@carticketbooking.jxuzmoe.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB Connected: " + conn.connection.host);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectMG;

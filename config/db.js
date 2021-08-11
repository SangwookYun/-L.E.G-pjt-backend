const mongoose = require("mongoose");

const connDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`DB connected: ${conn}`);
  } catch (err) {
    console.error(`${err.message}`);
    process.exit(1);
  }
};

module.exports = connDB;

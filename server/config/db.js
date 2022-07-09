const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(process.env.DATABASE_URL);
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      //   newUserUrlParser: true,
      //   useCreateIndex: true,
    });
    console.log(`Mongo connected ${conn.connection.host}`);
  } catch (err) {
    console.log(`error ${err}`);
  }
};

module.exports = connectDB;

const { mongoose } = require("mongoose");
const connect = async () => {
  return await mongoose.connect(process.env.CONNECTIONSTRING, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useMongoClient: true,
  });
};

// exports.connect = connect;
module.exports.connect = connect;

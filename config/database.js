const mongoose = require('mongoose');
const config = require('./config');
const connectDatabase = async () => {
  try {
    const connectionString = config.database.connectionString;

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./config/config');

mongoose.connect(config.database.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = config.server.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

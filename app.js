const express = require('express');
const { initModels } = require('./models/initModels');

// Import database
const { db } = require('./utils/database');

const app = express();

db.authenticate()
  .then(() => {
    console.log('Database authenticated');
  })
  .catch(err => console.log(err));

initModels();

db.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => console.log(err));

// Spin uo server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});

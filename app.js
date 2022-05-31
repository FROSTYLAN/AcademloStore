const express = require("express");

const app = express();

const PORT = 4008;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});

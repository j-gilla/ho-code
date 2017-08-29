const express = require('express')
const app = express();
const morgan = require('morgan');
const router = require('./routes/index');

const port = process.env.PORT || 8000;

app.use('/', router);

app.listen(port, () => {
  console.log("listening on port " + port);
});

const express = require('express')
const app = express();
const morgan = require('morgan');
const router = require('./routes/index');

const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}
app.use('/', router);

app.listen(port, () => {
  console.log("Listening on port " + port);
});

module.exports = app;

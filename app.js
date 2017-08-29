const express = require('express')
const app = express();
const morgan = require('morgan');
const cityRouter = require('./routes/cityRouter');
const postcodeRouter = require('./routes/postcodeRouter');

const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}
app.use('/', cityRouter);
app.use('/', postcodeRouter);

app.listen(port, () => {
  console.log("Listening on port " + port);
});

module.exports = app;

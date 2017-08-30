'use strict';
process.env.NODE_ENV = 'test';

const postcodeRouter = require('express').Router();
const data = require('../data.json');

postcodeRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

postcodeRouter.get('/clinics/postcode/:postcode', (req, res) => {
  let params = req.params.postcode;
  let results = data.result;

  let filterResults = results.filter((item) => {
    if(params === item.postcode.split(" ").join("")) {
      return true;
    }
  }).map((item) => { return{
    'organisation_id':item.organisation_id,
    'name': item.name
  };
});
    res.status(200).json(filterResults);
});

postcodeRouter.get('*', function(req, res) {
  res.status(404).json({ "message":'sorry page not found' });
});


module.exports = postcodeRouter;

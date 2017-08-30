'use strict';
const cityRouter = require('express').Router();
const data = require('../data.json');

cityRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

cityRouter.get('/clinics/city/:name',(req, res) => {
  let params = req.params.name;
  let results = data.result;
  let resObj = { results: {}};

  let filterResults = results.filter((item) => {
    if(params === item.city) {
      return true;
    }
  }).map((item) => item.partial_postcode).reduce((prev,curr) => {
    let nextItem = prev;
    if(Object.keys(nextItem).includes(curr)) {
      nextItem[curr] += 1;
    } else{
      nextItem[curr] = 1;
    }
    return nextItem;
  },{});
  resObj.results = filterResults;
  res.status(200).json(resObj);
});

cityRouter.get('*', function(req, res) {
  res.status(404).json({ "message":'sorry page not found' });
});

module.exports = cityRouter;

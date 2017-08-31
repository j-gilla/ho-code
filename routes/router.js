'use strict';
const router = require('express').Router();
const data = require('../data.json');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

router.get('/clinics/city/:name',(req, res) => {
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

router.get('/clinics/postcode/:postcode', (req, res) => {
  let params = req.params.postcode;
  let results = data.result;

  let filterResults = results.filter((item) => {
    if(params === item.postcode.split(" ").join("")) {
      return true;
    }
  }).map((item) => { return{
    'organisation_id':item.organisation_id,
    'name': item.name,
    'address': getAddressInfo(item)
  };
});
res.status(200).json(filterResults);
});

router.get('*', function(req, res) {
  res.status(404).json({ "message":'sorry page not found' });
});

function getAddressInfo(item) {
  let address = "";
  if(item.address1 !== ""){
    address += item.address1
  }
  if(item.address2 !== ""){
    address += item.address2
  }
  if(item.address3 !== ""){
    address += item.address3
  }
  let result = item.name +" "+ '('+address+')';

  return result;

}

module.exports = router;

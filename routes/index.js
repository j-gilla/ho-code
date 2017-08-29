const router = require('express').Router();
const data = require('../data.json');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

router.get('/clinics/postcode/:postcode', (req, res) => {
  let params = req.params.postcode;
  let results = data.result;

  let filterResults = results.filter((item) =>{
    if(params === item.postcode.split(" ").join("")) {
      return true;
    }
  }).map((item) => { return{
    'organisation_id':item.organisation_id,
    'name': item.name
  }});
    res.status(200).json(filterResults);
});

router.get('/clinics/city/:name',(req, res) => {
  let params = req.params.name;
  let results = data.result;
  let resObj = {results: {}};

  let filterResults = results.filter((item) => {
    if(params === item.city){
      return true;
    }
  }).map((item) => item.partial_postcode).reduce((prev,curr) => {
    let nextItem = prev;
    if(Object.keys(nextItem).includes(curr)){
      nextItem[curr] += 1;
    } else{
      nextItem[curr] = 1;
    }
    return nextItem;
  },{});
  resObj.results = filterResults;
  res.status(200).json(resObj);
});

module.exports = router;

const postcodeRouter = require('express').Router();
const data = require('../data.json');

postcodeRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

postcodeRouter.get('/clinics/postcode/:postcode', (req, res) => {
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


module.exports = postcodeRouter;

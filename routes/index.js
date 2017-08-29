const router = require('express').Router();
const data = require('../data.json');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = router;

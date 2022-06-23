var controller = require('./controllers');
var router = require('express').Router();

// Gets the word of the day
router.get('/wotd/get', controller.wotd.get);
// Check if word exists in bank
router.get('/wotd/check', controller.wotd.check);

module.exports = router;
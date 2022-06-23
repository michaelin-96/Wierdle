var controller = require('./controllers');
var router = require('express').Router();

router.get('/wotd', controller.wotd.get);

module.exports = router;
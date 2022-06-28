var controller = require("./controllers");
var router = require("express").Router();

// Gets the word of the day
router.get("/wotd/get", controller.wotd.get);
// Check if word exists in bank works for both practice and wotd
router.get("/wotd/check", controller.wotd.check);
// Gets random word
router.get("/practice/get", controller.practice.get);

router.get("/speedle/get", controller.speedle.get);
module.exports = router;

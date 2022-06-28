var dbconnect = require("../db");

module.exports = {
  get: function (req, res) {
    let randomWord = Math.floor(Math.random() * 12849);
    let queryStr = `SELECT word FROM wordlewb WHERE id = $1`;
    dbconnect
      .query(queryStr, [randomWord])
      .then((data) => {
        res.send(data.rows[0].word);
      })
      .catch((err) => res.send(err));
  },
};

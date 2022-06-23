var dbconnect = require('../db');

module.exports = {
  get: function (req, res) {
    let queryStr = `SELECT word FROM wordlewb WHERE id = (SELECT wordlewb_id FROM wotd WHERE date = TO_CHAR(CURRENT_DATE, 'yyyy-mm-dd'))`;
    dbconnect.query(queryStr)
      .then((data) => {
        if (data.rowCount) {
          res.send(data.rows[0].word);
        } else {
          let randomWOTD = Math.floor(Math.random() * 12849);
          let queryStr2 = `INSERT INTO wotd (date, wordlewb_id) VALUES (TO_CHAR(CURRENT_DATE, 'yyyy-mm-dd'), $1)`
          dbconnect.query(queryStr2, [randomWOTD])
            .then(() => {
              dbconnect.query(queryStr)
                .then((data) => {res.send(data.rows[0].word)})
                .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
        }

      })
      .catch(err => console.log(err));
  }


}
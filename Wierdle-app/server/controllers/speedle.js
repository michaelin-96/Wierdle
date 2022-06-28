var dbconnect = require("../db");

module.exports = {
  get: function (req, res) {
    let randomWord = Math.floor(Math.random() * 12849);
    let randomWord2 = Math.floor(Math.random() * 12849);
    let randomWord3 = Math.floor(Math.random() * 12849);
    let randomWord4 = Math.floor(Math.random() * 12849);
    let randomWord5 = Math.floor(Math.random() * 12849);
    let randomWord6 = Math.floor(Math.random() * 12849);
    let randomWord7 = Math.floor(Math.random() * 12849);
    let randomWord8 = Math.floor(Math.random() * 12849);

    let queryStr = `SELECT word FROM wordlewb WHERE id = $1 OR id = $2 OR id = $3 OR id = $4 OR id = $5 OR id = $6 OR id = $7 OR id = $8`;
    dbconnect
      .query(queryStr, [
        randomWord,
        randomWord2,
        randomWord3,
        randomWord4,
        randomWord5,
        randomWord6,
        randomWord7,
        randomWord8,
      ])
      .then((data) => {
        let arr = [];
        for (let i = 0; i < data.rows.length; i++) {
          arr.push(data.rows[i].word);
        }
        res.send(arr);
      })
      .catch((err) => res.send(err));
  },
};

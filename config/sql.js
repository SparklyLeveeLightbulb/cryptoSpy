const db = require('./database.js');

// ======================================
// Functions to add current value to coins table on init
// Should be reworked to insert and then update as opposed to create new entries
// on each init =========================
// ======================================

const addToBitcoin = (value) => {
  return db.sequelize.query(`INSERT INTO coins (coinName, currentValue) VALUE ('Bitcoin', ${value})`)
    .then((response) => {
     })
    .catch((error) => {
      return console.error(error);
    })
};

const addToEthereum = (value) => {
  return db.sequelize.query(`INSERT INTO coins (coinName, currentValue) VALUE ('Ethereum', ${value})`)
    .then((response) => {
     })
    .catch((error) => {
      return console.error(error);
    })
};

const addToDash = (value) => {
  return db.sequelize.query(`INSERT INTO coins (coinName, currentValue) VALUE ('Dash', ${value})`)
    .then((response) => {
     })
    .catch((error) => {
      return console.error(error);
    })
};

const addToRipple = (value) => {
  return db.sequelize.query(`INSERT INTO coins (coinName, currentValue) VALUE ('Ripple', ${value})`)
    .then((response) => {
     })
    .catch((error) => {
      return console.error(error);
    })
};

const addToLitecoin = (value) => {
  return db.sequelize.query(`INSERT INTO coins (coinName, currentValue) VALUE ('Litecoin', ${value})`)
    .then((response) => {
     })
    .catch((error) => {
      return console.error(error);
    })
};





module.exports.addToBitcoin = addToBitcoin;
module.exports.addToEthereum = addToEthereum;
module.exports.addToDash = addToDash;
module.exports.addToRipple = addToRipple;
module.exports.addToLitecoin = addToLitecoin;
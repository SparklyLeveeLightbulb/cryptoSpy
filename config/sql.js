const sequelize = require('./database.js');


const addToBitcoin = (value) => {
  console.log('this is being hit its probably your sequelize require');
  return sequelize.query(`INSERT INTO coins (coinName, currentValue) VALUE ('Bitcoin', ${value})`)
    .then((response) => {
     })
    .catch((error) => {
      return console.error(error);
    })
};

const addToEthereum = (value) => {
  return sequelize.query(`INSERT INTO coins (coinName, currentValue) VALUE ('Ethereum', ${value})`)
    .then((response) => {
     })
    .catch((error) => {
      return console.error(error);
    })
};

const addToDash = (value) => {
  return sequelize.query(`INSERT INTO coins (coinName, currentValue) VALUE ('Dash', ${value})`)
    .then((response) => {
     })
    .catch((error) => {
      return console.error(error);
    })
};

const addToRipple = (value) => {
  console.log(typeof value, 'value in ripple');
  let temp = parseInt(value);
  let current = temp + 1;
  console.log(current, 'current in ripple')
  console.log(temp, 'temp in addToRipple')
  return sequelize.query(`INSERT INTO coins (coinName, currentValue) VALUE ('Ripple', ${value})`)
    .then((response) => {
     })
    .catch((error) => {
      return console.error(error);
    })
};

const addToLitecoin = (value) => {
  return sequelize.query(`INSERT INTO coins (coinName, currentValue) VALUE ('Litecoin', ${value})`)
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
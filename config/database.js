const mysql = require('mysql');
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  username: 'root',
  password: '',
  database: 'cryptoSpy',
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Agent = sequelize.define('agent', {
  id_agent: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  agentName: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  phoneNumber: { type: Sequelize.INTEGER}

});
const Coin = sequelize.define('coin', {
  id_coin: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  coinName: { type: Sequelize.STRING },
  currentValue: { type: Sequelize.INTEGER},
  lastValue: { type: Sequelize.INTEGER}

});

Agent.sync();
Coin.sync();
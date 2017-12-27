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
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  agentName: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  phoneNumber: { type: Sequelize.INTEGER}

});
const Coin = sequelize.define('coin', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  coinName: { type: Sequelize.STRING },
  currentValue: { type: Sequelize.INTEGER},
  lastValue: { type: Sequelize.INTEGER}

});

UserFollowing = sequelize.define('user_following', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  compareValue: Sequelize.INTEGER,
  amountOwned: Sequelize.INTEGER,
});
Agent.belongsToMany(Coin, { through: UserFollowing });
Coin.belongsToMany(Agent, { through: UserFollowing });
// through is required!


Agent.sync();
Coin.sync();
UserFollowing.sync();
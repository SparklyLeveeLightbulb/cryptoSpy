// app.use(express.static(__dirname + '/views'));
const path = require('path');
var sequelize = require('../config/database.js');

module.exports = function(app, passport, axios) {
  let user;
  
  //fake route to test out
  // app.get('/getProfile', (req, res) => {
  //   res.send([{ coinName: 'Bitcoin', currentValue: 14000, amountOwned: 10 }, { coinName: 'Ethereum', currentValue: 5000, amountOwned: 1 }, { coinName: 'Bitcoin', currentValue: 14000, amountOwned: 5 }])
  // })

  app.get('/news', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', '/news.html'))
  })

  // get from news api source
  app.get('/newsFromSource', (req, res) => {
    axios.get('', {
      params: {
        ID: 12345
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  })

  // ==================================================
  // RETRIEVES USER INFO FROM COIN_FOLLOW TABLE =======
  // ==================================================
  app.post('/getProfile', (req, res) => {
    let user = req.body.user;
    let userId;
    sequelize.query(`SELECT id FROM agents WHERE agentName = '${user}'`)
    .then((response) => {
      response[0].map(el => {
        if (typeof el.id === 'number') {
          userId = el.id;
        }
      })
      console.log(userId, 'this is userId')
        sequelize.query(`SELECT * FROM user_followings WHERE agentId = '${userId}'`)
        .then((response) => {
          res.send(response);
        })
        .catch((error) => {
          console.log(error);
        })
    })
    .catch((error) => {
      res.send(error);
    })
    
  });

  // ==================================================================
  // ADDS SPECIFIC COINS TO USER_FOLLOWINGS TABLE =====================
  // ==================================================================
  // BITCOIN
  app.post('/userCoinsBitcoin', (req, res) => {
    let user = req.body.user;
    let amount = req.body.amount;
    let userId;
    let coinId;
    sequelize.query(`SELECT id FROM agents WHERE agentName = '${user}'`)
    .then((response) => {
      response[0].map(el => {
        if (typeof el.id === 'number') {
          userId = el.id;
        }
      })
      console.log(userId, 'this is userId')
      sequelize.query(`SELECT id FROM coins WHERE coinName = 'Bitcoin'`)
      .then((response) => {
        response[0].map(el => {
          if (typeof el.id === 'number') {
            coinId = el.id
          }
        });
        console.log(userId, 'userId in .then from coinId')
        console.log(coinId, 'this is coinId');
          sequelize.query(`INSERT INTO user_followings (amountOwned, agentId, coinId) VALUES (${amount}, ${userId}, ${coinId})`)
          .then((response) => {
            console.log(response);
            res.send(response);
          })
          .catch((error) => {
            console.log(error)
            res.send(error);
          })
        });
      })
      // catch for original .then()
      .catch((error) => {
        res.send(error);
        });
      })
      // ETHEREUM
      app.post('/userCoinsEthereum', (req, res) => {
        let user = req.body.user;
        let amount = req.body.amount;
        let userId;
        let coinId;
        sequelize.query(`SELECT id FROM agents WHERE agentName = '${user}'`)
        .then((response) => {
          response[0].map(el => {
            if (typeof el.id === 'number') {
              userId = el.id;
            }
          })
          console.log(userId, 'this is userId')
          sequelize.query(`SELECT id FROM coins WHERE coinName = 'Ethereum'`)
          .then((response) => {
            response[0].map(el => {
              if (typeof el.id === 'number') {
                coinId = el.id
              }
            });
            console.log(userId, 'userId in .then from coinId')
            console.log(coinId, 'this is coinId');
              sequelize.query(`INSERT INTO user_followings (amountOwned, agentId, coinId) VALUES (${amount}, ${userId}, ${coinId})`)
              .then((response) => {
                console.log(response);
                res.send(response);
              })
              .catch((error) => {
                console.log(error)
                res.send(error);
              })
            });
          })
          // catch for original .then()
          .catch((error) => {
            res.send(error);
            });
          })
      // DASH
      app.post('/userCoinsDash', (req, res) => {
        let user = req.body.user;
        let amount = req.body.amount;
        let userId;
        let coinId;
        sequelize.query(`SELECT id FROM agents WHERE agentName = '${user}'`)
        .then((response) => {
          response[0].map(el => {
            if (typeof el.id === 'number') {
              userId = el.id;
            }
          })
          console.log(userId, 'this is userId')
          sequelize.query(`SELECT id FROM coins WHERE coinName = 'Dash'`)
          .then((response) => {
            response[0].map(el => {
              if (typeof el.id === 'number') {
                coinId = el.id
              }
            });
            console.log(userId, 'userId in .then from coinId')
            console.log(coinId, 'this is coinId');
              sequelize.query(`INSERT INTO user_followings (amountOwned, agentId, coinId) VALUES (${amount}, ${userId}, ${coinId})`)
              .then((response) => {
                console.log(response);
                res.send(response);
              })
              .catch((error) => {
                console.log(error)
                res.send(error);
              })
            });
          })
          // catch for original .then()
          .catch((error) => {
            res.send(error);
            });
          })
      // RIPPLE
      app.post('/userCoinsRipple', (req, res) => {
        let user = req.body.user;
        let amount = req.body.amount;
        let userId;
        let coinId;
        sequelize.query(`SELECT id FROM agents WHERE agentName = '${user}'`)
        .then((response) => {
          response[0].map(el => {
            if (typeof el.id === 'number') {
              userId = el.id;
            }
          })
          console.log(userId, 'this is userId')
          sequelize.query(`SELECT id FROM coins WHERE coinName = 'Ripple'`)
          .then((response) => {
            response[0].map(el => {
              if (typeof el.id === 'number') {
                coinId = el.id
              }
            });
            console.log(userId, 'userId in .then from coinId')
            console.log(coinId, 'this is coinId');
              sequelize.query(`INSERT INTO user_followings (amountOwned, agentId, coinId) VALUES (${amount}, ${userId}, ${coinId})`)
              .then((response) => {
                console.log(response);
                res.send(response);
              })
              .catch((error) => {
                console.log(error)
                res.send(error);
              })
            });
          })
          // catch for original .then()
          .catch((error) => {
            res.send(error);
            });
          })
      // LITECOIN
      app.post('/userCoinsLitecoin', (req, res) => {
        let user = req.body.user;
        let amount = req.body.amount;
        let userId;
        let coinId;
        sequelize.query(`SELECT id FROM agents WHERE agentName = '${user}'`)
        .then((response) => {
          response[0].map(el => {
            if (typeof el.id === 'number') {
              userId = el.id;
            }
          })
          console.log(userId, 'this is userId')
          sequelize.query(`SELECT id FROM coins WHERE coinName = 'Litecoin'`)
          .then((response) => {
            response[0].map(el => {
              if (typeof el.id === 'number') {
                coinId = el.id
              }
            });
            console.log(userId, 'userId in .then from coinId')
            console.log(coinId, 'this is coinId');
              sequelize.query(`INSERT INTO user_followings (amountOwned, agentId, coinId) VALUES (${amount}, ${userId}, ${coinId})`)
              .then((response) => {
                console.log(response);
                res.send(response);
              })
              .catch((error) => {
                console.log(error)
                res.send(error);
              })
            });
          })
          // catch for original .then()
          .catch((error) => {
            res.send(error);
            });
          })
// ============================================
// END COIN_FOLLOWINGS ROUTES =================
// ============================================


  app.get('/getAgentName', (req, res) => {
    res.send(user);
  })

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', '/login.html'));
  });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

      // render the page and pass in any flash data if it exists
      res.sendFile(path.join(__dirname, '../views', '/login.html'));
      // res.render('login', { message: req.flash('loginMessage') }); 
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect o the signup page if there is an error
    failureFlash : true // allows for flash messages
  }));

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {

      // render the page and pass in any flash data if it exists
    res.sendFile(path.join(__dirname, '../views', '/signup.html'));
      // res.render('signup', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.get('/success', function(req, res) {
    res.send('success')
  })

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    user = req.user.agentName
    console.log(user, 'hey')
    res.sendFile(path.join(__dirname, '../views', '/main.html'));
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


};

  // route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
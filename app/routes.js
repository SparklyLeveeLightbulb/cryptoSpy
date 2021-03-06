// app.use(express.static(__dirname + '/views'));
const path = require('path');
const axios = require('axios');
var db = require('../config/database.js');
var quick = require('../config/sql.js');

module.exports = function(app, passport, axios) {
  let user;
  
  //fake route to test out
  app.get('/getProfile', (req, res) => {
    res.send([{ coinName: 'Bitcoin', currentValue: 14000, amountOwned: 10 }, { coinName: 'Ethereum', currentValue: 5000, amountOwned: 1 }, { coinName: 'Bitcoin', currentValue: 14000, amountOwned: 5 }])
  })

  // =========================================================
  // News Page Route =========================================
  // =========================================================
  app.get('/news', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', '/news.html'))
  })


  // ==========================================================
  // This refreshes valuation of coins table ==================
  // Called on init ===========================================
  // ==========================================================
  app.get('/refreshTables', (request, response) => {
    axios.get('https://min-api.cryptocompare.com/data/pricemultifull', {
          params: {
            fsyms: 'BTC,ETH,DASH,LTC,XRP',
            tsyms: 'USD'
          }
        }).then(coins => {
      let data = coins.data.RAW
      // console.log(data.BTC.USD.PRICE.toString().split('.')[0], 'this is data.btc.usd.price')
          quick.addToBitcoin(data.BTC.USD.PRICE)
          .catch((error) => {
            console.error(error, 'error in bitcoin');
          });
          quick.addToEthereum(data.ETH.USD.PRICE)
          .catch((error) => {
            console.error(error, 'error in ethereum')
          });
          quick.addToRipple(data.XRP.USD.PRICE)
          .catch((error) => {
            console.error(error, 'error in ripple')
          });
          quick.addToDash(data.DASH.USD.PRICE)
          .catch((error) => {
            console.error(error, 'error in dash')
          });
          quick.addToLitecoin(data.LTC.USD.PRICE)
          .catch((error) => {
            console.error(error, 'error in litecoin')
          });
        })
      .catch(  (error) => {
      console.error(error, 'error in refreshTables')
    })
  });

  // ==================================================
  // RETRIEVES USER INFO FROM COIN_FOLLOW TABLE =======
  // Has to be post to send user info so DB can query =
  // ==================================================
  app.post('/getProfile', (req, res) => {
    let user = req.body.user;
    let userId;
    db.sequelize.query(`SELECT id FROM agents WHERE agentName = '${user}'`)
    .then((response) => {
      response[0].map(el => {
        if (typeof el.id === 'number') {
          userId = el.id;
        }
      })
        db.sequelize.query(`SELECT * FROM user_followings WHERE agentId = '${userId}'`)
        .then((response) => {
          res.send(response);
        })
        .catch((error) => {
          console.error(error);
          res.send(error);
        })
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    })
    
  });

  // ==================================================================
  // ADDS SPECIFIC COINS TO USER_FOLLOWINGS TABLE =====================
  // Hardcoded to specific 5 coins, but can be refactored =============
  // ==================================================================
  // BITCOIN
  app.post('/userCoinsBitcoin', (req, res) => {
    let user = req.body.user;
    let amount = req.body.amount;
    let userId;
    let coinId;
    let currentValue;
    db.sequelize.query(`SELECT id FROM agents WHERE agentName = '${user}'`)
    .then((response) => {
      response[0].map(el => {
        if (typeof el.id === 'number') {
          userId = el.id;
        }
      })
      db.sequelize.query(`SELECT id, currentValue FROM coins WHERE coinName = 'Bitcoin'`)
      .then((response) => {
        response[0].map(el => {
          if (typeof el.id === 'number') {
            coinId = el.id
            currentValue = el.currentValue;
          }
        });
          db.sequelize.query(`INSERT INTO user_followings (amountOwned, agentId, coinId, coinName, compareValue) VALUES (${amount}, ${userId}, ${coinId}, 'Bitcoin', ${currentValue})`)
          .then((response) => {
            res.send(response);
          })
          .catch((error) => {
            res.send(error);
          })
        });
      })
      // catch for bitcoin .then()
      .catch((error) => {
        console.error(error)
        res.send(error);
        });
      })
      // ETHEREUM
      app.post('/userCoinsEthereum', (req, res) => {
        let user = req.body.user;
        let amount = req.body.amount;
        let userId;
        let coinId;
        let currentValue;
        db.sequelize.query(`SELECT id FROM agents WHERE agentName = '${user}'`)
        .then((response) => {
          response[0].map(el => {
            if (typeof el.id === 'number') {
              userId = el.id;
            }
          })
          db.sequelize.query(`SELECT id, currentValue FROM coins WHERE coinName = 'Ethereum'`)
          .then((response) => {
            response[0].map(el => {
              if (typeof el.id === 'number') {
                coinId = el.id
                currentValue = el.currentValue;
              }
            });
              db.sequelize.query(`INSERT INTO user_followings (amountOwned, agentId, coinId, coinName, compareValue) VALUES (${amount}, ${userId}, ${coinId}, 'Ethereum', ${currentValue})`)
              .then((response) => {
                res.send(response);
              })
              .catch((error) => {
                console.error(error)
                res.send(error);
              })
            });
          })
          // catch for ethereum .then()
          .catch((error) => {
            console.error(error)
            res.send(error);
            });
          })
      // DASH
      app.post('/userCoinsDash', (req, res) => {
        let user = req.body.user;
        let amount = req.body.amount;
        let userId;
        let coinId;
        let currentValue;
        db.sequelize.query(`SELECT id FROM agents WHERE agentName = '${user}'`)
        .then((response) => {
          response[0].map(el => {
            if (typeof el.id === 'number') {
              userId = el.id;
            }
          })
          db.sequelize.query(`SELECT id, currentValue FROM coins WHERE coinName = 'Dash'`)
          .then((response) => {
            response[0].map(el => {
              if (typeof el.id === 'number') {
                coinId = el.id
                currentValue = el.currentValue;
              }
            });
              db.sequelize.query(`INSERT INTO user_followings (amountOwned, agentId, coinId, coinName, compareValue) VALUES (${amount}, ${userId}, ${coinId}, 'Dash', ${currentValue})`)
              .then((response) => {
                res.send(response);
              })
              .catch((error) => {
                console.error(error)
                res.send(error);
              })
            });
          })
          // catch for dash .then()
          .catch((error) => {
            console.error(error)
            res.send(error);
            });
          })
      // RIPPLE
      app.post('/userCoinsRipple', (req, res) => {
        let user = req.body.user;
        let amount = req.body.amount;
        let userId;
        let coinId;
        let currentValue;
        db.sequelize.query(`SELECT id FROM agents WHERE agentName = '${user}'`)
        .then((response) => {
          response[0].map(el => {
            if (typeof el.id === 'number') {
              userId = el.id;
            }
          })
          db.sequelize.query(`SELECT id, currentValue FROM coins WHERE coinName = 'Ripple'`)
          .then((response) => {
            response[0].map(el => {
              if (typeof el.id === 'number') {
                coinId = el.id;
                currentValue = el.currentValue;
              }
            });
              db.sequelize.query(`INSERT INTO user_followings (amountOwned, agentId, coinId, coinName, compareValue) VALUES (${amount}, ${userId}, ${coinId}, 'Ripple', ${currentValue})`)
              .then((response) => {
                res.send(response);
              })
              .catch((error) => {
                console.error(error)
                res.send(error);
              })
            });
          })
          // catch for ripple .then()
          .catch((error) => {
            console.error(error)
            res.send(error);
            });
          })
      // LITECOIN
      app.post('/userCoinsLitecoin', (req, res) => {
        let user = req.body.user;
        let amount = req.body.amount;
        let userId;
        let coinId;
        let currentValue;
        db.sequelize.query(`SELECT id FROM agents WHERE agentName = '${user}'`)
        .then((response) => {
          response[0].map(el => {
            if (typeof el.id === 'number') {
              userId = el.id;
            }
          })
          db.sequelize.query(`SELECT id, currentValue FROM coins WHERE coinName = 'Litecoin'`)
          .then((response) => {
            response[0].map(el => {
              if (typeof el.id === 'number') {
                coinId = el.id
                currentValue = el.currentValue;
              }
            });
              db.sequelize.query(`INSERT INTO user_followings (amountOwned, agentId, coinId, coinName, compareValue) VALUES (${amount}, ${userId}, ${coinId}, 'Litecoin', ${currentValue})`)
              .then((response) => {
                res.send(response);
              })
              .catch((error) => {
                console.error(error)
                res.send(error);
              })
            });
          })
          // catch for litecoin .then()
          .catch((error) => {
            console.error(error)
            res.send(error);
            });
          })
// ============================================
// END COIN_FOLLOWINGS ROUTES =================
// ============================================


// ============================================
// Required to send user to front end =========
// Ran into a weird scope issue - our only way to get around it
// ============================================
  app.get('/getAgentName', (req, res) => {
    res.send(user);
  })


  // ==========================================
  // Base Route ===============================
  // ==========================================
  app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname, '../views', '/login.html'));
  });

    // ======================================
    // Routes for Graphs ====================
    // ======================================
    app.get('/bitcoin', function(req, res) {
      res.sendFile(path.join(__dirname, '../views', '/bitcoin.html'));
    });

    app.get('/litecoin', function(req, res) {
      res.sendFile(path.join(__dirname, '../views', '/litecoin.html'));
    });

    app.get('/ethereum', function(req, res) {
      res.sendFile(path.join(__dirname, '../views', '/ethereum.html'));
    });

    app.get('/dash', function(req, res) {
      res.sendFile(path.join(__dirname, '../views', '/dash.html'));
    });

    app.get('/ripple', function(req, res) {
      res.sendFile(path.join(__dirname, '../views', '/ripple.html'));
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
      res.sendFile(path.join(__dirname, '../views', '/login.html'));
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
  // API CALLS ===========================
  // =====================================
  // Currency API is used elsewhere as well for on init valuation of the 5 coins we watch
   app.get('/getnews', (req, res) => {
        axios.get('https://newsapi.org/v2/everything', {
          params: {
            Q: 'cryptocurrency',
            sortBy: 'popularity',
            apiKey: '6849c31f48f74869a61c0c2aa68e4eb7'
          }
        }).then(news => {
          res.send(news.data.articles);
        }).catch(err => {
          console.error('this is a news api error ', err);
        });
      });
    
      app.get('/getcoins', (req, res) => {
        axios.get('https://min-api.cryptocompare.com/data/pricemultifull', {
          params: {
            fsyms: 'BTC,ETH,DASH,LTC,XRP',
            tsyms: 'USD'
          }
        }).then(coins => {
          res.json(coins.data.RAW);
        }).catch(err => {
          console.error('this is a coinlist api error ', err);
        });
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
};
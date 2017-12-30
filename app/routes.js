// app.use(express.static(__dirname + '/views'));
const path = require('path');
module.exports = function(app, passport) {
  
  //fake route to test out
  app.get('/getProfile', (req, res) => {
    res.send([{ coinName: 'Bitcoin', currentValue: 14000, amountOwned: 10 }, { coinName: 'Ethereum', currentValue: 5000, amountOwned: 1 }, { coinName: 'Bitcoin', currentValue: 14000, amountOwned: 5 }])
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
    res.sendFile(path.join(__dirname, '../views', '/main.html'));
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
// config/passport.js
				
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var mysql = require('mysql');

	const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  
	const validPassword = (password, localPassword) => {
    return bcrypt.compareSync(password, localPassword);
  };

var connection = mysql.createConnection({
				  host     : 'localhost',
				  user     : 'root',
				  password : ''
				});

        // MUST CHANGE TO OUR DATABASE NAME
connection.query('USE cryptoSpy');	

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		connection.query("select * from agents where id = "+id,function(err,rows){	
			  done(err, rows[0]);
		  });
    });
	

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with username
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

		// find a user whose username is the same as the forms username
		// we are checking to see if the user trying to login already exists
        connection.query("select * from agents where agentName = '"+username+"'",function(err,rows){
			console.log(rows);
			console.log("above row object");
			if (err)
                return done(err);
			 if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'That Agent Name is already taken.'));
            } else {

				// if there is no user with that username
                // create the user
                var newAgentMysql = new Object();
				
								newAgentMysql.agentName = username;
                newAgentMysql.password = generateHash(password); // use the generateHash function in our user model
			
				var insertQuery = "INSERT INTO agents ( agentName, password ) values ('" + username +"','"+ newAgentMysql.password +"')";
					console.log(insertQuery);
				connection.query(insertQuery,function(err,rows){
                    console.log(err);
                    console.log(rows);
				newAgentMysql.id = rows.insertId;
				
				return done(null, newAgentMysql);
				});	
            }	
		});
    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with username
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with username and password from our form

         connection.query("SELECT * FROM `agents` WHERE `agentName` = '" + username + "'",function(err,rows){
			if (err)
                return done(err);
			 if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'No Agent found.')); // req.flash is the way to set flashdata using connect-flash
						} 
			
			// if the user is found but the password is wrong
            if (!(validPassword(password, rows[0].password)))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
			
            // all is well, return successful user
            return done(null, rows[0]);			
		
		});
		


    }));
   
};
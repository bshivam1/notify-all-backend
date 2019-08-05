// app/routes.js
module.exports = function(app, passport) {

	require('./super_admin')(app,passport);
	require('./school_admin')(app,passport);
	// process the login form
	app.post('/login', passport.authenticate('local-login'),
        function(req, res) {
            console.log("hello*****************************",req.session,req.isAuthenticated);
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.status(200).json({

				});
    });
		//To Logout
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	app.get('/ping',function (req,res) {
		res.status(200).json({message:"success"});
})
};

// route middleware to make sure
// function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	// if (req.isAuthenticated())
	// 	return next();

	// if they aren't redirect them to the home page
// 	res.redirect('/');
// }

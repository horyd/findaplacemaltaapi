// Controllers
var placeRequestController = require('./controllers/placeRequest.js'),
	userController = require('./controllers/user.js');

// Export routes
module.exports = function (app, passport) {

	app.post('/placeRequest', placeRequestController.post);
	app.post('/users', userController.attachUserToPlaceRequest);

// requested route doesn't match any above
	app.get('*', function(req, res) {
		res.status(400).json({message: "The requested route is invalid or does not exist."});
	});

};
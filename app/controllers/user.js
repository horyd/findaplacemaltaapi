// Dependencies
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  PlaceRequest = mongoose.model('PlaceRequest'),
  errors = require('./errors/errors'),
  _ = require('lodash'),
  userController = {};


// Methods
userController.attachUserToPlaceRequest = function(req, res, next) {
  var user = new User( req.body ),
  placeRequestId = req.query.placeRequest;
  console.log(placeRequestId);
  if (!placeRequestId) return res.sendStatus(400);

  user.save(function(err, user) {
    if (err) return res.status(400).json(err);
    PlaceRequest.findById(placeRequestId, function (err, placeRequest) {
    	if (err) return res.status(400).json(err);
    	placeRequest._user = user.id;
    	placeRequest.save();
    	return res.status(201).json(user);
    })
  });
};

// Export
module.exports = userController;
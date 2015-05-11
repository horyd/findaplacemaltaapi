// Dependencies
var mongoose = require('mongoose'),
  PlaceRequest = mongoose.model('PlaceRequest'),
  errors = require('./errors/errors'),
  _ = require('lodash'),
  placeRequestController = {};


// Methods
placeRequestController.post = function(req, res, next) {
  var placeRequest = new PlaceRequest( req.body );
  
  placeRequest.save(function(err, placeRequest) {
    if (err) return res.status(400).json(err);
    return res.status(201).json(placeRequest);
  });               
};

// Export
module.exports = placeRequestController;
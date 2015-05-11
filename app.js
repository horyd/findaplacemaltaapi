// Dependencies
var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	config = require('./config/config'),
	app = express(),
  cors = require('cors')
	port = process.env.PORT || 3000;
 
app.use(cors());

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap the models
require('./app/models/PlaceRequest.js');
require('./app/models/User.js');

// Bootstrap the app
require('./config/express')(app);
require('./config/passport')(app, passport);
require('./app/routes')(app, passport);

// Start server
app.listen(port, function() {
  console.log('Express server listening on port %d', port);
});
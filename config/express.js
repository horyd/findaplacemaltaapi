// Dependencies
var bodyParser = require('body-parser'),
	expressSanitized = require('express-sanitized'),
	cors = require('cors');

// Export
module.exports = function (app) {
	app.use(cors());
  	app.use(bodyParser.json());
  	app.use(expressSanitized());
};
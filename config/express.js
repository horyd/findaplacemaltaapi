// Dependencies
var bodyParser = require('body-parser'),
	cors = require('cors');

// Export
module.exports = function (app) {
	app.use(cors());
  app.use(bodyParser.json());
};
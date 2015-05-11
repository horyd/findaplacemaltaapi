// Dependencies
var _ = require('lodash'),
	errors = {};

// Default error
errors.defaultError = {
				name: 'ControllerError',
				message: 'There was an error fulfilling your request.',
				status: 400
			};

// Custom errors
errors.quoteusedError = _.defaults({
				message: 'This quote has already been attached to a policy, please generate a new quote and then create a policy.'
			}, errors.defaultError);

// Export
module.exports = errors;
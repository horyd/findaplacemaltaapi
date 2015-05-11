// Dependencies
var _ = require('lodash'),
	errors = {};

// Default error
errors.defaultError = {
				name: 'AuthenticationError',
				message: 'There was an error authenticating your request.',
				status: 401
			};

// Custom errors
errors.usertokenError = _.defaults({
				message: 'The user_token provided does not have permission to access this resource.',
				status: 401
			}, errors.defaultError);

errors.userTokenExpired = _.defaults({
				message: 'The user_token provided has expired, please log back in.',
				status: 400
			}, errors.defaultError);

errors.apikeyError = _.defaults({
				message: 'The api_key provided does not have permission to access this resource.',
				status: 402
			}, errors.defaultError);

errors.deletedError = _.defaults({
				message: 'This resource has previously been deleted, the user_token provided does not have permission to access it.',
				status: 404
			}, errors.defaultError);

// Export
module.exports = errors;
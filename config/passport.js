// // Dependencies
// var admin_api_key = require('./passport/admin_api_key'),
// 	api_key = require('./passport/api_key'),
// 	admin_user_token = require('./passport/admin_user_token'),
// 	user_permission = require('./passport/user_permission'),
// 	email_password = require('./passport/email_password'),
// 	asset_permission = require('./passport/asset_permission'),
// 	policy_permission = require('./passport/policy_permission'),
// 	quote_permission = require('./passport/quote_permission'),
// 	claim_permission = require('./passport/claim_permission');
	
// Exports
module.exports = function (app, passport) {
	// passport.use('admin_api_key', admin_api_key);
	// passport.use('api_key', api_key);	
	// passport.use('admin_user_token', admin_user_token);
	// passport.use('user_permission', user_permission);
	// passport.use('email_password', email_password);
	// passport.use('asset_permission', asset_permission);
	// passport.use('policy_permission', policy_permission);
	// passport.use('quote_permission', quote_permission);
	// passport.use('claim_permission', claim_permission);
	app.use(passport.initialize());
};
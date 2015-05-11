// dependencies
var mandrill = require('mandrill-api/mandrill'),
	mandrill_client = new mandrill.Mandrill('85927rnHtPy795pS3z8W7A'),
	async = false,
	template_message = {
	    "text": "Message sent successfully.",
	    "subject": "Velvet Onion test dev email",
	    "from_email": "paul@velvetonion.com",
	    "from_name": "Velvet Onion Dev",
	    "to": [{
            "email": "veevers.paul@gmail.com",
            "type": "to"
	    }]
	},
	email_service = {};

// public methods
email_service.signup = function ( email ) {
	template_message.subject = "Sharecover - Signup Confirmation";
	template_message.text = "Thanks for signing up to the Sharecover testing version.";
	template_message.to[0].email = email;
	mandrill_client.messages.send({"message": template_message, "async": async}, function(result) {
		// record email sent in db
	    console.log(result);
	}, function(e) {
		// record error in db
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	});
};

email_service.policy = function ( email, tariff ) {
	template_message.subject = "Sharecover - Policy Purchase Confirmation";
	template_message.text = "Thank you for purchasing Sharecover. Your policy number is SHC12345678. Policy Details: Policy number: Start date: End date: Number of nights: Number of guests: Property address: Total cost: You can find more details and make changes on your policy by logging on to Your Account https://velvetonion-2.herokuapp.com/app.html#/account If you have any questions, please contact us https://velvetonion-2.herokuapp.com/contact.html";
	template_message.to[0].email = email;
	mandrill_client.messages.send({"message": template_message, "async": async}, function(result) {
		// record email sent in db
	    console.log(result);
	}, function(e) {
		// record error in db
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	});
};

email_service.forgot_password = function ( email, url, callback ) {
	template_message.to[0].email = email;
	template_message.text = "We have received a password change request for your Sharecover account. If you made this request, then please click on the link below. This link will work for 24 hours or until you reset your password. " + url;
	mandrill_client.messages.send({"message": template_message, "async": async}, function(result) {
		// record email sent in db
	    console.log(result);
	    callback(false);
	}, function(e) {
		// record error in db
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	    callback(e.message);
	});
};

email_service.contact = function ( name, email, subject, message ) {
	template_message.text = message + "    " + email + "    " + name;
	template_message.subject = name + ": " + subject;
	mandrill_client.messages.send({"message": template_message, "async": async}, function(result) {
		// record email sent in db
	    console.log(result);
	}, function(e) {
		// record error in db
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	});
};

// export public methods
module.exports = email_service;
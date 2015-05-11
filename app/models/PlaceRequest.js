// Dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('lodash');

// Schema
var PlaceRequestSchema = new Schema({
	_user: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' 
	},
	arrivalDate: {
		type: Date
	},
	departureDate: {
		type: Date
	},
	isCouple: {
		type: Boolean
	},
	isGreaterThanSixMonths: {
		type: Boolean
	},
	people: {
		type: Number
	},
	budget: {
		type: Number
	},
	locations: [{
		type: String
	}],
	createdDate: {
		type: Date,
		required: true,
		default: Date.now
	},
	updatedDate: {
		type: Date,
		required: true,
		default: Date.now
	},
	deleted: {
		type: Boolean,
		required: true,
		default: false
	}
});

// Pres, Methods, etc
PlaceRequestSchema.pre('save', function(next){
  this.updated_date = new Date();
  next();
});

// Export
module.exports = mongoose.model('PlaceRequest', PlaceRequestSchema);

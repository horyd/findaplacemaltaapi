// Dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash');

// Schema
var UserSchema = new Schema({
  fbId: {
    type: String,
    required: true,
    index: { 
      unique: true 
    }
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  age: {
    type: Number
  },
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
UserSchema.pre('save', function(next){
  this.updated_date = new Date();
  next();
});

// Export
module.exports = mongoose.model('User', UserSchema);

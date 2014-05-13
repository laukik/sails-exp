/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
 var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
  	username : {
  		type: 'string',
  		required : true
  	},
  	email:{
  		type: 'string',
  		email : true,
  		required : true
  	},
  	password:{
  		type: 'string',
  		required : true,
  		min : 6
  	}
  },
  beforeCreate: function(values, next) {
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return next(err);
      values.password = hash;
      next();
    });
 }

};

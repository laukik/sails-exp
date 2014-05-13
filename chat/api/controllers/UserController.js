/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


module.exports = {

	signup: function( req, res){
		res.view(
			'user/index',
			{
				user_err : false,
				email_err : false
			}
		);
	},



  /*
	*			This will create a new user
  */
  create: function(req, res){
  	var values = req.params.all();                // All input feilds
  	console.log( values);
  	User.find().where({ username : values.username}).done(function (err, user){           /* check username*/
  		if(err) res.view('404'); // error page if error occured
  		else if( !user.length ){
  			console.log("user avail");				 // if username available
  			User.find().where({ email : values.email}).done(function ( err, email){         /*  check email */
  				if(err) res.view('404'); // error occured
  				else if( !email.length){ // email available 
  					// removing unnecessary feilds
  					delete values._csrf;
  					delete values.createdAt;
  					delete values.updatedAt;				 
  					// Insert operation
  					User.create( values, function (err, new_user){
  						if(err) res.view('404');
  						else{
  							res.json(new_user);
  						}
  					});
  				}else{									 // email already taken
  					res.view(
  						'user/index',
  						{
  							user_err : false,
  							email_err : true
  						}
  					);
  				}
  			});
  		}else{ 
  			console.log(user);
  			console.log('user already exists');                  // if username already taken
  			res.view(
  				'user/index',
  				{
  					user_err : true,
  					email_err : false
  				}
  			);
  		}
  	});
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};

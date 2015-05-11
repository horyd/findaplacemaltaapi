
// /*!
//  * Module dependencies.
//  */

// var request = require('supertest'),
//   should = require('should'),
//   config = require('../config/config'),
//   mongoose = require('mongoose');
  
// var API_Consumer = require('../app/models/API_Consumer.js'),
// Quote = require('../app/models/Quote.js'), 
// User = require('../app/models/User.js'), 
// Asset = require('../app/models/Asset.js'), 
// Policy = require('../app/models/Policy.js'), 
// Claim = require('../app/models/Claim.js');

// var adminApiKey,
//   regularApiKey,
//   adminApiAdminUserToken,
//   regularApiAdminUserToken,
//   sampleRegularUserId,
//   sampleAdminMadeUserId,
//   sampleSignupUserToken,
//   sampleSignupUserId,
//   sampleAdminMadeAssetId,
//   sampleUnattachedAssetId,
//   sampleUnattachedQuoteId,
//   sampleAdminMadeQuoteId,
//   defaultAgent = request.agent('http://localhost:3000'),
//   baseHeaders = {'Accept': 'application/json'};

// // Connect to mongodb
// var connect = function () {
//   var options = { server: { socketOptions: { keepAlive: 1 } } };
//   mongoose.connect(config.db, options);
// };
// connect();
// // clear database when the connection is opened
// mongoose.connection.on('open', function(){
//   // mongoose.connection.db.dropDatabase(function(err){
//   //   console.log(err);
//   // });
// });
// mongoose.connection.on('error', console.log);
// mongoose.connection.on('disconnected', connect);
// // other stuff you want to include for tests

// before(function (done) {
//   // create the API admin user
//   API_Consumer.create({admin: true}, function (err, consumer) {
//     if (err) { return done(err); }
//     adminApiKey = consumer["api_key"];
//     var user = new User({user_role:'admin'})
//     user.refreshToken( adminApiKey, false );
//     user.save(function(err, user) {
//       if (err) {return done(err);}
//       adminApiAdminUserToken = user.user_token.token;

//       API_Consumer.create({admin: false}, function (err, consumer) {
//         if (err) { return done(err); }
//         regularApiKey = consumer["api_key"];
//         var user = new User({user_role:'admin'})
//         user.refreshToken( regularApiKey, false );
//         user.save(function(err, user) {
//           if (err) {return done(err);}
//           regularApiAdminUserToken = user.user_token.token;  
//           done();        
//         });
//       });
//     });
//   });
// });

// describe('Users', function () {
//   describe('POST /users', function () {
//     it('should create a user with an admin api key', function (done) {
//       defaultAgent
//       .post('/users')
//       .send({})
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(201,function (err, res) {
//         if (err) return done(err);
//         sampleAdminMadeUserId = res.body._id;
//         done()
//       })
//     });
//     it('should create a user with a regular api key', function (done) {
//       defaultAgent
//       .post('/users')
//       .send({})
//       .set(baseHeaders)
//       .query({"api_key": regularApiKey, "user_token": regularApiAdminUserToken})
//       .expect(201,function (err, res) {
//         if (err) return done(err);
//         sampleRegularUserId = res.body._id;
//         done()
//       })
//     });
//     it('should not create a user without an api key', function (done) {
//       defaultAgent
//       .post('/users')
//       .send({})
//       .set(baseHeaders)
//       .expect(401,function (err, res) {
//         if (err) return done(err);
//         done()
//       })
//     });
//   });
//   describe('LOGIN/OUT a user', function () {
//     var testEmail = 'prods' + Number(Math.random() * 100).toFixed(0).toString() + '@gmail.com'
//     it('should create a user using signup', function (done) {
//       defaultAgent
//       .post('/signup')
//       .query({"api_key": adminApiKey})
//       .send({email: testEmail, password: 'Foobar222222'})
//       .expect(201, function (err, res) {
//         if (err) return done(err);
//         sampleSignupUserToken = res.body.user_token.token;
//         sampleSignupUserId = res.body._id;
//         done();
//       })
//     });
//     it('should not create a user if the email already exists', function (done) {
//       defaultAgent
//       .post('/signup')
//       .query({"api_key": adminApiKey})
//       .send({email: testEmail, password: 'Doofar222222'})
//       .expect(400, done)
//     });
//     it('should not create a user without an email and password', function (done) {
//       defaultAgent
//       .post('/signup')
//       .query({"api_key": adminApiKey})
//       .send({})
//       .expect(400, done)
//     });
//     it('should log a user in', function (done) {
//       defaultAgent
//       .post('/login')
//       .query({"api_key": adminApiKey})
//       .send({email: testEmail, password: 'Foobar222222'})
//       .expect(200, done)
//     });
//     it('should not log a user in with bad credentials', function (done) {
//       defaultAgent
//       .post('/login')
//       .query({"api_key": adminApiKey})
//       .send({email: testEmail, password: 'badpassword'})
//       .expect(401, done)
//     });
//   });
//   describe('GET /users', function () {
//     it('should get a user using the (admin) api key used to create it', function (done) {
//       defaultAgent
//       .get('/users/' + sampleAdminMadeUserId)
//       .query({"api_key": adminApiKey, "user_token":adminApiAdminUserToken})
//       .set(baseHeaders)
//       .expect(200, done)
//     });
//     it('should get a user using the (regular) api key used to create it', function (done) {
//       defaultAgent
//       .get('/users/' + sampleRegularUserId)
//       .query({"api_key": regularApiKey, "user_token":regularApiAdminUserToken})
//       .set(baseHeaders)
//       .expect(200, done)
//     });
//     it('should get a user created with a regular API key by using an admin api key', function (done) {
//       defaultAgent
//       .get('/users/' + sampleRegularUserId)
//       .query({"api_key": adminApiKey, "user_token":adminApiAdminUserToken})
//       .set(baseHeaders)
//       .expect(200, done)
//     });
//     it('should get a user if the requested user is the requesting user', function (done) {
//       defaultAgent
//       .get('/users/' + sampleSignupUserId)
//       .query({"api_key": adminApiKey, "user_token":sampleSignupUserToken})
//       .set(baseHeaders)
//       .expect(200,done)
//     });
//     it('should not get a user using a different (regular) api key than was used to create it (admin)', function (done) {
//       defaultAgent
//       .get('/users/' + sampleAdminMadeUserId)
//       .query({"api_key": regularApiKey, "user_token":regularApiAdminUserToken})
//       .set(baseHeaders)
//       .expect(401, done)
//     });
//   });
//   describe('PUT /users', function () {
//     it('should update a single user property', function (done) {
//       defaultAgent
//       .put('/users/' + sampleAdminMadeUserId)
//       .query({"api_key": adminApiKey, "user_token":adminApiAdminUserToken})
//       .set(baseHeaders)
//       .send({name: {"name_first":"Jaryd","name_last":"Carolin"}})
//       .expect(200, function (err, res) {
//         if (err) {return done(err);}
//         User.findById(sampleAdminMadeUserId, function (err, user) {
//           if (err) {return done(err);}
//           if (!user) {return done(new Error('User was not found'))}
//           // check user token to make sure object wasn't overwritten
//           if (user.name.name_first == "Jaryd" && user.name.name_last == "Carolin" && user.user_token.token) {
//             return done();
//           } else {
//             return done(new Error('Values did not update'))
//           }
//         })
//       })
//     })
//     it('should prevent a user from updating their own password', function (done) {
//       defaultAgent
//       .put('/users/' + sampleSignupUserId)
//       .query({"api_key": adminApiKey, "user_token":sampleSignupUserToken})
//       .set(baseHeaders)
//       .send({"password":"wutwutwut"})
//       .expect(200, function (err, res) {
//         User.findById(sampleSignupUserId, function (err, user) {
//           if (err) {return done(err);}
//           if (user.password == "wutwutwut") {
//             return done(new Error('Password change was incorrectly permitted'))
//           } else {
//             return done()
//           }
//         })
//       })
//     })
//   })
//   describe('DELETE /user', function () {
//     it('should delete a user made with the same API key', function(done) {
//       defaultAgent
//       .delete('/users/' + sampleRegularUserId)
//       .query({"api_key": regularApiKey, "user_token":regularApiAdminUserToken})
//       .set(baseHeaders)
//       .expect(204, done)
//     })
//   })
// });

// describe('Assets', function () {
//   describe('POST /users/:user_id/assets', function () {
//     it('should create an asset for a given user', function (done) {
//       defaultAgent
//       .post('/users/' + sampleAdminMadeUserId + '/assets')
//       .send({
//         address: {
//           address_1: '680 George St',
//           address_suburb: 'Sydney',
//           address_state: 'NSW',
//           address_postcode: '2000'
//         },
//         year_built: '1989',
//         room_number: '5',
//         property_type: 'house'
//       })
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(201,function (err, res) {
//         if (err) return done(err);
//         sampleAdminMadeAssetId = res.body._id;
//         done();
//       })
//     })
//   });
//   describe('POST /assets', function () {
//     it('should create an asset without a user', function (done) {
//       defaultAgent
//       .post('/assets')
//       .send({
//         address: {
//           address_1: '680 George St',
//           address_suburb: 'Sydney',
//           address_state: 'NSW',
//           address_postcode: '2000'
//         },
//         year_built: '1989',
//         room_number: '5',
//         property_type: 'house'
//       })
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(201,function (err, res) {
//         if (err) return done(err);
//         sampleUnattachedAssetId = res.body._id;
//         done();
//       })
//     })
//   })
//   describe('GET /assets/:asset_id', function () {
//     it('should return an asset attached to a user', function (done) {
//       defaultAgent
//       .get('/assets/' + sampleAdminMadeAssetId)
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(200, function (err, res) {
//         if (err) return done(err);
//         if (res.body.room_number === '5') {
//           return done();
//         } else {
//           return done(new Error('Asset object was not what was expected'));
//         }
//       })
//     })
//     it('should return an unattached asset', function (done) {
//       defaultAgent
//       .get('/assets/' + sampleUnattachedAssetId)
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey})
//       .expect(200, function (err, res) {
//         if (err) return done(err);
//         if (res.body.room_number === '5') {
//           return done();
//         } else {
//           return done(new Error('Asset object was not what was expected'));
//         }
//       })
//     })
//     it('should not return an asset that is attached when no user_token is present', function (done) {
//       defaultAgent
//       .get('/assets/' + sampleAdminMadeAssetId)
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey})
//       .expect(401, done)
//     })
//   })
//   describe('PUT /assets/:asset_id', function () {
//     it('should change a single asset property', function (done) {
//       defaultAgent
//       .put('/assets/' + sampleAdminMadeAssetId)
//       .send({room_number: '6'})
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(200, function (err, res) {
//         if (err) {return done(err);}
//         Asset.findById(sampleAdminMadeAssetId, function (err, asset) {
//           if (err) {return done(err);}
//           if (asset.room_number !== '6') {return done(new Error('Asset room number did not update'))}
//           done();
//         })
//       })
//     })
//   })
//   describe('DELETE /assets/:asset_id', function () {
//     it('should delete an asset', function (done) {
//       defaultAgent
//       .delete('/assets/' + sampleAdminMadeAssetId)
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(204, function (err, res) {
//         if (err) return done(err);
//         Asset.findById(sampleAdminMadeAssetId, function (err, asset) {
//           if (err) {return done(err);}
//           if (!asset.deleted) {return done(new Error('Asset did not delete'))}
//           // flip it back to not being deleted
//           asset.deleted = false;
//           asset.save();
//           return done();
//         })
//       })
//     })
//   })
// })

// describe('Quotes', function () {
//   describe('POST /assets/:id/quotes', function () {
//     it('should create a quote for an asset with user', function (done) {
//       defaultAgent
//       .post('/assets/' + sampleAdminMadeAssetId + '/quotes')
//       .send({
//         "check_in": "2015-04-15T00:42:10.313Z",
//         "check_out": "2015-04-20T00:42:10.313Z",
//         "guest_number": 2,
//         "owner_present": "true",
//         "declined_insurance": "true",
//         "contents_cover": "50000",
//         "building_cover": "1000000",
//         "excess_amount": "500"
//       })
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(201,function (err, res) {
//         if (err) return done(err);
//         sampleAdminMadeQuoteId = res.body._id;
//         Quote.findById(res.body._id, function (err, quote){
//           if (err) return done(err);
//           if (quote._user == sampleAdminMadeUserId) {return done();}
//           return done(new Error('User id was not noted on quote'));
//         })
//       })
//     })
//     it('should create an quote for an unattached asset', function (done) {
//       defaultAgent
//       .post('/assets/' + sampleUnattachedAssetId + '/quotes')
//       .send({
//         "check_in": "2015-04-15T00:42:10.313Z",
//         "check_out": "2015-04-20T00:42:10.313Z",
//         "guest_number": 2,
//         "owner_present": "true",
//         "declined_insurance": "true",
//         "contents_cover": "50000",
//         "building_cover": "1000000",
//         "excess_amount": "500"
//       })
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey})
//       .expect(201,function (err, res) {
//         if (err) return done(err);
//         sampleUnattachedQuoteId = res.body._id;
//         Quote.findById(res.body._id, function (err, quote){
//           if (err) return done(err);
//           if (!quote._user) {return done();}
//           return done(new Error('User id was incorrectly noted on quote'));
//         })
//       })
//     })
//   })
//   describe('GET /quotes/:quote_id', function () {
//     it('should return a quote attached to a user', function (done) {
//       defaultAgent
//       .get('/quotes/' + sampleAdminMadeQuoteId)
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(200, done)
//     })
//     it('should return a unattached quote', function (done) {
//       defaultAgent
//       .get('/quotes/' + sampleUnattachedQuoteId)
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey})
//       .expect(200, done)
//     })
//     it('should not return a quote attached to user when no user_token is sent', function (done) {
//       defaultAgent
//       .get('/quotes/' + sampleAdminMadeQuoteId)
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey})
//       .expect(401, done)
//     })
//   })
  
//   describe('PUT /quotes/:quote_id/confirm', function () {
//     it('should confirm a quote into a policy', function (done) {
//       defaultAgent
//       .put('/quotes/' + sampleAdminMadeQuoteId + '/confirm')
//       .send({nonce:'fake-valid-nonce'})
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(200, function (err, res) {
//         if (err) return done(err);
//         Policy.findOne({_quote:sampleAdminMadeQuoteId}, function (err, policy) {
//           if (err) {return done(err);}
//           if (!policy) {return done(new Error('Policy constructed from quote not found'))}
//           sampleAdminMadePolicyId = policy.id;
//           done();
//         })
//       })
//     })
//   })
// })

// describe('Policies', function () {
//   describe('GET /policies/:policy_id', function () {
//     it('should return a policy', function (done) {
//       defaultAgent
//       .get('/policies/' + sampleAdminMadePolicyId)
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(200, done)
//     })
//   })
//   // describe('PUT /policies/:policy_id', function () {
//   //   it('should allow and extension to a policy', function (done) {
//   //     defaultAgent
//   //     .put('/policies/' + sampleAdminMadePolicyId)
//   //     .send({"check_out": "2015-04-22T00:42:10.313Z",})
//   //     .set(baseHeaders)
//   //     .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//   //     .expect(200, function (err, res) {
//   //       if (err) {return done(err);}
//   //       Policy.findById(sampleAdminMadePolicyId, function (err, policy) {
//   //         if (err) {return done(err);}
//   //         if (asset.room_number !== '6') {return done(new Error('Asset room number did not update'))}
//   //         done();
//   //       })
//   //     })
//   //   })
//   // })
//   describe('DELETE /policies/:policy_id', function () {
//     it('should delete a policy', function (done) {
//       defaultAgent
//       .delete('/policies/' + sampleAdminMadePolicyId)
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(204, function (err, res) {
//         if (err) return done(err);
//         Policy.findById(sampleAdminMadePolicyId, function (err, policy) {
//           if (err) {return done(err);}
//           if (!policy.deleted) {return done(new Error('Asset did not delete'))}
//           // flip it back to not being deleted
//           policy.deleted = false;
//           policy.save(function (err, policy) {
//             if(err) return done(err);
//             return done();
//           });          
//         })
//       })
//     })
//   })
// })

// describe('Claims', function () {
//   describe('POST /policies/:policy_id/claims', function () {
//     it('should create a new claim under a policy', function (done) {
//       defaultAgent
//       .post('/policies/' + sampleAdminMadePolicyId + '/claims')
//       .send({
//         "claim_amount": 5000,
//         "incident_date": "2015-04-15T00:42:10.313Z",
//         "incident_type": "Type",
//         "incident_description": "Description",
//         "hosting_platform":"AirBnB",
//         "witness_present": true,
//         "attachments": []
//       })
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(201, function (err, res) {
//         if (err) {return done(err)}
//         sampleAdminMadeClaimId = res.body._id;
//         done();
//       })
//     })
//   })
//   describe('GET /claims/:claim_id', function () {
//     it('should return a claim', function (done) {
//       defaultAgent
//       .get('/claims/' + sampleAdminMadeClaimId)
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(200, done)
//     })
//   })
//   describe('PUT /claims/:claim_id', function () {
//     it('should allow property changes on a claim', function (done) {
//       defaultAgent
//       .put('/claims/' + sampleAdminMadeClaimId)
//       .send({"witness_present": 'false'})
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(200, function (err, res) {
//         if (err) {return done(err);}
//         Claim.findById(sampleAdminMadeClaimId, function (err, claim) {
//           if (err) {return done(err);}
//           if (claim.witness_present !== 'false') {return done(new Error('Claim witness_present did not update'))}
//           done();
//         })
//       })
//     })
//   })
//   describe('DELETE /claims/claim_id', function () {
//     it('should delete a claim', function (done) {
//       defaultAgent
//       .delete('/claims/' + sampleAdminMadeClaimId)
//       .set(baseHeaders)
//       .query({"api_key": adminApiKey, "user_token": adminApiAdminUserToken})
//       .expect(204, function (err, res) {
//         if (err) return done(err);
//         Claim.findById(sampleAdminMadeClaimId, function (err, claim) {
//           if (err) {return done(err);}
//           if (!claim.deleted) {return done(new Error('Claim did not delete'))}
//           // flip it back to not being deleted
//           claim.deleted = false;
//           claim.save();
//           return done();
//         })
//       })
//     })
//   })
// })

// after(function (done) {
//   done()
// })

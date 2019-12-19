'use strict';

var utils = require('../utils/writer.js');
var jwt = require('jsonwebtoken');

const ObjectId = require('mongodb').ObjectId
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://paredros-db:27017'
const dbName = 'paredros'
const collName = 'users'


/**
 * login user
 * Username and password need to be send in trade of a JWT
 *
 * no response value expected for this operation
 **/
exports.authLoginPOST = function(email,hashedpassword) {
  return new Promise(function(resolve, reject) {
    console.log("trying to get user with email: " + email)
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      client
        .db(dbName)
        .collection(collName)
        .findOne({email: email, password: hashedpassword})

          .then(user => {
            console.log(`successfully retrieved user with name "${user.username}" and email "${user.email}" from db`)
            resolve(utils.respondWithCode(200,{token : user.token}))
          })

          .catch(error => reject(utils.respondWithCode(404,`user with email ${email} does not exist: ${error}`)))
          .finally(() => client.close())
    })
    .catch(err => reject(utils.respondWithCode(500,{"error":'could not connect to db: ' + err})))
  });
}


/**
 * register user
 * register user in paredros
 *
 * no response value expected for this operation
 **/
exports.authRegisterPOST = function(email,username,hashedpassword,salt) {
  return new Promise(function(resolve, reject) {
    var payload = {
      email: email,
      username: username,
      iss: "paredrosAPI"
    };
    var token = jwt.sign(payload , process.env.paredrosSecretKey);
    var user = {
      email: email,
      username: username,
      password: hashedpassword,
      token: token,
      salt: salt
    };
    console.log(`trying to store user with name "${username}" and email "${email}"`)
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(client => {
        client
          .db(dbName)
          .collection(collName)
  
          .insertOne(user)
  
            .then(id => {
              console.log(`successfully stored user with "${id} in db"`)
              resolve(utils.respondWithCode(201, {token : token}))
            })
  
            .catch(error => {
              console.log(error)
              reject(utils.respondWithCode(500,{'error':`unable to store user with name "${username}" and email "${email}" in db: ${error}`}))
            })
  
            .finally(() => client.close())
      })
    .catch(err => reject(utils.respondWithCode(500,{"error":'could not connect to db: ' + err})))
  });
}
 
/**
 * get user specific salt
 * get salt for hashing password
 *
 * no response value expected for this operation
 **/
exports.authSaltGET = function(email) {
  return new Promise(function(resolve, reject) {
    console.log("trying to get salt from user with email: " + email)
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      client
        .db(dbName)
        .collection(collName)
        .findOne({email: email})

          .then(user => {
            console.log(`successfully retrieved salt from user with name "${user.username} " and email "${user.email}" from db`)
            resolve(utils.respondWithCode(200,{salt : user.salt}))
          })

          .catch(error => reject(utils.respondWithCode(404,{"error":"user with email"+ email + "does not exist"})))
          .finally(() => client.close())
    })
    .catch(err => reject(utils.respondWithCode(500,{"error":"could not connect to db"})))
  });
}


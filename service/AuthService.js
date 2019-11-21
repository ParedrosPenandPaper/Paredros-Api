'use strict';

var jwt = require('jsonwebtoken');

/**
 * login user
 * Username and password need to be send in trade of a JWT
 *
 * no response value expected for this operation
 **/
exports.authLoginPOST = function() {
  return new Promise(function(resolve, reject) {
    //abfrage an die Datenbank
    resolve();
  });
}


/**
 * register user
 * register user in paredros
 *
 * no response value expected for this operation
 **/
exports.authRegisterPOST = function(credentials) {
  return new Promise(function(resolve, reject) {
    var token = jwt.sign({ payload }, 'secret');
    resolve();
  });
}


/**
 * get user specific salt
 * get salt for hashing password
 *
 * no response value expected for this operation
 **/
exports.authSaltGET = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


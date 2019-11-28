'use strict';

var utils = require('../utils/writer.js');
var Auth = require('../service/AuthService');

module.exports.authLoginPOST = function authLoginPOST (req, res, next) {
  var hashedpassword = req.swagger.params['hashedpassword'].value;
  var email = req.swagger.params['email'].value;
  Auth.authLoginPOST(email,hashedpassword)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authRegisterPOST = function authRegisterPOST (req, res, next) {
  var username = req.swagger.params['username'].value;
  var hashedpassword = req.swagger.params['hashedpassword'].value;
  var email = req.swagger.params['email'].value;
  var salt = req.swagger.params['salt'].value;
  Auth.authRegisterPOST(email,username,hashedpassword,salt)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authSaltGET = function authSaltGET (req, res, next) {
  Auth.authSaltGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

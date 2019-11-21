'use strict';

var utils = require('../utils/writer.js');
var Auth = require('../service/AuthService');

module.exports.authLoginPOST = function authLoginPOST (req, res, next) {
  var api_key = req.swagger.params['api_key'].value;
  Auth.authLoginPOST(api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authRegisterPOST = function authRegisterPOST (req, res, next) {
  var api_key = req.swagger.params['api_key'].value;
  Auth.authRegisterPOST(api_key)
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

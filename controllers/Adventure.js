'use strict';

var utils = require('../utils/writer.js');
var Adventure = require('../service/AdventureService');

module.exports.adventuresAdventureIdDELETE = function adventuresAdventureIdDELETE (req, res, next) {
  var adventureId = req.swagger.params['adventureId'].value;
  Adventure.adventuresAdventureIdDELETE(adventureId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adventuresAdventureIdGET = function adventuresAdventureIdGET (req, res, next) {
  var adventureId = req.swagger.params['adventureId'].value;
  Adventure.adventuresAdventureIdGET(adventureId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adventuresAdventureIdPATCH = function adventuresAdventureIdPATCH (req, res, next) {
  var adventureId = req.swagger.params['adventureId'].value;
  var body = req.swagger.params['body'].value;
  Adventure.adventuresAdventureIdPATCH(adventureId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adventuresDELETE = function adventuresDELETE (req, res, next) {
  Adventure.adventuresDELETE()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adventuresGET = function adventuresGET (req, res, next) {
  Adventure.adventuresGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adventuresPOST = function adventuresPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Adventure.adventuresPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
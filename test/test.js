"use strict"
/* eslint-disable */

const now = new Date()
console.log(Date() + ': the testing for the paredros api has not been implemented yet and hence will pass')

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../index.js'); // Our app

describe('API endpoint /api/adventures', function() {
  this.timeout(250000); // How long to wait for a response (ms)

  // GET ALL Adverntures that fails because of a bad token
  it('Get All Adventures', function() {
    return chai.request(app)
      .get('/api/adventures')
      .set('token', 'thisIsNotASeriousToken')
      .then(function(res) {
        expect(res).to.have.status(401);
      });
  });

});
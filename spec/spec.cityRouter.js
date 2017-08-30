/* eslint-env node, mocha */
'use strict';
process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest');

let correctCityData = {
    'results': {
        'CR9': 2,
        'CR0': 8
    }
};

let incorrectCityData = {
  'results': {
      'CR9': 22222222,
      'CR0': 897868
  }
};

describe('/clinics/city/:name', function (done) {
  it('returns a status code of 200 and provides a JSON response with a results object that contains all of the partial_postcodes found and how many of them where found', (done) => {
    request(app)
    .get('/clinics/city/:name')
    .expect(200)
    .expect((res) => {
      expect(res.body.status).to.eql(correctCityData);
    });
    done();
  });
});

describe('/clinics/city/:name', function (done) {
  it('throws and error when incorrect data is servered', (done) => {
    request(app)
    .get('/clinics/city/:name')
    .expect(404)
    .expect((res) => {
      expect(res.body.status).to.eql(incorrectCityData);
    });
    done();
  });
});

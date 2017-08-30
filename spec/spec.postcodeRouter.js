/* eslint-env node, mocha */
'use strict';
const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest');

let correctPostcodeData = [
  {
    "organisation_id": "58961",
    "name": "Edridge Road Community Health Centre"
  },
  {
    "organisation_id": "77668",
    "name": "Edridge Road Walk-In Centre"
  }
];

let incorrectPostcodeData = [
  {
    "organisation_id": "588592",
    "name": "Muggeridge Road Community Wealth Centre"
  },
  {
    "organisation_id": "8AAAD(Gjn)",
    "name": "Edridge Road Walk-In Centre"
  }
];

describe('/clinics/postcode/CR91PJ', function (done) {
  it('returns a status code of 200 and provides a JSON response with results that match the full postcode only', (done) => {
    request(app)
    .get('/clinics/postcode/CR91PJ')
    .expect(200)
    .expect((res) => {
      expect(res.body.status).to.eql(correctPostcodeData);
    });
    done();
  });
});

describe('/clinics/postcode/CR91PJ', function (done) {
  it('throws and error when incorrect data is servered', (done) => {
    request(app)
    .get('/clinics/postcode/CR91PJ')
    .expect(404)
    .expect((res) => {
      expect(res.body.status).to.eql(incorrectPostcodeData);
    });
    done();
  });
});

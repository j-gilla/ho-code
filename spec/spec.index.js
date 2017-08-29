/* eslint-env node, mocha */
process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest');

let correct = [
  {
    "organisation_id": "58961",
    "name": "Edridge Road Community Health Centre"
  },
  {
    "organisation_id": "77668",
    "name": "Edridge Road Walk-In Centre"
  }
];

let incorrect = [
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
  it('returns a status code of 200 and provide a JSON response with results that match the full postcode only', (done) =>{
    request(app)
    .get('/clinics/postcode/CR91PJ')
    .expect(200)
    .expect((response) => {
      expect(res.body.status).to.eql(correct);
    });
    done();
  })
});

describe('/clinics/postcode/CR9 1PJ', function (done) {
  it('throws an error when incorrect data is servered', (done) =>{
    request(app)
    .get('/clinics/postcode/CR91PJ')
    .expect(404)
    .expect((response) => {
      expect(res.body.status).to.eql(incorrect);
    });
    done();
  })
});

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

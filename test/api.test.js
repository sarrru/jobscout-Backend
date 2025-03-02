import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../index.js';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('Simple API Test', function () {
    it('should return a 200 response from home route', async function () {
        const res = await request(app).get('/');
        expect(res).to.have.status(200);
    });

    it('should return JSON response from API', async function () {
        const res = await request(app).get('/api/v1/user'); // Change route as needed
        expect(res).to.be.json;
    });
});

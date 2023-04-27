const request = require('supertest');
const app = require('../app');
const { cookie } = require('./data.json');

jest.setTimeout(30000);

describe('GET /view', () => {
  it('should respond with a 200 status code', async () => {
    const res = await request(app)
      .get('/api/feedback/view')
      .set('Cookie', cookie);
    expect(res.statusCode).toEqual(200);
    expect(res.body).not.toBeNull();
  });
});

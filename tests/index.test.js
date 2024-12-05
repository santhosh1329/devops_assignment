const request = require('supertest');
const app = require('../index');

describe('API Endpoints', () => {

   it('should return the user for GET /:id', async () => {
      const response = await request(app).get('/1'); // Assuming user1 exists
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.text)).toHaveProperty('id', 1);
   });

   it('should add a new user for POST /', async () => {
      const newUser = { id: 4, name: "New User", email: "newuser@example.com" };
      const response = await request(app).post('/').send({ user4: newUser });
      expect(response.statusCode).toBe(200);
      const users = JSON.parse(response.text);
      expect(users).toHaveProperty("user4");
      expect(users["user4"]).toEqual(newUser);
   });

});
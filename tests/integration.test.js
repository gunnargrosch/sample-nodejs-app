const request = require('supertest');
const app = require('../src/index');

describe('Integration Tests', () => {
  describe('User workflow', () => {
    it('should handle complete user creation workflow', async () => {
      // First, get initial users
      const initialUsers = await request(app)
        .get('/api/users')
        .expect(200);
      
      expect(Array.isArray(initialUsers.body)).toBe(true);
      
      // Create a new user
      const newUserData = {
        name: 'Integration Test User',
        email: 'integration@example.com'
      };
      
      const createResponse = await request(app)
        .post('/api/users')
        .send(newUserData)
        .expect(201);
      
      expect(createResponse.body).toHaveProperty('id');
      expect(createResponse.body.name).toBe(newUserData.name);
      expect(createResponse.body.email).toBe(newUserData.email);
    });
  });

  describe('API health and availability', () => {
    it('should have all endpoints responding correctly', async () => {
      // Test root endpoint
      await request(app).get('/').expect(200);
      
      // Test health endpoint
      await request(app).get('/health').expect(200);
      
      // Test users endpoint
      await request(app).get('/api/users').expect(200);
    });
  });

  describe('Security headers', () => {
    it('should include security headers', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      // Check for helmet security headers
      expect(response.headers).toHaveProperty('x-content-type-options');
      expect(response.headers).toHaveProperty('x-frame-options');
    });
  });
});

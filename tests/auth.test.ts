import request from "supertest";
import { app } from "../src/app";

describe('Auth Routes', () => {
  const testUser = {
    name: 'robson',
    email: 'robson@admin.com',
    password: 'admin',
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', testUser.email);
  }, 10000);

  it('should not register an existing user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send(testUser);

    expect(res.statusCode).toBe(400); 
  });

  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toBe(200); 
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword',
      });

    expect(res.statusCode).toBe(401); 
  });
});
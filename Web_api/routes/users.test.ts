import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router } from '../routes/users';
import request from 'supertest';
const app: Koa = new Koa();
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());
app.listen(3000);


describe( 'a simple api endpoint', () => {
  
  test('Get all users', async () => {
    const result = await request(app.callback()).get('/api/v1/users')
    expect(result.statusCode).toEqual(401)
  },10000)
  
  test('Post an users', async () => {
    const result = await request(app.callback()).post('/api/v1/users')
        .set("Authorization", "Basic Ym9iOjY1NDMyMQ==")
        .send({
          "username": "It's Supertest",
          "password": "123xxx123",
          "email": "example@example.com"});         
    expect(result.statusCode).toEqual(201);
  },10000)
  })
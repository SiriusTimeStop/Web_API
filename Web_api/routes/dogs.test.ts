import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router } from '../routes/dogs';
import request from 'supertest';
const app: Koa = new Koa();
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());
app.listen(4000);


describe( 'a simple api endpoint', () => {
  
  test('Get all dog', async () => {
    const result = await request(app.callback()).get('/api/v1/dogs')
    expect(result.statusCode).toEqual(200)
  },10000)
  
  test('Post an dog', async () => {
    const result = await request(app.callback()).post('/api/v1/dogs')
        .set("Authorization", "Basic Ym9iOjY1NDMyMQ==")
        .send({
          "dogname": "It's Supertest",
          "maintext": "Learning testing stuff ",
          "staffid": 5});         
    expect(result.statusCode).toEqual(401);
  },10000)
  })
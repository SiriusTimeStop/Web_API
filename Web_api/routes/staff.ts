import { basicAuth } from '../controllers/auth';
import { validateUser } from "../controllers/validation";
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import * as model from '../models/staff';

const prefix = '/api/v1/staff';
const router:Router = new Router({ prefix: prefix });

const getAll = async(ctx: any, next: any) =>{  
 
    let users = await model.getAll(20, 1);
    if (users.length) {
      ctx.body = users;
    }
      else {
        ctx.body = {};
      }
      await next();
  
  }


  const getById = async(ctx: any, next: any) =>{
  let id = ctx.params.id;
  let user = await model.getByUserId(id);
  if (user.length) {
    ctx.body = user[0];
  }
}



router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);


export {router};
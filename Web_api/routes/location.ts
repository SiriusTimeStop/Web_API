import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/location";



interface Post {
  id: number,
  locationsdistrict: string
}
const router:Router = new Router({prefix: '/api/v1/locations'});

const getAll = async (ctx: RouterContext, next: any) => {
  //ctx.body = articles;
const {limit=100, page=1,  order="dateCreated", direction='ASC'} = ctx.request.query;
  const parsedLimit = parseInt(limit as string, 10);
  const parsedPage = parseInt(page as string, 10);
  const result = await model.getAll(20, 1, order, direction);
   if (result.length) {
     const body: Post[] = result.map((post: any) => {
       const { id = 0, locationsdistrict = ""}: Partial<Post> = post;
       return { id, locationsdistrict}; // Utilizing the destructured elements
     });
  ctx.body = body;
  
  await next();
      
   }
}

const getById = async (ctx: RouterContext, next: any) => {
    let id = +ctx.params.id;
   
    let location = await model.getById(id);
    if(location.length) {
      ctx.body = location[0];
       ctx.status=200;
    } else {
      ctx.status = 404;
    }
    await next();
  }


router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);
export { router };
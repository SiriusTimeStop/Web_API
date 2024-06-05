import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/dogs";
import * as likes from "../models/likes";
import * as favs from "../models/favs";
import * as msgs from "../models/msgs";
import { validateDog } from "../controllers/validation";
import { basicAuth } from "../controllers/auth";

interface Post {
  id: number,
  dogname: string,
  maintext:string,
  summary: string,
  imageurl: string,
  locationid: string,
  staffid: number,
  description:string,
  links: {
    likes: string,
    fav: string,
    msg: string,
    self: string
  }
}
const router:Router = new Router({prefix: '/api/v1/dogs'});

const getAll = async (ctx: RouterContext, next: any) => {
  //ctx.body = dogs;
const {limit=100, page=1,  order="dateCreated", direction='ASC'} = ctx.request.query;
  const parsedLimit = parseInt(limit as string, 10);
  const parsedPage = parseInt(page as string, 10);
  const result = await model.getAll(20, 1, order, direction);
   if (result.length) {
     const body: Post[] = result.map((post: any) => {
       const { id = 0, dogname = "",  maintext= "",summary = "", imageurl = "",locationid = "", staffid = 0,description= "" }: Partial<Post> = post;
       const links = {
         likes: `http://${ctx.host}/api/v1/dogs/${post.id}/likes`,
         fav: `http://${ctx.host}/api/v1/dogs/${post.id}/fav`,
         msg: `http://${ctx.host}/api/v1/dogs/${post.id}/msg`,
         self: `http://${ctx.host}/api/v1/dogs/${post.id}`
       };
       return { id, dogname,   maintext,summary, imageurl,locationid, staffid, description, links }; // Utilizing the destructured elements
     });
  ctx.body = body;
  
  await next();
      
   }
}

const doSearchDog = async(ctx: any, next: any) =>{
  
  let { limit = 100, page = 1, fields = "", q = "" , order="datecreated", direction='ASC'} = ctx.request.query;
  // ensure params are integers
  limit = parseInt(limit);
  page = parseInt(page);
  // validate values to ensure they are sensible
  limit = limit > 200 ? 200 : limit;
  limit = limit < 1 ? 10 : limit;
  page = page < 1 ? 1 : page;
  let result:any;
  // search by single field and field contents
  // need to validate q input
  try{
      if (q !== "") 
        result = await model.getSearch(fields, q);     
      else
      {console.log('get all')
        result = await model.getAll(limit, page,order, direction);
       console.log(result)
      }
        
      if (result.length) {
        if (fields !== "") {
          // first ensure the fields are contained in an array
          // need this since a single field in the query is passed as a string
          console.log('fields'+fields)
          if (!Array.isArray(fields)) {
            fields = [fields];
          }
          // then filter each row in the array of results
          // by only including the specified fields
          result = result.map((record: any) => {
            let partial: any = {};
            for (let field of fields) {
              partial[field] = record[field];
            }
            return partial;
          });
        }
        console.log(result)
        ctx.body = result;
      }
    }
      catch(error) {
        return error
      }
     await next();
    }


const createDog = async (ctx: RouterContext, next: any) => {

  const body = ctx.request.body;
  let result = await model.add(body);
  if(result.status==201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = {err: "insert data failed"};
  }
  await next();
}

const getById = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
 
  let dog = await model.getById(id);
  if(dog.length) {
    ctx.body = dog[0];
     ctx.status=200;
  } else {
    ctx.status = 404;
  }
  await next();
}

const updateDog = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;

  let c: any = ctx.request.body;

  let result = await model.update(c,id)
  if (result) {
    ctx.status = 201
    ctx.body = `Dog with id ${id} updated` 
  } 
  await next();
}

const deleteDog = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;

let dog:any = await model.deleteById(id)
  ctx.status=201
  ctx.body = dog.affectedRows ? {message: "removed"} : {message: "error"};
  await next();
}


// methods for like icon
async function likesCount(ctx: RouterContext, next: any) {
  // For you TODO: add error handling and error response code
  const id = ctx.params.id;
  const result = await likes.count(id);
  ctx.body = result ? result : 0;
  await next();
}

async function likePost(ctx: RouterContext, next: any) {
  // For you TODO: add error handling and error response code
  const user = ctx.state.user;
  const uid:number =user.user.id;
  const id = parseInt(ctx.params.id);
  const result:any = await likes.like(id, uid);
  ctx.body = result.affectedRows ? {message: "liked",userid:result.userid} : {message: "error"};
  await next();
}

async function dislikePost(ctx: RouterContext, next: any) {
  // For you TODO: add error handling and error response code
  const user = ctx.state.user;
  const uid:number =user.user.id;
  const id = parseInt(ctx.params.id);
  const result:any = await likes.dislike(id, uid);
  ctx.body = result.affectedRows ? {message: "disliked"} : {message: "error"};
  await next();
}

//mehtods for Heart(Favorite) icon
async function userFav(ctx: RouterContext, next: any) {
  // For you TODO: add error handling and error response code
  const user = ctx.state.user;
  const uid:number =user.user.id;
  const result = await favs.listFav(uid);
  ctx.body = result ? result : 0;
  await next();
}

async function postFav(ctx: RouterContext, next: any) {
  // For you TODO: add error handling and error response code
  const user = ctx.state.user;
  const uid:number =user.user.id;
  const id = parseInt(ctx.params.id);
  const result:any = await favs.addFav(id, uid);
  ctx.body = result.affectedRows ? {message: "added",userid:result.userid} : {message: "error"};
  await next();
}

async function rmFav(ctx: RouterContext, next: any) {
  // For you TODO: add error handling and error response code
  const user = ctx.state.user;
  const uid:number =user.user.id;
  const id = parseInt(ctx.params.id);
  const result:any = await favs.removeFav(id, uid);
  ctx.body = result.affectedRows ? {message: "removed"} : {message: "error"};
  await next();
}

//methods for message icon
async function listMsg(ctx: RouterContext, next: any){
   const id = parseInt(ctx.params.id);
   const result = await msgs.getMsg(id);
  ctx.body = result ? result : 0;
  await next();
}

async function addMsg(ctx: RouterContext, next: any){
  const id = parseInt(ctx.params.id);
  const user = ctx.state.user;
  const uid:number =user.user.id;
  const uname = user.user.username;
  let msg:any = ctx.request.body;
  console.log('ctx.request.body ',ctx.request.body)
  console.log('..msg ',msg)
  const result:any= await msgs.add_Msg(id, uid,uname, msg);
  ctx.body = result.affectedRows ? {message: "added"} : {message: "error"};
  await next();
}

async function rmMsg(ctx: RouterContext, next: any){
  // const uid = ctx.state.user.id;
// only admin can del article comment
 let b:any = ctx.request.body;
 
 const id = parseInt(ctx.params.id); 
  const result:any = await msgs.removeMsg(id, b);
  ctx.body = result.affectedRows ? {message: "removed"} : {message: "error"}; 
  await next();
}

router.get('/', getAll);
router.get('/search', doSearchDog);
router.post('/', basicAuth, bodyParser(), validateDog, createDog);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(),validateDog, updateDog);
router.delete('/:id([0-9]{1,})', basicAuth, deleteDog);
router.get('/:id([0-9]{1,})/likes', likesCount);
router.post('/:id([0-9]{1,})/likes', basicAuth, likePost);
router.del('/:id([0-9]{1,})/likes', basicAuth, dislikePost);

router.get('/fav', basicAuth, userFav);
router.post('/:id([0-9]{1,})/fav', basicAuth, postFav);
router.del('/:id([0-9]{1,})/fav', basicAuth, rmFav);

router.get('/:id([0-9]{1,})/msg', listMsg);
router.post('/:id([0-9]{1,})/msg', bodyParser(), basicAuth, addMsg);
router.del('/:id([0-9]{1,})/msg', basicAuth, bodyParser(),rmMsg);
export { router };

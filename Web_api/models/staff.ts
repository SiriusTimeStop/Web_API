import * as db from '../helpers/database';

export const getAll = async  (limit=10, page=1) =>{
  const offset = (page - 1) * limit;
  const query = "SELECT * FROM registerusers LIMIT  ? OFFSET  ?;";
  const data = await db.run_query(query, [limit, offset]);
  return data;
}


export const getByUserId = async  (id:number) =>{
  let query = "SELECT * FROM registerusers WHERE id = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

  
import * as db from '../helpers/database';
 

export const getById = async (id: any) => {
  let query = 'SELECT * FROM locations WHERE id = ?';
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
}

export const getAll = async  (limit=10, page=1, order:any, direction:any) =>{
  const offset = (page - 1) * limit;
  const query = "SELECT * FROM locations LIMIT  ? OFFSET  ?;";
  const data = await db.run_query(query, [limit, offset]);
  return data;
}


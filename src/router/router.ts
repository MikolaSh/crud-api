import { IncomingMessage, ServerResponse } from "http";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controller/controller";

export const handleRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  if(method === 'GET' && url === '/api/users') {

    return getAllUsers(res);
  }
  
  if(method === 'GET' && req.url?.startsWith('/api/users')) {
    return getUserById(req, res);
  }
  if(method === 'PUT' && req.url?.startsWith('/api/users')) {
    return updateUser(req, res);
  }
  
  if(method === 'POST' && url === '/api/users') {

    return createUser(req, res);
  }

  if(method === 'DELETE' && req.url?.startsWith('/api/users')) {
    return deleteUser(req, res);
  }
}
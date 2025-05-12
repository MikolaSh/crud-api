import { IncomingMessage, ServerResponse } from "http";
import { deleteUser, getAllUsers, getUserById } from "../controller/controller";

export const handleRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  if(method === 'GET' && url === '/api/users') {
    console.log('dsadsa')
    return getAllUsers(res);
  }
  
  if(method === 'GET' && req.url?.startsWith('/api/users')) {
    return getUserById(req, res);
  }
  
  if(method === 'DELETE' && req.url?.startsWith('/api/users')) {
    return deleteUser(req, res);
  }
}
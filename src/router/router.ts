import { IncomingMessage, ServerResponse } from "http";
import { getAllUsers, getUserById } from "../controller/controller";

export const handleRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  if(method === 'GET' && url === '/api/users') {
    return getAllUsers(res);
  }
  
  if(method === 'GET' && req.url?.startsWith('/api/users')) {
    return getUserById(req, res);
  }
}
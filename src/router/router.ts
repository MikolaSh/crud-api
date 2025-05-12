import { IncomingMessage, ServerResponse } from "http";
import { getAllUsers } from "../controller/controller";

export const handleRoutes = (request: IncomingMessage, res: ServerResponse) => {
  const { method, url } = request;

  if(method === 'GET' && url === '/api/users') {
    return getAllUsers(res);
  }
}
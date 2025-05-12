import {createServer, IncomingMessage, ServerResponse} from "http";
import { handleRoutes } from "../router/router";

export const app = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url?.startsWith('/api/users')) {
      return handleRoutes(req, res);
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Endpoint not found' }));
  }
);

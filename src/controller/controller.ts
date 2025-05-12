import { IncomingMessage, ServerResponse } from "http";
import userService from "../service/service";
import { isValidId, sendResponse } from "../utils";

export const getAllUsers = (res: ServerResponse) => {
  const users = userService.getAllusers();
  sendResponse(res, 200, users);
}

export const getUserById = (req: IncomingMessage, res: ServerResponse) => {
  const id = req.url?.split('/')[3] || '';

  if(!isValidId(id)) {
    return sendResponse(res, 404, { message: 'User not found' })
  }
  
  const user = userService.getUserById(id);

  if(!user) {
    return sendResponse(res, 404, { message: 'User not found' })
  }

  sendResponse(res, 200, user);
}
import { IncomingMessage, ServerResponse } from "http";
import userService from "../service/service";
import { isValidId, parseRequestBody, sendResponse, validateUserData } from "../utils";

export const getAllUsers = (res: ServerResponse) => {
  const users = userService.getAllusers();
  sendResponse(res, 200, users);
}

export const getUserById = (req: IncomingMessage, res: ServerResponse) => {
  const id = req.url?.split('/')[3] || '';

  if(!isValidId(id)) {
    return sendResponse(res, 400, { message: 'Invalid Id (not uuid)' })
  }
  
  const user = userService.getUserById(id);

  if(!user) {
    return sendResponse(res, 404, { message: 'User not found' })
  }

  sendResponse(res, 200, user);
}

export const deleteUser = (req: IncomingMessage, res: ServerResponse) => {
  const id = req.url?.split('/')[3] || '';

  if(!isValidId(id)) {
    return sendResponse(res, 400, { message: 'Invalid Id (not uuid)' })
  }

  const isDeleted = userService.deleteUser(id);

  if (!isDeleted) {
    return sendResponse(res, 404, { message: 'User not found' });
  }

  sendResponse(res, 204);
}

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await parseRequestBody(req);
    const validation = validateUserData(body);

    if (!validation.isValid) {
      return sendResponse(res, 400, { message: validation.error });
    }

    const newUser = userService.createUser(validation.user!);

    sendResponse(res, 201, newUser);
  } catch (error) {
    sendResponse(res, 400, { message: 'Invalid request body' });
  }
}

export const updateUser = async (req: IncomingMessage, res: ServerResponse) => {
  const id = req.url?.split('/')[3] || '';

  if (!isValidId(id)) {
    return sendResponse(res, 400, { message: 'Invalid userId (not UUID)' });
  }

  try {
    const body = await parseRequestBody(req);
    const validation = validateUserData(body);

    if(!validation.isValid) {
      return sendResponse(res, 400, { message: 'Invalid request body' });
    }

    const updatedUser = userService.updateUser(id, validation.user!);

    if (!updatedUser) {
      return sendResponse(res, 404, { message: 'User not found' });
    }

    return sendResponse(res, 200, updatedUser);
    
  } catch(err) {
    sendResponse(res, 400, { message: 'Invalid request body' });

  }
}
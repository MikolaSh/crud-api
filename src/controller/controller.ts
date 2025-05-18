import { IncomingMessage, ServerResponse } from "http";
import userService from "../service/service";
import { isValidId, parseRequestBody, sendResponse, validateUserData } from "../utils";

export const getAllUsers = (res: ServerResponse) => {
  try {
    const users = userService.getAllusers();
    sendResponse(res, 200, users);
  } catch (error) {
    console.error('Controller error in getAllUsers:', error);
    sendResponse(res, 500, { message: 'Internal server error while getting users' });
  }
}

export const getUserById = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const id = req.url?.split('/')[3] || '';

    if (!isValidId(id)) {
      return sendResponse(res, 400, { message: 'Invalid Id (not uuid)' });
    }
    
    try {
      const user = userService.getUserById(id);
      sendResponse(res, 200, user);
    } catch (error) {
      if (error instanceof Error && error.message === 'User not found') {
        return sendResponse(res, 404, { message: error.message });
      }
      throw error;
    }
  } catch (error) {
    console.error('Controller error in getUserById:', error);
    sendResponse(res, 500, { message: 'Internal server error while getting user' });
  }
}

export const deleteUser = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const id = req.url?.split('/')[3] || '';

    if (!isValidId(id)) {
      return sendResponse(res, 400, { message: 'Invalid Id (not uuid)' });
    }

    const isDeleted = userService.deleteUser(id);

    if (!isDeleted) {
      return sendResponse(res, 404, { message: 'User not found' });
    }

    sendResponse(res, 204);
  } catch (error) {
    console.error('Controller error in deleteUser:', error);
    sendResponse(res, 500, { message: 'Internal server error while deleting user' });
  }
}

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await parseRequestBody(req);
    const validation = validateUserData(body);

    if (!validation.isValid) {
      return sendResponse(res, 400, { message: validation.error });
    }

    try {
      const newUser = userService.createUser(validation.user!);
      sendResponse(res, 201, newUser);
    } catch (error) {
      console.error('Service error in createUser:', error);
      sendResponse(res, 500, { message: 'Internal server error while creating user' });
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('JSON')) {
      return sendResponse(res, 400, { message: 'Invalid request body' });
    }
    console.error('Controller error in createUser:', error);
    sendResponse(res, 500, { message: 'Internal server error while processing request' });
  }
}

export const updateUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const id = req.url?.split('/')[3] || '';

    if (!isValidId(id)) {
      return sendResponse(res, 400, { message: 'Invalid userId (not UUID)' });
    }

    const body = await parseRequestBody(req);
    const validation = validateUserData(body);

    if (!validation.isValid) {
      return sendResponse(res, 400, { message: 'Invalid request body' });
    }

    try {
      const updatedUser = userService.updateUser(id, validation.user!);
      sendResponse(res, 200, updatedUser);
    } catch (error) {
      if (error instanceof Error && error.message === 'User not found') {
        return sendResponse(res, 404, { message: error.message });
      }
      console.error('Service error in updateUser:', error);
      sendResponse(res, 500, { message: 'Internal server error while updating user' });
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('JSON')) {
      return sendResponse(res, 400, { message: 'Invalid request body' });
    }
    console.error('Controller error in updateUser:', error);
    sendResponse(res, 500, { message: 'Internal server error while processing request' });
  }
}
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controller/controller';
import userService from '../service/service';
import { isValidId, parseRequestBody, sendResponse, validateUserData } from '../utils';
import { IncomingMessage, ServerResponse } from 'http';

jest.mock('../service/service');
jest.mock('../utils', () => ({
  sendResponse: jest.fn(),
  parseRequestBody: jest.fn().mockResolvedValue({ username: 'test', age: 25, hobbies: [] }),
  validateUserData: jest.fn().mockReturnValue({ isValid: true, user: { username: 'test', age: 25, hobbies: [] } }),
  isValidId: jest.fn().mockImplementation(id => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))
}));

describe('User API CRUD', () => {
  const mockRes = { end: jest.fn() } as unknown as ServerResponse;
  let createdUserId = 'test-id-123';
  let mockUser = { id: createdUserId, username: 'test', age: 25, hobbies: [] };

  beforeEach(() => jest.clearAllMocks());

  it('GET /api/users returns empty array', () => {
    (userService.getAllusers as jest.Mock).mockReturnValue([]);
    getAllUsers(mockRes);
    expect(sendResponse).toBeCalledWith(mockRes, 200, []);
  });

  it('POST /api/users creates user', async () => {
    (userService.createUser as jest.Mock).mockReturnValue(mockUser);
    await createUser({ method: 'POST' } as IncomingMessage, mockRes);
    expect(sendResponse).toBeCalledWith(mockRes, 201, mockUser);
  });

  it('GET /api/users/{userId} returns created user', () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    const mockUser = { id: userId, username: 'test', age: 25, hobbies: [] };
  
    (userService.getUserById as jest.Mock).mockReturnValue(mockUser);
    (isValidId as jest.Mock).mockReturnValue(true);
  
    const req = {
      url: `/api/users/${userId}`,
    } as IncomingMessage;
  
    const originalURL = global.URL;
    global.URL = jest.fn().mockImplementation(() => ({
      pathname: `/api/users/${userId}`
    })) as any;
  
    getUserById(req, mockRes);
  
    expect(isValidId).toHaveBeenCalledWith(userId);
    expect(userService.getUserById).toHaveBeenCalledWith(userId);
    expect(sendResponse).toHaveBeenCalledWith(mockRes, 200, mockUser);
  
    global.URL = originalURL;
  });

  it('PUT /api/users/{userId} updates user', async () => {
    const updatedData = { username: 'updated', age: 30, hobbies: ['reading'] };
    const updatedUser = { ...mockUser, ...updatedData };
    
    (parseRequestBody as jest.Mock).mockResolvedValue(updatedData);
    (validateUserData as jest.Mock).mockReturnValue({ isValid: true, user: updatedData });
    (userService.updateUser as jest.Mock).mockReturnValue(updatedUser);

    const req = {
      url: `/api/users/${createdUserId}`,
      method: 'PUT',
      on: jest.fn().mockImplementation((event, callback) => {
        if (event === 'data') callback(JSON.stringify(updatedData));
        if (event === 'end') callback();
      })
    } as unknown as IncomingMessage;

    await updateUser(req, mockRes);

    expect(parseRequestBody).toHaveBeenCalledWith(req);
    expect(validateUserData).toHaveBeenCalledWith(updatedData);
    expect(userService.updateUser).toHaveBeenCalledWith(createdUserId, updatedData);
    expect(sendResponse).toHaveBeenCalledWith(mockRes, 200, updatedUser);
  });

  it('DELETE /api/users/{userId} removes user', () => {
    (userService.deleteUser as jest.Mock).mockReturnValue(true);
    (isValidId as jest.Mock).mockReturnValue(true);

    const req = {
      url: `/api/users/${createdUserId}`,
      method: 'DELETE'
    } as IncomingMessage;

    deleteUser(req, mockRes);

    expect(isValidId).toHaveBeenCalledWith(createdUserId);
    expect(userService.deleteUser).toHaveBeenCalledWith(createdUserId);
    expect(sendResponse).toHaveBeenCalledWith(mockRes, 204);
  });

  it('GET /api/users/{userId} after deletion returns 404', () => {
    (userService.getUserById as jest.Mock).mockImplementation(() => {
      throw new Error('User not found');
    });
    (isValidId as jest.Mock).mockReturnValue(true);

    const req = {
      url: `/api/users/${createdUserId}`,
      method: 'GET'
    } as IncomingMessage;

    getUserById(req, mockRes);

    expect(userService.getUserById).toHaveBeenCalledWith(createdUserId);
    
    expect(sendResponse).toHaveBeenCalledWith(
      mockRes,
      404,
      { message: 'User not found' }
    );
  });

});
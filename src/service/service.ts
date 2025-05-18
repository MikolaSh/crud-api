import { RequestUserData, User, Users } from "src/types";
import { initialUsers } from "./const";
import { generateUserId } from "../utils";

export class UserService {
  private db: { users: Users };

  constructor(initialUsers: Users) {
    this.db = { users: {} };
    this.db.users = initialUsers || {};
  }

  getAllusers = (): Array<User> => {
    try {
      return Object.values(this.db.users);
    } catch (error) {
      console.error('Failed to get all users:', error);
      throw new Error('Internal server error while retrieving users');
    }
  }

  getUserById = (id: string): User => {
    try {
      const user = this.db.users[id];
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      console.error(`Failed to get user ${id}:`, error);
      if (error instanceof Error && error.message === 'User not found') {
        throw error;
      }
      throw new Error('Internal server error while retrieving user');
    }
  }

  deleteUser = (id: string): boolean => {
    try {
      if (!this.db.users[id]) return false;
      delete this.db.users[id];
      return true;
    } catch (error) {
      console.error(`Failed to delete user ${id}:`, error);
      throw new Error('Internal server error while deleting user');
    }
  }

  createUser = (data: RequestUserData): User => {
    try {
      const id = generateUserId();
      this.db.users[id] = { id, ...data };
      return this.db.users[id];
    } catch (error) {
      console.error('Failed to create user:', error);
      throw new Error('Internal server error while creating user');
    }
  }

  updateUser = (id: string, data: RequestUserData): User => {
    try {
      if (!this.db.users[id]) throw new Error('User not found');
      this.db.users[id] = { id, ...data };
      return this.db.users[id];
    } catch (error) {
      console.error(`Failed to update user ${id}:`, error);
      if (error instanceof Error && error.message === 'User not found') {
        throw error;
      }
      throw new Error('Internal server error while updating user');
    }
  }
}

export default new UserService(initialUsers);
import { RequestUserData, User, Users } from "src/types";
import { initialUsers } from "./const";
import { generateUserId } from "../utils";

class UserService {
  private db: { users: Users };

  constructor() {
    this.db = { users: {} };

    this.db.users = initialUsers;
  }

  getAllusers = (): Array<User> => {
    return Object.values(this.db.users);
  }

  getUserById = (id: string): User => {
    return this.db.users[id];
  }

  deleteUser = (id: string): boolean => {
    if(!this.db.users[id]) return false;
    delete this.db.users[id];
    return true
  }

  createUser = (data: RequestUserData): User => {
    const id = generateUserId();
    this.db.users[id] = { id, ...data };
    return this.db.users[id];
  }

  updateUser = (id: string, data: RequestUserData): User => {
    this.db.users[id] = { id, ...data }
    return this.db.users[id]
  }
}

export default new UserService();
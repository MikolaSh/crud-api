import { User, Users } from "src/types";
import { initialUsers } from "./const";

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
}

export default new UserService();
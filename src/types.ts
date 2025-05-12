import { UUIDTypes } from "uuid";

export type User = {
  id: string | UUIDTypes;
  username: string;
  age: number;
  hobbies: Array<string>;
};

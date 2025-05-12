export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;
};

export type Users = {
  [key: string]: User;
}

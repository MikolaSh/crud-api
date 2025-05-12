export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;
};

export type RequestUserData = Omit<User, 'id'>;

export type Users = {
  [key: string]: User;
}

export type ValidationResult = { 
  isValid: boolean; 
  user?: RequestUserData; 
  error?: string 
}
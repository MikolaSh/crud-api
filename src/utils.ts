import { ServerResponse } from "http";
import { v4 as uuidv4 } from "uuid";
import { User } from "./types";

export const generateUserId = () => {
  return uuidv4();
}

export const sendResponse = (res: ServerResponse, status: number, data?: Array<User>) => {
  res.statusCode = status;
  if(data) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data))
  } else {
    res.end();
  }

}
import { ServerResponse } from "http";
import { v4 as uuidv4 } from "uuid";
import { User } from "./types";

export const generateUserId = () => {
  return uuidv4();
}

export const isValidId = (id: string) => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(id);
}

export const sendResponse = (res: ServerResponse, status: number, data?: object) => {
  res.statusCode = status;
  if(data) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data))
  } else {
    res.end();
  }

}
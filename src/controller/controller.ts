import { ServerResponse } from "http";
import userService from "../service/service";
import { sendResponse } from "../utils";

export const getAllUsers = (res: ServerResponse) => {
  const users = userService.getAllusers();
  console.log(users);
  sendResponse(res, 200, users);
  return userService.getAllusers();
}
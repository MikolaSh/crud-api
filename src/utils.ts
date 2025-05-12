import { IncomingMessage, ServerResponse } from "http";
import { v4 as uuidv4 } from "uuid";
import dns from "dns";
import os from "os";
import { User, ValidationResult } from "./types";

export const generateUserId = () => {
  return uuidv4();
}

export const isValidId = (id: string) => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(id);
}

export const parseRequestBody = (req: IncomingMessage) => {
    return new Promise((resolve, reject) => {
      let body = '';

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        try {
          resolve(JSON.parse(body))
        } catch (error) {
          reject(error);
        }
      });

      req.on('error', (error) => {
        reject(error);
      });
    })
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

export const getUserIPAddress = () => {
  const options = { family: 4 };
  
  return new Promise((resolve, reject) => {
    dns.lookup(os.hostname(), options, (err, addr) => {
      if (err) {
        reject(err);
      } else {
        resolve(addr);
      }
    });
  })
}

export const  validateUserData = (data: any): ValidationResult => {

  if (typeof data !== 'object' || data === null) {
    return { isValid: false, error: 'Request body must be a valid JSON object' };
  }

  const { username, age, hobbies } = data;

  if (!username || !age || !hobbies) {
    return { 
      isValid: false, 
      error: 'Missing required fields: username, age and hobbies are required' 
    };
  }

  if (typeof username !== 'string') {
    return { isValid: false, error: 'Username must be a string' };
  }

  if (typeof age !== 'number' || !Number.isInteger(age) || age <= 0) {
    return { isValid: false, error: 'Age must be a positive integer' };
  }

  if (!Array.isArray(hobbies)) {
    return { isValid: false, error: 'Hobbies must be an array' };
  }

  if (!hobbies.every((hobby: any) => typeof hobby === 'string')) {
    return { isValid: false, error: 'All hobbies must be strings' };
  }

  return {
    isValid: true,
    user: {
      username,
      age,
      hobbies
    }
  };
}
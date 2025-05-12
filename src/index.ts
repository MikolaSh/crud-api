import 'dotenv/config';
import startServer from "./app/server";

if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
}
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

startServer(Number(PORT), NODE_ENV === 'development');
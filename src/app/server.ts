import { getUserIPAddress } from "../utils";
import { app } from "./app";

export const startServer =  () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    const ipAddr = await getUserIPAddress();

    if(ipAddr) {
      console.log(`Url for Thunder Client: http://${ipAddr}:${PORT}`);

    }
  });
};
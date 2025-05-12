import http from "http";

const startServer = (port: number, isDev: boolean) => {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Server running in ${isDev ? 'DEV' : 'PROD'} mode\n`);
  });

  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`Mode: ${isDev ? 'Development' : 'Production'}`);
  });

  return server;
};

export default startServer;
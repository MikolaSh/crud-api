# crud-api

# Instalation

1.  ## run `npm install`  to install all dependencies ##
2.  ## run `npm run start:dev`  to run the app in development mode ##
3.  ## Make test requests using Thunder Client if you are using VS Code. ##
  1. Go to the Extensions
  2. Search "Thuder Client" 
  3. Install this extension

  Thunder client doesnt't work with "localhost", so I provide an proper url to work with Thunder Client using IP from the user os. 
  To create a request with Thuder Client:

  1. Go to Thuder Client in the sidebar in VS Code
  2. Press "New Request"
  3. In the text input add url 
  4. Select method in select
  5. In the "Body" tab you should provide objects for PUT and POST methods

Endpoints 
 - GET `http://{USER_IP}:4000/api/users` 
 - GET `http://{USER_IP}:4000/api/users/{userId}` 
 - POST `http://{USER_IP}:4000/api/users` 
 - PUT `http://{USER_IP}:4000/api/users/{userId}` 
 - DELETE `http://{USER_IP}:4000/api/users/{userId}` 

USER_IP - your network ID. You can find url in the consol after starting the app or you can get the IP with the command `ipconfig`. You need IPv4-address

4. ## run `npm run start:prod` to create a bundle.js ##
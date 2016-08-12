# Aliza Lab

Double Resource API

## How to use:  

- Git clone repo  
- Install dependencies with npm i
- In the command line, run 'mongod --dbpath db'  
- Open a new tab in the command line and nodemon server.js
- Send a POST request for a new panda with: http POST :3000/api/panda/newpanda name=<String> age=<Number> happy=<Boolean>
- Send a POST request for a new party with: http POST :3000/api/party/newparty theme=<String> location=<String>
- Send a GET request with: http GET :3000/api/panda/<id>
- Send a GET request with: http GET :3000/api/party/<id>
- Send a GET request with: http GET :3000/api/party/allparties  
- Send a GET request with: http GET :3000/api/panda/allpandas
- Send a PUT request with: http PUT :3000/api/party/<party_id>/panda/<panda_id>
- Run eslint and mocha tests by typing 'gulp' in the command line  

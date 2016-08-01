# Aliza Lab

Double Resource API

## How to use:  

- Git clone repo  
- Install dependencies with npm i
- In the command line, run 'mongod --dbpath db'  
- Open a new tab in the command line and nodemon server.js
- Send a POST request in another tab with: http POST :3000/api/panda name=<String> age=<Number> happy=<Boolean>
- Send a GET request with: http GET :3000/api/panda/<id>
- Send a PUT request with: http PUT :3000/api/panda/<id> name=<String> age=<Number> happy=<Boolean>
- Bonus: Send a GET request to list all pandas with with: http GET :3000/api/all
- Run eslint and mocha tests by typing 'gulp' in the command line  

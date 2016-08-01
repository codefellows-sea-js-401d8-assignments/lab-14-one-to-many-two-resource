## Two-resource CRUD api for an e-commerce website
## Changes
Mongodb is used in place of in-memory storage

## Usage:
  * Navigate to folder `lab-steventhan`
  * Run `node server` to start server
  * To CREATE a new project run `cat sample-project.json | http localhost:3000/api/projects` from the command line, it should appears at `localhost:3000/api/projects/all`
  * To READ all projects, in browser, navigate to `localhost:3000/api/projects/all`,
  * To READ 1 project in browser, navigate to `localhost:3000/api/projects/<valid id>`.
  * To UPDATE an existing project run `cat sample-project.json | http PUT localhost:3000/api/projects/<valid id>`, this should update the dummy project with new data from `sample-project.json`
  * To DESTROY a project run `http DELETE localhost:3000/api/projects/<valid id>`

## Test:
  * Install devDependencies
  * Run either `gulp` or `mocha` to test

## Two-resource CRUD api for an e-commerce website
## Changes
Mongodb is used in place of in-memory storage

## User Usage:
  * Navigate to folder `lab-steventhan`
  * Run `node server` to start server
  * To CREATE a new user run `cat test/user-sample.json | http localhost:3000/api/users` from the command line, it should appears at `localhost:3000/api/users/all`
  * To READ all projects, in browser, navigate to `localhost:3000/api/users/all`,
  * To READ 1 project in browser, navigate to `localhost:3000/api/users/<valid id>`.
  * To UPDATE an existing project run `cat sample-project.json | http PUT localhost:3000/api/users/<valid id>`, this should update the user with new data from `sample-project.json`
  * To DESTROY a project run `http DELETE localhost:3000/api/users/<valid id>`

## Order Usage:
  * Navigate to folder `lab-steventhan`
  * Run `node server` to start server
  * To CREATE a new order run `cat test/order-sample.json | http localhost:3000/api/orders` from the command line, it should appears at `localhost:3000/api/orders/all`
  * To READ all orders, in browser, navigate to `localhost:3000/api/orders/all`,
  * To READ 1 order in browser, navigate to `localhost:3000/api/orders/<valid id>`.
  * To UPDATE an existing order run `cat sample-project.json | http PUT localhost:3000/api/orders/<valid id>`, this should update the order with new data from `sample-project.json`
  * To DESTROY a project run `http DELETE localhost:3000/api/orders/<valid id>`

## User-Order Usage:
  * Navigate to folder `lab-steventhan`
  * Run `node server` to start server
  * To CREATE a new user run `cat test/order-sample.json | http localhost:3000/api/users/<valid user id>/orders` from the command line, it should appears at `localhost:3000/api/orders/all`
  * To READ all projects, in browser, navigate to `localhost:3000/api/orders/all`,
  * To READ 1 project in browser, navigate to `localhost:3000/api/orders/<valid id>`.
  * To UPDATE an existing project run `cat sample-project.json | http PUT localhost:3000/api/orders/<valid id>`, this should update the dummy project with new data from `sample-project.json`
  * To DESTROY a project run `http DELETE localhost:3000/api/orders/<valid id>`

## Test:
  * Install devDependencies
  * Run either `gulp` or `mocha` to test

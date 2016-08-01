# Lab 14 Double Resource Express/Mongo API
This is my lab to create a server using express with a double resource. Mongo is used as the database.

##Installation
Clone down the repo then `npm install` to install dependencies. `mongodb` is required as well.

##Directions
It's recommended you have HTTPie.
First, you need to get started with mongo.
Make a folder in the repo directory named `db`
In the command line `mongod --dbpath db` to establish where to store the database.
Next, run mongo `mongod`

###GET requests
`HTTP GET :3000/api/hero/all` gets all heroes in the db
`HTTP GET :3000/api/hero/_id` gets any hero by id property
`HTTP GET :3000/api/zone/all` gets all zones in the db
`HTTP GET :3000/api/zone/_id` gets any zone by id property
`HTTP GET :3000/api/zone/zoneId/hero/all` gets all heroes in the zone specified by zoneId

###POST requests
`HTTP POST :3000/api/hero name=thrall race=orc faction=horde` format to post a new hero
`HTTP POST :3000/api/zone name=durotar continent=kalimdor` format to post a new zone
`HTTP POST :3000/api/zone/zoneId/hero name=thrall race=orc faction=horde` format to post a new hero in a specified zone

###PUT requests
`HTTP PUT :3000/api/hero/_id` updates name, race, or faction property for hero by id
`HTTP PUT :3000/api/zone/_id` updates name or continent for zone by id
`HTTP PUT :3000/api/zone/zoneId/hero/hero_id` adds hero to specified zone

###DELETE requests
`HTTP DELETE :3000/api/hero/_id` removes hero by id
`HTTP DELETE :3000/api/hero/_id` removes zone by id
`HTTP DELETE :3000/api/zone/zoneId/hero/hero_id` removes hero from specified zone

##Testing
Right now, simply typing `mocha` in the command line will run a test on almost all routes. This has yet to be completed.

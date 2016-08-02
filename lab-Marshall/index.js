'use strict';

const server = require('./server');

server.listen(process.env.PORT || 3000, () => console.log('Server up on 3000!'));

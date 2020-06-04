require('dotenv').config();
const server = require('./server.js');

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`\n Users API Server listening on ${PORT} ***\n`);
  });

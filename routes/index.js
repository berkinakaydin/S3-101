const fs = require('fs');

let routes = [];

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require
    routes = routes.concat(require(`./${file}`));
  });

module.exports = routes;

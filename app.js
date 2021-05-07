const Hapi = require('@hapi/hapi');
const config = require('./config');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: config.PORT,
    host: 'localhost',
  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();

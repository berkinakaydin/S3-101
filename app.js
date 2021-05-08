const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const { BUCKET_NAME } = require('./config');

const config = require('./config');
const routes = require('./routes');
const awsS3Util = require('./utils/aws-s3');

const init = async () => {
  const server = Hapi.server({
    port: config.PORT,
    host: config.HOST,
  });

  if (BUCKET_NAME === undefined) {
    console.error(`Bucket Not Found : ${BUCKET_NAME}`);
    process.exit(0);
  }

  const swaggerOptions = {
    info: {
      title: 'Affinidi Study Case API Documentation',
      version: '0.1.0',
    },
  };

  awsS3Util.createS3Bucket({ bucketName: config.BUCKET_NAME });

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  try {
    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (err) {
    console.log(err);
  }

  server.route(routes);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();

const ImageController = require('../controllers/image-controller');

module.exports = [
  {
    method: 'POST',
    path: '/images',
    handler: ImageController.uploadImage,
    options: {
      payload: {
        maxBytes: 10485760,
        output: 'stream',
        parse: true,
        allow: ['multipart/form-data'],
        multipart: true,
      },
    },
  },
];

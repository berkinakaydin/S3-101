const ImageController = require('../controllers/image-controller');
const imageSchema = require('../schema/image');

module.exports = [
  {
    method: 'POST',
    path: '/v1/images',
    handler: ImageController.uploadImage,
    options: {
      description: 'Upload Image To AWS S3',
      notes: 'Uploads given image to Amazon S3 Bucket',
      tags: ['api'], // ADD THIS TAG
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
        },
      },
      validate: imageSchema.images.validate,
      response: imageSchema.images.response,
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

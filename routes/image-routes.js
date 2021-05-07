const ImageController = require('../controllers/image-controller');

module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: ImageController.test,
  },

  {
    method: 'POST',
    path: '/image',
    handler: ImageController.upload,
  },
];

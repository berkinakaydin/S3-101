const { ImageService } = require('../services');

module.exports = class ImageController {
  constructor() {
    this.ImageService = ImageService;
  }

  static test(request) {
    console.log(request);
    return ImageService.test();
  }

  static upload(request) {
    console.log(request);

    return 'Hello World2';
  }
};

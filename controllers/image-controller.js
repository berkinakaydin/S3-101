const { ImageService } = require('../services');

module.exports = class ImageController {
  constructor() {
    this.ImageService = ImageService;
  }

  static async uploadImage(request, h) {
    const image = request.payload.file;
    const status = await ImageService.putObject({ object: image });

    if (status) {
      return h.response('File Created').code(201);
    }
    return h.response({ status: false, msg: 'error' }).code(200);
  }
};

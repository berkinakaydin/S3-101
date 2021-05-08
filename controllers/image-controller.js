const { ImageService } = require('../services');
const { BUCKET_PATH } = require('../config');

module.exports = class ImageController {
  constructor() {
    this.ImageService = ImageService;
  }

  static async uploadImage(request, h) {
    const image = request.payload.file;
    const status = await ImageService.putImage({ object: image });

    if (status) {
      const fileUrl = `${BUCKET_PATH}/${image.hapi.filename}`;

      const response = h.response({
        status: true,
        message: 'File Uploaded Successfully',
        url: fileUrl,
      }).code(201);

      response.header('Location', fileUrl);
      return response;
    }

    return h.response({
      status: false,
      message: 'File Couldn\'t Uploaded',
    }).code(200);
  }

  static async getImage(request, h) {
    const { imageName } = request.params;
    const status = await ImageService.getImage({ imageName });

    if (status) {
      const fileUrl = `${BUCKET_PATH}/${imageName}`;

      return h.response({
        status: true,
        message: 'File Received Successfully',
        url: fileUrl,
      }).code(200);
    }

    return h.response({
      status: false,
      message: 'File Not Found',
    }).code(404);
  }
};

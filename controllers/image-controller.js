const { ImageService } = require('../services');
const { BUCKET_PATH, VALID_EXTENSIONS } = require('../config');
const stringUtil = require('../utils/string');

module.exports = class ImageController {
  constructor() {
    this.ImageService = ImageService;
  }

  static async uploadImage(request, h) {
    const image = request.payload.file;
    const imageName = image.hapi.filename;

    if (!VALID_EXTENSIONS
      .some((extension) => extension === stringUtil.getExtension(imageName).toLowerCase())) {
      return h.response({
        status: false,
        message: 'Not Valid Extension',
      }).code(403);
    }

    // eslint-disable-next-line no-underscore-dangle
    const imageData = image._data;

    const status = await ImageService.putImage({ imageName, imageData });

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

  static async convertImageExtension(request, h) {
    const { imageName, extension } = request.params;
    const status = await ImageService.convertImageExtension({ imageName, newExtension: extension });

    if (status) {
      const imageNameWithoutExtension = stringUtil.removeExtension(imageName);
      const fileUrl = `${BUCKET_PATH}/${imageNameWithoutExtension}.${extension}`;

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

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
      return h.response({ status: true, message: 'File Uploaded Successfully', url: fileUrl }).code(201);
    }
    return h.response({ status: false, message: 'File Couldn\'t Uploaded' }).code(200);
  }
};

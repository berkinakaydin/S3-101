const awsS3Util = require('../utils/aws-s3');
const stringUtil = require('../utils/string');
const imageProcessUtil = require('../utils/image-process');
const { BUCKET_NAME } = require('../config');

module.exports = class ImageService {
  static async getBucket({ bucketName }) {
    const bucket = await awsS3Util.isBucketExists({ bucketName });
    return bucket;
  }

  static async createBucket({ bucketName }) {
    const bucket = await awsS3Util.createS3Bucket({ bucketName });
    return bucket;
  }

  static async putImage({ imageName, imageData }) {
    const imageExtension = stringUtil.getExtension(imageName);
    const contentType = `image/${imageExtension}`;
    const compressedFileBuffer = await imageProcessUtil.compressImage({ fileBuffer: imageData });

    // Set the parameters
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: imageName,
      Body: compressedFileBuffer,
      ContentType: contentType,
      ACL: 'public-read',
    };

    return awsS3Util.putObjectS3Bucket({ uploadParams });
  }

  static async getImage({ imageName }) {
    // Set the parameters
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: imageName,
    };
    return awsS3Util.getObjectS3Bucket({ uploadParams });
  }

  static async convertImageExtension({ imageName, newExtension }) {
    const imageNameWithoutExtension = stringUtil.removeExtension(imageName);

    const s3Image = await this.getImage({ imageName });

    if (s3Image) {
      const s3ImageContentType = s3Image.ContentType;

      const isSameExtension = stringUtil.getExtensionFromMime(s3ImageContentType) === newExtension;

      if (isSameExtension) {
        return s3Image;
      }

      const fileBuffer = await imageProcessUtil.streamToBuffer(s3Image.Body);

      const convertedImageBuffer = await imageProcessUtil.convertExtension({
        fileBuffer,
        extension: newExtension,
      });

      return this.putImage({
        imageName: `${imageNameWithoutExtension}.${newExtension}`,
        imageData: convertedImageBuffer,
      });
    }

    return null;
  }
};

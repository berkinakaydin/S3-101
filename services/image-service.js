const fs = require('fs');
const awsS3Util = require('../utils/aws-s3');
const { BUCKET_NAME } = require('../config');
const { MIME_EXTENSION_MAP } = require('../constants');

module.exports = class ImageService {
  static async getBucket({ bucketName }) {
    const bucket = await awsS3Util.isBucketExists({ bucketName });
    return bucket;
  }

  static async createBucket({ bucketName }) {
    const bucket = await awsS3Util.createS3Bucket({ bucketName });
    return bucket;
  }

  static async putObject({ object }) {
    const filePath = object.path;
    const fileName = object.filename;
    const fileExtension = fileName.split('.').pop();
    const fileStream = fs.readFileSync(filePath);

    // Set the parameters
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileStream,
      ContentType: MIME_EXTENSION_MAP[fileExtension],
    };

    return awsS3Util.putObjectS3Bucket({ uploadParams });
  }
};

const fs = require('fs');
const sharp = require('sharp');
const awsS3Util = require('../utils/aws-s3');
const { BUCKET_NAME } = require('../config');
const { MIME_EXTENSION_MAP } = require('../constants');

const convertExtension = async ({ fileBuffer }) => ({
  fileBuffer: await sharp(fileBuffer).toFormat('png').toBuffer(),
  extension: 'png',
});

const compressImage = async ({ fileBuffer }) => (
  sharp(fileBuffer)
    .jpeg({ progressive: true, chromaSubsampling: '4:4:4', force: false })
    .png({ quality: 80, progressive: true, force: false })
    .toBuffer()
);

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
    const fileBuffer = fs.readFileSync(filePath);

    const compressedFileBuffer = await compressImage({ fileBuffer });

    // Set the parameters
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: compressedFileBuffer,
      ContentType: MIME_EXTENSION_MAP[fileExtension],
    };

    return awsS3Util.putObjectS3Bucket({ uploadParams });
  }
};

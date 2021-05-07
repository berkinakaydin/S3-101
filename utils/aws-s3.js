const {
  S3Client, HeadBucketCommand, CreateBucketCommand, PutObjectCommand, DeleteBucketCommand,
} = require('@aws-sdk/client-s3');
const { REGION } = require('../config');

// Create S3 service object
const s3 = new S3Client({ region: REGION });

const isBucketExists = async ({ bucketName }) => {
  try {
    const bucket = await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
    console.log(`Bucket ${bucketName} found`);
    return bucket;
  } catch {
    console.log(`Bucket ${bucketName} not found`);
    return null;
  }
};

const createS3Bucket = async ({ bucketName }) => {
  const bucket = await isBucketExists({ bucketName });

  if (!bucket) {
    try {
      const data = await s3.send(new CreateBucketCommand({ Bucket: bucketName }));
      console.log(`Bucket ${bucketName} created successfully`);
      return data;
    } catch (err) {
      console.log(`Bucket ${bucketName} couldn't create`);
      return null;
    }
  }

  return bucket;
};

const deleteS3Bucket = async ({ bucketName }) => {
  const bucket = await isBucketExists({ bucketName });

  if (bucket) {
    try {
      await s3.send(new DeleteBucketCommand({ Bucket: bucketName }));
      console.log(`Bucket ${bucketName} deleted successfully`);
    } catch (err) {
      console.log(`Bucket ${bucketName} couldn't deleted`);
    }
  }
};

const putObjectS3Bucket = async ({ uploadParams }) => {
  try {
    const data = await s3.send(new PutObjectCommand(uploadParams));
    console.log('Success', data);
    return data;
  } catch (err) {
    console.log('Error', err);
    return null;
  }
};

module.exports = {
  createS3Bucket,
  isBucketExists,
  putObjectS3Bucket,
  deleteS3Bucket,
};

const {
  S3Client,
  HeadBucketCommand,
  CreateBucketCommand,
  PutObjectCommand,
  DeleteBucketCommand,
  GetObjectCommand,
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
    console.log(`${uploadParams.Key} added successfully`);
    return data;
  } catch (err) {
    console.log(`Failed to add : ${uploadParams.Key}`);
    return null;
  }
};

const getObjectS3Bucket = async ({ uploadParams }) => {
  try {
    const data = await s3.send(new GetObjectCommand(uploadParams));
    console.log(`${uploadParams.Key} retrieved successfully`);
    return data;
  } catch (err) {
    console.log(`Failed to retrieve : ${uploadParams.Key}`);
    return null;
  }
};

module.exports = {
  createS3Bucket,
  isBucketExists,
  putObjectS3Bucket,
  deleteS3Bucket,
  getObjectS3Bucket,
};

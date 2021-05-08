const faker = require('faker');
const mockS3Client = require('@aws-sdk/client-s3');
const { REGION } = require('../config');

const mockCreateBucket = jest.fn();

jest.mock('@aws-sdk/client-s3', () => {
  const mS3 = {
    createBucketCommand: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return jest.fn(() => mS3);
});

const { createS3Bucket } = require('../utils/aws-s3');

test('has to mock S3#createBucket', async (done) => {
  const bucketName = Math.random().toString(36);
  const mS3 = new mockS3Client();
  mS3.createBucketCommand().promise;
  await createS3Bucket({ bucketName });

  // const bucketName = Math.random().toString(36);
  // await createS3Bucket({bucketName});
  // expect(mockCreateBucket).toHaveBeenCalled;
  // await deleteS3Bucket({bucketName})
  // done();
});

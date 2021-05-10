const faker = require('faker');

const awsS3Util = require('../utils/aws-s3');
const { ImageService } = require('../services');

test('has to get bucket', async () => {
  const isBucketExistsMock = jest.spyOn(awsS3Util, 'isBucketExists');
  isBucketExistsMock.mockImplementation(() => ({ success: true }));

  const bucketName = faker.random.word();

  const bucket = await ImageService.getBucket({ bucketName });

  expect(bucket).toEqual({ success: true });

  isBucketExistsMock.mockRestore();
});

test('has to create bucket', async () => {
  const createBucketMock = jest.spyOn(awsS3Util, 'createS3Bucket');
  createBucketMock.mockImplementation(() => ({ success: true }));

  const bucketName = faker.random.word();

  const bucket = await ImageService.createBucket({ bucketName });

  expect(bucket).toEqual({ success: true });

  createBucketMock.mockRestore();
});

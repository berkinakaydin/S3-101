const REGION = process.env.REGION || 'eu-west-1'; // The AWS Region. For example, "us-east-1".
const { BUCKET_NAME } = process.env;

module.exports = {
  HOST: process.env.HOST || (process.env.NODE_ENV === 'production') ? undefined : 'localhost',
  PORT: process.env.PORT || 8080,
  REGION,
  BUCKET_NAME,
  BUCKET_PATH: `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com`,
  VALID_EXTENSIONS: ['png', 'jpg', 'jpeg'],
};

const Joi = require('joi');

module.exports = {
  upload: {
    validate: {
      payload: Joi.object({
        file: Joi.any()
          .meta({ swaggerType: 'file' })
          .description('Image'),
      }),
    },
    response: {
      status: {
        201: Joi.object({
          status: Joi.boolean().required().example(true),
          message: Joi.string().required().example('File Uploaded Successfully'),
          url: Joi.string().required().example('https://s3bucket.s3.region/filename'),
        }).label('Upload-Image-Success-Response'),
        200: Joi.object({
          status: Joi.boolean().required().example(false),
          message: Joi.string().required().example('File Couldn\'t Uploaded'),
        }).label('Upload-Image-Fail-Response'),
      },
    },
  },
  fetch: {
    validate: {
      params: Joi.object({
        imageName: Joi.string().pattern(new RegExp('^.*\\.(png|PNG|jpg|JPG|jpeg|JPEG|gif|GIF|doc|DOC|pdf|PDF)$')),
      }).options({ stripUnknown: true }),
    },
    response: {
      status: {
        200: Joi.object({
          status: Joi.boolean().required().example(true),
          message: Joi.string().required().example('File Received Successfully'),
          url: Joi.string().required().example('https://s3bucket.s3.region/filename'),
        }).label('Fetch-Image-Success-Response'),
        404: Joi.object({
          status: Joi.boolean().required().example(false),
          message: Joi.string().required().example('File Not Found'),
        }).label('Fetch-Image-Fail-Response'),
      },
    },
  },
};

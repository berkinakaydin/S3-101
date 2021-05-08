const Joi = require('joi');

module.exports = {
  images: {
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
        }),
        200: Joi.object({
          status: Joi.boolean().required().example(false),
          message: Joi.string().required().example('File Couldn\'t Uploaded'),
        }),
      },
    },
  },
};

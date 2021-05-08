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
  },
};

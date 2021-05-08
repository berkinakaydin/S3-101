const ImageController = require('../controllers/image-controller');
const {
  upload,
  fetch,
  conversion,
} = require('../schema/image');

module.exports = [
  {
    method: 'POST',
    path: '/v1/images',
    handler: ImageController.uploadImage,
    options: {
      description: 'Upload Image To AWS S3',
      notes: 'Uploads given image to Amazon S3 Bucket',
      tags: ['api'], // ADD THIS TAG
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
        },
      },
      validate: upload.validate,
      response: upload.response,
      payload: {
        maxBytes: 10485760,
        output: 'stream',
        parse: true,
        allow: ['multipart/form-data'],
        multipart: true,
      },
    },
  },
  {
    method: 'GET',
    path: '/v1/images/{imageName}',
    handler: ImageController.getImage,
    options: {
      validate: fetch.validate,
      response: fetch.response,
      description: 'Fetch Image From AWS S3 With Image Name',
      notes: 'Receives image from AWS with name',
      tags: ['api'], // ADD THIS TAG
    },
  },
  {
    method: 'GET',
    path: '/v1/images/{imageName}/extensions/{extension}',
    handler: ImageController.convertImageExtension,
    options: {
      validate: conversion.validate,
      response: conversion.response,
      description: 'Fetch Image From AWS S3 With Image Name And New Extension Name',
      notes: 'Receives image from AWS with name according to extension',
      tags: ['api'], // ADD THIS TAG
    },
  },
];

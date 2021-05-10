const path = require('path');
const mime = require('mime-types');

const removeExtension = (string) => {
  if (typeof string === 'string') {
    return path.parse(string).name;
  }
  return string;
};

const getExtension = (string) => {
  if (typeof string === 'string') {
    return string.split('.').pop();
  }
  return string;
};

const getExtensionFromMime = (mimeType) => (mime.extension(mimeType));

const getMimeTypes = (extension) => (mime.lookup(extension));

module.exports = {
  removeExtension,
  getExtension,
  getExtensionFromMime,
  getMimeTypes,
};

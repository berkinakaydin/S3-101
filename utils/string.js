const path = require('path');
const mime = require('mime-types');

const removeExtension = (string) => (path.parse(string).name);

const getExtension = (string) => (string.split('.').pop());

const getExtensionFromMime = (mimeType) => (mime.extension(mimeType));

const getMimeTypes = (extension) => (mime.lookup(extension));

module.exports = {
  removeExtension,
  getExtension,
  getExtensionFromMime,
  getMimeTypes,
};

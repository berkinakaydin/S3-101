const sharp = require('sharp');

const convertExtension = async ({ fileBuffer, extension }) => (
  sharp(fileBuffer).toFormat(extension).toBuffer()
);

const compressImage = async ({ fileBuffer }) => (
  sharp(fileBuffer)
    .jpeg({
      quality: 80,
      progressive: true,
      chromaSubsampling: '4:4:4',
      force: false,
    })
    .png({
      quality: 80,
      progressive: true,
      force: false,
    })
    .toBuffer()
);

const streamToBuffer = (stream) => new Promise((resolve, reject) => {
  const chunks = [];
  stream.on('data', (chunk) => chunks.push(chunk));
  stream.on('error', reject);
  stream.on('end', () => resolve(Buffer.concat(chunks)));
});

module.exports = {
  streamToBuffer,
  compressImage,
  convertExtension,
};

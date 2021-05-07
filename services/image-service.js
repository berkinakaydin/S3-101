module.exports = class ImageService {
  static test(request) {
    console.log(request);
    return 'not ready';
  }

  static upload(request) {
    console.log(request);

    return 'Hello World2';
  }
};

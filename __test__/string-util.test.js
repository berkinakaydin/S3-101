const stringUtil = require('../utils/string');

describe('String Util Test Cases', () => {
  it.each`
  input  | expected
  ${'test.jpg'} | ${'test'}
  ${'jpg.jpg.jpg'} | ${'jpg.jpg'}
  ${'jpg'} | ${'jpg'}
  ${"''"} | ${"''"}
  ${undefined} | ${undefined}
  ${2.2} | ${2.2}
  `('should retrieve $input without extension like $expected', ({ input, expected }) => {
    const output = stringUtil.removeExtension(input);
    expect(output).toEqual(expected);
  });

  it.each`
  input  | expected
  ${'test.jpg'} | ${'jpg'}
  ${'jpg.jpg.jpg'} | ${'jpg'}
  ${'jpg'} | ${'jpg'}
  ${"''"} | ${"''"}
  ${undefined} | ${undefined}
  ${2.2} | ${2.2}
  `('should retrieve $input extension from like $expected', ({ input, expected }) => {
    const output = stringUtil.getExtension(input);
    expect(output).toEqual(expected);
  });

  it.each`
  input  | expected
  ${'test'} | ${false}
  ${'image/png'} | ${'png'}
  ${'image/'} | ${false}
  ${"''"} | ${false}
  ${undefined} | ${false}
  ${2.2} | ${false}
  `('should retrieve $input extension from mime like $expected', ({ input, expected }) => {
    const output = stringUtil.getExtensionFromMime(input);
    expect(output).toEqual(expected);
  });

  it.each`
  input  | expected
  ${'test'} | ${false}
  ${'png'} | ${'image/png'}
  ${'image/'} | ${false}
  ${"''"} | ${false}
  ${undefined} | ${false}
  ${2.2} | ${false}
  `('should retrieve $input mime type from extension like $expected', ({ input, expected }) => {
    const output = stringUtil.getMimeTypes(input);
    expect(output).toEqual(expected);
  });
});

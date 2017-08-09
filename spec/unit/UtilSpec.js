const fs = require('fs');

const BASE = '../../src/';
const Util = require(`${BASE}Util`);

const ENCODING = {
  encoding: 'utf-8'
};

describe('Util', () => {
  [
    {testee: ['1', '2', '3', '4'], regex: /2/, expected: 1},
    {testee: ['cat', 'meow', 'swag'], regex: /swag/, expected: 2},
    {testee: ['partial match', 'bleh'], regex: /partial/, expected: 0},
    {testee: ['par', 'par', 'par'], regex: /par/, expected: 2}
  ].forEach((testCase) => {
    it(`should find last index matching ${testCase.regex}`, () => {
      let result = Util.getIndexByRegex(testCase.testee, testCase.regex);
      expect(result).toBe(testCase.expected);
    });
  });

  describe('updateFile', () => {
    const MOCK_FILE_CONTENTS = 'readContents';
    
    beforeEach(() => {
      spyOn(fs, 'readFileSync').and.callFake(() => {
        return MOCK_FILE_CONTENTS;
      });
      spyOn(fs, 'writeFileSync').and.stub();
    });

    it('should read a path, pass file contents to callback, then write returned content', () => {
      const MOCK_PATH = 'any/path';
      let callbackSpy = jasmine.createSpy('callback').and.callFake((anyString) => {
        return `${anyString}-updated`;
      });

      Util.updateFile(MOCK_PATH, callbackSpy);

      expect(fs.readFileSync).toHaveBeenCalledWith(MOCK_PATH, ENCODING);
      expect(callbackSpy).toHaveBeenCalledWith(MOCK_FILE_CONTENTS);
      expect(fs.writeFileSync).toHaveBeenCalledWith(MOCK_PATH, `${MOCK_FILE_CONTENTS}-updated`);
    });
  });
});
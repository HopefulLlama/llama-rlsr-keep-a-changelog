const fs = require('fs');

const BASE = '../../src/';
const ChangelogUpdater = require(`${BASE}ChangelogUpdater`);

const ENCODING = {
  encoding: 'utf-8'
};

const MOCK_CHANGELOG = `## [Unreleased]
### Added
- Hello World
`;

const VERSION_METADATA = {
  oldVersion: '0.0.1',
  newVersion: '0.0.2'
};


describe('ChangelogUpdater', () => {
  let newFileContents;
  let config;

  function assert(conf, filePath, insertedDiffs) {
    ChangelogUpdater.update(VERSION_METADATA, conf);

    expect(fs.readFileSync).toHaveBeenCalledWith(filePath, ENCODING);
    expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, newFileContents);
    insertedDiffs.forEach((diff) => {
      expect(newFileContents).toContain(diff);
    });
  }

  beforeEach(() => {
    newFileContents = undefined;
    config = {};

    spyOn(fs, 'readFileSync').and.callFake(() => {
      return MOCK_CHANGELOG;
    });
    spyOn(fs, 'writeFileSync').and.callFake((filePath, writeContents) => {
      newFileContents = writeContents;
    });
  });

  it('should insert new block for new version (different date)', () => {
    let date = new Date(2017, 0, 1);
    spyOn(Date, 'now').and.callFake(() => {
      return date;
    });

    assert(config, './CHANGELOG.md', [
      '',
      '## [0.0.2] 2017-01-01'
    ]);
  });

  describe('with date set to 1991-12-12', () => {
    beforeEach(() => {
      const DATE = new Date(1991, 11, 12);
      spyOn(Date, 'now').and.callFake(() => {
        return DATE;
      });
    });

    it('should insert new block for new version (with defaults)', () => {
      assert(config, './CHANGELOG.md', [
        '',
        '## [0.0.2] 1991-12-12'
      ]);
    });

    it('should insert new block for new version (override defaults)', () => {
      config.placeholder = 'YOLO';
      config.path = './new.md';

      assert(config, './new.md', [
        'YOLO',
        '## [0.0.2] 1991-12-12'
      ]);
    });
  });
});
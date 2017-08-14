const fs = require('fs');

const BASE = '../../src/';
const DiffUpdater = require(`${BASE}DiffUpdater`);

const ENCODING = {
  encoding: 'utf-8'
};

const MOCK_DIFF = `[Unreleased]: http://www.website.com/0.0.1-HEAD
[0.0.1]: http://www.website.com/abfeg-0.0.1`;

const VERSION_METADATA = {
  oldVersion: '0.0.1',
  newVersion: '0.0.2'
};

const DEFAULT_PATH = './CHANGELOG.md';

const DONE = jasmine.createSpy('done');

function urlGenerator(oldVersion, newVersion) {
  return `MARKER-${oldVersion}-${newVersion}`;
}

describe('DiffUpdater', () => {
  let newFileContents;
  let config;

  function assert(conf, filePath, insertedDiffs) {
    DiffUpdater.update(VERSION_METADATA, conf, DONE);

    expect(fs.readFileSync).toHaveBeenCalledWith(filePath, ENCODING);
    expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, newFileContents);
    insertedDiffs.forEach((diff) => {
      expect(newFileContents).toContain(diff);
    });

    expect(DONE).toHaveBeenCalled();
  }

  beforeEach(() => {
    newFileContents = undefined;
    config = {
      urlGenerator: urlGenerator,
      latest: 'HEAD'
    };

    spyOn(fs, 'readFileSync').and.callFake(() => {
      return MOCK_DIFF;
    });
    spyOn(fs, 'writeFileSync').and.callFake((filePath, writeContents) => {
      newFileContents = writeContents;
    });
  });

  it('should insert new version and url (with defaults)', () => {
    assert(config, DEFAULT_PATH, [
      '[Unreleased]: MARKER-0.0.2-HEAD',
      '[0.0.2]: MARKER-0.0.1-0.0.2'
    ]);
  });

  it('should insert new version and url (override default)', () => {
    config.tag = {
      prefix: 'v',
      suffix: '-dab'
    };
    config.latest = 'Swegg';
    config.path = './different.md';

    assert(config, './different.md', [
      '[Unreleased]: MARKER-v0.0.2-dab-Swegg',
      '[0.0.2]: MARKER-v0.0.1-dab-v0.0.2-dab'
    ]);
  });

  it('should insert with prefix', () => {
    config.tag = {
      prefix: 'v'
    };
    config.latest = 'Swegg';

    assert(config, DEFAULT_PATH, [
      '[Unreleased]: MARKER-v0.0.2-Swegg',
      '[0.0.2]: MARKER-v0.0.1-v0.0.2'
    ]);
  });

  it('should insert with suffix', () => {
    config.tag = {
      suffix: '-dab'
    };
    config.latest = 'Swegg';

    assert(config, DEFAULT_PATH, [
      '[Unreleased]: MARKER-0.0.2-dab-Swegg',
      '[0.0.2]: MARKER-0.0.1-dab-0.0.2-dab'
    ]);
  });
});
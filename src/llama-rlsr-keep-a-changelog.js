const ChangelogUpdater = require('./ChangelogUpdater');
const DiffUpdater = require('./DiffUpdater');

function wrapFunction(func) {
  return (config) => {
    return (versionMetadata, done) => {
      return func(versionMetadata, config, done);
    };
  };
}

module.exports = {
  updateChangelog: wrapFunction(ChangelogUpdater.update),
  updateDiff: wrapFunction(DiffUpdater.update)
};
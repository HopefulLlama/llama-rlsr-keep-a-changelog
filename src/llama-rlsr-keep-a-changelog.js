const ChangelogUpdater = require('./ChangelogUpdater');
const DiffUpdater = require('./DiffUpdater');

function wrapFunction(func) {
  return (config) => {
    return (newVersion) => {
      return func(newVersion, config);
    };
  };
}

module.exports = {
  updateChangelog: wrapFunction(ChangelogUpdater.update),
  updateDiff: wrapFunction(DiffUpdater.update)
};
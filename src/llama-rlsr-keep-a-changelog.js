const ChangelogUpdater = require('./ChangelogUpdater');
const DiffUpdater = require('./DiffUpdater');

module.exports = {
	updateChangelog: (config) => {
		return (newVersion) => {
			return ChangelogUpdater.update(newVersion, config);
		};
	},
	updateDiff: (config) => {
		return (newVersion) => {
			return DiffUpdater.update(newVersion, config);
		}
	}
};
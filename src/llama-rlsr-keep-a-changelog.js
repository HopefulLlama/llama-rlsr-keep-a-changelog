const ChangelogUpdater = require('./ChangelogUpdater');

module.exports = {
	update: (config) => {
		return (newVersion) => {
			return ChangelogUpdater.update(newVersion, config);
		};
	}
};
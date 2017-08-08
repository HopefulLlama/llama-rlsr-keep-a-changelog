const merge = require('merge');

const Util = require('./Util');

const DEFAULT = {
	tag: {
		prefix: '',
		suffix: ''
	},
	path: './CHANGELOG.md'
};

function updateDiffLinks(changelog, urlGenerator, oldVersion, newVersion, latest, tagPrefix, tagSuffix) {
  let lines = changelog.split('\n');
  let index = Util.getIndexByRegex(lines, /\[Unreleased\]: /);

  lines.splice(index + 1, 0, `[${newVersion}]: ${urlGenerator(tagPrefix + oldVersion + tagSuffix, tagPrefix + newVersion + tagSuffix)}`);
  lines.splice(index, 1, `[Unreleased]: ${urlGenerator(tagPrefix + newVersion + tagSuffix, latest)}`);

  return lines.join('\n');
}

function update(versionMetadata, config) {
  config = merge(DEFAULT, config);
  Util.updateFile(config.path, (changelog) => {
    return updateDiffLinks(changelog, 
      config.urlGenerator, 
      versionMetadata.oldVersion, 
      versionMetadata.newVersion, 
      config.latest,
      config.tag.prefix,
      config.tag.suffix
    );
  });
}

module.exports = {
  update
};
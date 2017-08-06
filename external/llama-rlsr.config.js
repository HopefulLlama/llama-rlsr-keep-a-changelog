const KeepAChangelog = require('../src/llama-rlsr-keep-a-changelog');

module.exports = [
  KeepAChangelog.updateChangelog({
    path: '../CHANGELOG.md',
    placeholder: '- Nothing yet'
  }),
  KeepAChangelog.updateDiff({
    urlGenerator: (oldVersion, newVersion) => {
      return `https://github.com/HopefulLlama/llama-rlsr-keep-a-changelog/compare/${oldVersion}...${newVersion}`;
    },
    path: '../CHANGELOG.md',
    latest: 'HEAD',
    tag: {
    	prefix: 'v'
    }
  })
];
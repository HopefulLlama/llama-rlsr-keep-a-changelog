const KeepAChangelog = require('../src/llama-rlsr-keep-a-changelog');

module.exports = [
  KeepAChangelog.update({
    urlGenerator: (oldVersion, newVersion) => {
      return `https://github.com/HopefulLlama/llama-rlsr-keep-a-changelog/compare/${oldVersion}...v${newVersion}`;
    },
    path: '../CHANGELOG.md',
    placeholder: '- Nothing yet',
    latest: 'HEAD'
  })
];
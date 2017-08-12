const leftPad = require('left-pad');
const merge = require('merge');

const Util = require('./Util');

const DEFAULT = {
	placeholder: '',
	path: './CHANGELOG.md'
};

function generateDate(date) {
  let year = date.getFullYear().toString();
  let month = leftPad((date.getMonth() + 1).toString(), 2, '0');
  let day = leftPad(date.getDate().toString(), 2, '0');

  return `${year}-${month}-${day}`;
}

function generateChanges(newVersion, placeholder) {
  let date = new Date(Date.now());

  // Insert in reverse order so we can maintain the index
  let insertions = [];

  if(placeholder !== undefined) {
    insertions.push(placeholder);
  }

  return insertions.concat([
    '',
    `## [${newVersion}] ${generateDate(date)}`
  ])
  .reverse();
}

function insertChanges(changelog, newVersion, placeholder) {
  let lines = changelog.split('\n');
  let index = Util.getIndexByRegex(lines, /## \[Unreleased\]/) + 1;
  generateChanges(newVersion, placeholder).forEach((line) => {
    lines.splice(index, 0, line);
  });

  return lines.join('\n');
}

function update(versionMetadata, config) {
  config = merge(true, DEFAULT, config);
  Util.updateFile(config.path, (changelog) => {
    return insertChanges(changelog, versionMetadata.newVersion, config.placeholder);
  });
}

module.exports = {
  update
};
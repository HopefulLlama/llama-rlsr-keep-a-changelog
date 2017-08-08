const merge = require('merge');

const Util = require('./Util');

const DEFAULT = {
	placeholder: '',
	path: './CHANGELOG.md'
};

function generateDate(date) {
  let year = date.getFullYear().toString();
  let month = date.getMonth().toString();
  let day = date.getDate().toString();

  if(month.length === 1) {
    month = '0' + month;
  }

  if(day.length === 1) {
    day = '0' + day;
  }

  return `${year}-${month}-${day}`;
}

function generateChanges(newVersion, placeholder) {
  let date = new Date();

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
  config = merge(DEFAULT, config);
  Util.updateFile(config.path, (changelog) => {
    return insertChanges(changelog, versionMetadata.newVersion, config.placeholder);
  });
}

module.exports = {
  update
};
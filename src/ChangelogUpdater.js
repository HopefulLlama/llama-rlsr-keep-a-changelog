const fs = require('fs');

function generateChanges(newVersion, placeholder) {
  let date = new Date();

  // Insert in reverse order so we can maintain the index
  let insertions = [];

  if(placeholder !== undefined) {
    insertions.push(placeholder);
  }

  return insertions.concat([
    '',
    `## [${newVersion}] ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  ])
  .reverse();
}

function getIndexByRegex(array, regex) {
  let index = -1;
  array.forEach((element, i) => {
    if(element.match(regex)) {
      index = i;
    }
  });
  return index;
}

function insertChanges(changelog, newVersion, placeholder) {
  let lines = changelog.split('\n');
  let index = getIndexByRegex(lines, /## \[Unreleased\]/) + 1;
  generateChanges(newVersion, placeholder).forEach((line) => {
    lines.splice(index, 0, line);
  });

  return lines.join('\n');
}

function updateDiffLinks(changelog, urlGenerator, oldVersion, newVersion, latest) {
  let lines = changelog.split('\n');
  let index = getIndexByRegex(lines, /\[Unreleased\]: /);

  lines.splice(index + 1, 0, `[${newVersion}]: ${urlGenerator(oldVersion, newVersion)}`);
  lines.splice(index, 1, `[Unreleased]: ${urlGenerator(newVersion, latest)}`);

  return lines.join('\n');
}

function update(versionMetadata, config) {
  let changelog = fs.readFileSync(config.path).toString();
  changelog = insertChanges(changelog, versionMetadata.newVersion, config.placeholder);
  changelog = updateDiffLinks(changelog, config.urlGenerator, versionMetadata.oldVersion, versionMetadata.newVersion, config.latest);
  fs.writeFileSync(config.path, changelog);
}

module.exports = {
  update
};
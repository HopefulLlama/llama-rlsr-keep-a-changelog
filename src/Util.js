const fs = require('fs');

function getIndexByRegex(array, regex) {
  let index = -1;
  array.forEach((element, i) => {
    if(element.match(regex)) {
      index = i;
    }
  });
  return index;
}

function updateFile(filePath, callbackWithChanges) {
	let contents = fs.readFileSync(filePath).toString();
	let update = callbackWithChanges(contents);
  fs.writeFileSync(filePath, update);
}

module.exports = {
	getIndexByRegex,
	updateFile
};
const fs = require('fs');
const path = require('path');

const readJSONFile = (filePath) => {
    const data = fs.readFileSync(path.join('data', '.', filePath), 'utf-8');
    return JSON.parse(data);
};

const writeJSONFile = (filePath, data) => {
    fs.writeFileSync(path.join(__dirname, '..', filePath), JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = { readJSONFile, writeJSONFile };

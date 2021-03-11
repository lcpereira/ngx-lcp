const path = require('path');
const fs = require('fs');
const replace = require('replace-in-file');

const rootPackage = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json').toString()));

replace.sync({
  files: path.resolve(__dirname, 'dist/') + '**/**/package.json',
  from: /{VERSION}/g,
  to: rootPackage.version,
});

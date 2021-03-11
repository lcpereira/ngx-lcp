#!/bin/bash

echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}">~/.npmrc
cat ~/.npmrc

cd dist/ngx-speech-recognition
npm publish --access=public

cd ../ngx-upload-file
npm publish --access=public

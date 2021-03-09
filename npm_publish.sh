#!/bin/bash

echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}">.npmrc
cd dist/ngx-speech-recognition
npm publish

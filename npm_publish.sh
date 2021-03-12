#!/bin/bash

echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}">~/.npmrc
cat ~/.npmrc

paths=('speech-recognition' 'upload-file')

npm_version=$(npm show @ngx-lcp/${paths[0]} version)
echo $npm_version

PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
echo $PACKAGE_VERSION

if [ $npm_version != $PACKAGE_VERSION ]; then
  for path in ${paths[@]}; do
    cd dist/ngx-$path
    npm publish --access=public
    cd ../../
  done
fi

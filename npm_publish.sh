#!/bin/bash

echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}">~/.npmrc

paths=('speech-recognition' 'upload-file')

npm_version=$(npm show @ngx-lcp/${paths[0]} version)
package_version=$(node -p -e "require('./package.json').version")

if [ $npm_version != $package_version ];
  then
    for path in ${paths[@]}; do
      cd dist/ngx-$path
      npm publish --access=public
      cd ../../
    done
  else
    echo 'Unpublished packages because they are in the same version'
fi

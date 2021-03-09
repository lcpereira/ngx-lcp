#!/bin/bash

echo "############# 1"
echo ${NPM_EMAIL}
echo "############# 2"
echo ${TRAVIS_REPO_SLUG} | cut -f 1 -d /
echo "############# 3"
cd dist/ngx-speech-recognition
ls

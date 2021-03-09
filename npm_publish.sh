#!/bin/bash

echo $NPM_EMAIL
echo ${TRAVIS_REPO_SLUG} | cut -f 1 -d /

cd dist/ngx-speech-recognition
ls

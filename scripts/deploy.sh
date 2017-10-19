#!/bin/bash

set -e

cd dist

git init
git config user.name "CircleCI"
git config user.email "circleci@example.com"
git add .
git commit -m "Deploying to GitHub Pages"
git push --force ${CIRCLE_REPOSITORY_URL} master:gh-pages

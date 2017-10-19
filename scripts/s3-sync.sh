#!/bin/bash

set -e

# TODO: Configure AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY following instructions at https://circleci.com/docs/2.0/deployment_integrations/#aws-deployment

# TODO: Set public ACL (and 30 day expiration?)
# aws s3 sync dist s3://fftf-staging/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}/${CIRCLE_SHA1} --delete

# TODO: Use GitHub Status API to add staging link to pull request?

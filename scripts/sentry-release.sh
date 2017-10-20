#!/bin/bash

set -e

curl https://sentry.io/api/hooks/release/builtin/187468/${SENTRY_WEBHOOK}/ \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{"version": "'`git rev-parse HEAD`'"}'

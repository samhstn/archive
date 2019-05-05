#!/usr/bin/env bash

echo "Running pre-commit hook..."

###
# Run test coverage and linter
###
echo "Running coverage"

npm run coverage

if [ $? -ne 0 ]; then
  echo "coverage exited with non 0 status. Commit aborted"
fi

npm run lint

if [ $? -ne 0 ]; then
  echo "lint checking exited with non 0 status. Commit aborted"
fi

###
# Don't allow commits to master
###
CURRENT=$(git symbolic-ref HEAD)

if [[ $CURRENT =~ .*\/master$ ]]; then
  echo "Committing to master forbidden. Commit aborted"
  exit 1
fi

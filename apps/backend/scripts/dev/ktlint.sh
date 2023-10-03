#!/usr/bin/env bash
set -euo pipefail

# Find the base commit between the current branch and main
echo "Finding base commit between main and HEAD"
BASE_COMMIT=$(git merge-base main HEAD)

# List the changed Kotlin files between the current branch and main
echo "Finding changed Kotlin files between $BASE_COMMIT and HEAD"
CHANGED_KOTLIN_FILES=$(git diff --name-only $BASE_COMMIT | grep '\.kt$')

# Exit if no Kotlin files have changed
if [ -z "$CHANGED_KOTLIN_FILES" ]
then
    echo "No changed Kotlin files to check"
    exit 0
fi
echo "Changed Kotlin files:" $CHANGED_KOTLIN_FILES

# Change to the project root directory
echo "Changing to project root directory $(dirname "$0")/../../"
pushd "$(dirname "$0")/../../" &> /dev/null

# Run ktlintCheck on the changed Kotlin files
echo "Running ktlintCheck on changed Kotlin files"
./gradlew ktlintCheck --continue

# Capture the exit status of ktlintCheck
STATUS=$?

# Return to the original directory
echo "Returning to original directory"
popd &> /dev/null

# Exit with the captured status
exit "$STATUS"

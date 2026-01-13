#!/bin/bash
# check-dependency-updates.sh: Check if published dependencies are outdated
# Usage: ./check-dependency-updates.sh <spoke-name>

set -e

SPOKE="$1"
PACKAGE="@aiready/$SPOKE"

# Get published dependencies as JSON
published_json=$(npm view "$PACKAGE" dependencies --json 2>/dev/null || echo "{}")

# Check each @aiready dependency
has_outdated=false
for dep in $(echo "$published_json" | jq -r 'keys[] | select(startswith("@aiready/"))'); do
    published_ver=$(echo "$published_json" | jq -r ".[\"$dep\"]")
    current_ver=$(npm view "$dep" version 2>/dev/null || echo "")

    if [ "$current_ver" != "$published_ver" ]; then
        echo "Dependency $dep outdated: $published_ver → $current_ver" >&2
        has_outdated=true
    fi
done

if $has_outdated; then
    echo "has_outdated_deps"
else
    echo "no_outdated_deps"
fi
#!/bin/bash

echo Preparing a new Release ...

ROOT=$(pwd)
LIB_DIR=$ROOT/packages/select-simple

pushd $LIB_DIR/
echo Patching Select-simple Package.json version ...
npm version patch --git-tag-version=false
popd

echo Patching root Package.json version and committing Release version...
git add .
npm version patch --git-tag-version=false --message "Release %s" | git commit -am "awk '{print $1}'"
git push origin --no-verify
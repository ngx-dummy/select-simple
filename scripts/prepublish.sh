#!/bin/bash

ROOT=$(pwd)
WORKING_DIR=$ROOT/dist/libs/select-simple

echo "$ROOT"
echo "$WORKING_DIR"
# WORKING_DOC_DIR=$ROOT/dist/libs/select-simple/docs

if [[ ! -e $WORKING_DIR ]]; then
    mkdir -p $WORKING_DIR
fi

echo "Building the library..."
npm run build:prod

rm -f $WORKING_DIR/README.md
echo "Copying readme, license to the library destination..."


cp -ruf $ROOT/README.md $WORKING_DIR/
cp -ruf $ROOT/LICENSE $WORKING_DIR/
# cp -ruf $ROOT/docs/ $WORKING_DOC_DIR

# cd $WORKING_DIR
# npm pack
# npm publish --access public

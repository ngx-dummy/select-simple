#!/bin/bash

echo Preparing a docs ...

ROOT=$(pwd)
DOCS_DIR=/docs

if [[ ! -e $DOCS_DIR ]]; then
    mkdir $DOCS_DIR
elif [[ ! -d $DOCS_DIR ]]; then
    echo "$DOCS_DIR already exists but is not a directory" 1>&2
fi

cp $ROOT/.nojekyll $DOCS_DIR
npm run build:docs
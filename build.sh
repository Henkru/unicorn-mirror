#!/usr/bin/env bash

BUILD_DIR="dist"

#Remove old build
rm -r $BUILD_DIR

#Install dependeciens
yarn install

#Build frontend
webpack --progress --colors

#Build backend
find backend -name "*.js" -exec sh -c 'mkdir -p $(dirname $1/$0); babel $0 -o $1/$0' "{}" $BUILD_DIR ";"
find modules -name "*.js" -exec sh -c 'mkdir -p $(dirname $1/$0); babel $0 -o $1/$0' "{}" $BUILD_DIR ";"

#Create onfig
cp "config.js" "$BUILD_DIR/config.js"
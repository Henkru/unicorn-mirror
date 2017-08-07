#!/usr/bin/env bash

BUILD_DIR="dist"

#Remove old build
rm -r $BUILD_DIR

#Install dependeciens
yarn install

#Build frontend
webpack --progress --colors

mkdir "$BUILD_DIR/client/fonts"
mkdir "$BUILD_DIR/client/css"

#Copy fonts
for file in client/fonts/*; do cp -r "$file" "$BUILD_DIR/client/fonts/" ;done
for file in modules/*/fonts/*; do cp -r "$file" "$BUILD_DIR/client/fonts/" ;done

#Copy css
for file in client/css/*.css; do cat "$file" >> "$BUILD_DIR/client/css/style.css" ;done
for file in modules/*/css/*.css; do cat "$file" >> "$BUILD_DIR/client/css/style.css" ;done

#Build backend
find backend -name "*.js" -exec sh -c 'mkdir -p $(dirname $1/$0); babel $0 -o $1/$0' "{}" $BUILD_DIR ";"
find modules -name "*.js" -exec sh -c 'mkdir -p $(dirname $1/$0); babel $0 -o $1/$0' "{}" $BUILD_DIR ";"

#Create onfig
cp "config.js" "$BUILD_DIR/config.js"
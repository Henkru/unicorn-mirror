#!/usr/bin/env bash

BUILD_DIR="dist"

#Remove old build
rm -r $BUILD_DIR

#Install dependeciens
yarn install

#Build frontend
webpack --progress --colors

mkdir "$BUILD_DIR/fonts"
mkdir "$BUILD_DIR/css"

#Copy fonts
for file in client/fonts/*; do cp -r "$file" "$BUILD_DIR/fonts/" ;done
for file in modules/*/fonts/*; do cp -r "$file" "$BUILD_DIR/fonts/" ;done

#Copy css
for file in client/css/*.css; do cat "$file" >> "$BUILD_DIR/css/style.css" ;done
for file in modules/*/css/*.css; do cat "$file" >> "$BUILD_DIR/css/style.css" ;done
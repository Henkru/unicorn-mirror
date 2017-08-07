#!/usr/bin/env bash

BUILD_DIR="dist"

#Remove old build
rm -r $BUILD_DIR

#Install dependeciens
yarn install

#Build backend and frontend
webpack --progress --colors
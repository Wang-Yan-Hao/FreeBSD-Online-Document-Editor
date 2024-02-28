#!/bin/bash

wget -r -np -nH --cut-dirs=3 -P ./tmp https://cgit.freebsd.org/doc/plain/shared/lib/

# You sholud check if there is new extension or the old extension is update

# Remove temporary directory
# rm -rf ./tmp

# Use opal-compiler to translate new *.rb files to *.js files
# node compile.js

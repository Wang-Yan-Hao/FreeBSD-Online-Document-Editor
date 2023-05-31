#!/bin/bash

# URL of the remote directory
REMOTE_URL="https://cgit.freebsd.org/doc/plain/shared/lib/"

# Local path for the directory
LOCAL_PATH="./"
LOCAL_COPY_PATH="./tmp/cgit.freebsd.org/doc/plain/shared/lib/"

# mkdir -p ./tmp
# cd ./tmp
# wget -r --no-parent "$REMOTE_URL"
# find . -type f -name "*.html" -exec rm {} +
# cd ..
# rm ./tmp/cgit.freebsd.org/robots.txt

function Iterate() {
    local LOCAL_PATH="$1"
    local LOCAL_COPY_PATH="$2"

    find "$LOCAL_COPY_PATH" -type f | while read -r file_a; do
        file_b="$LOCAL_PATH$(echo "$file_a" | cut -d '/' -f 8-)"

        if [ ! -f "$file_b" ]; then
            cp "$file_a" "$file_b"  # If file_b does not exist, copy file_a to file_b
            echo "The file '$file_b' has been created."
        elif ! cmp -s "$file_a" "$file_b"; then
            cp "$file_a" "$file_b"  # If file_a and file_b exist and are different, replace file_b with file_a
            echo "The file '$file_b' has been revised."
        fi
    done
}

Iterate "$LOCAL_PATH" "$LOCAL_COPY_PATH"

rm -rf ./tmp
# Using opal-compiler to translate new *.rb files to *.js files
node compile.js
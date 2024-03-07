#!/bin/sh

wget -r -np -nH -P ./tmp -R "index.html*" --cut-dirs=4 https://cgit.freebsd.org/doc/plain/shared/lib/

for newest_file in $(find "./tmp" -type f); do
  old_file=$(echo "$newest_file" | cut -c 7-)
  if [ -e "$old_file" ]; then
    if ! cmp -s "$old_file" "$newest_file"; then
      echo "The content of $old_file and $newest_file are different."
      echo "Please update the extension $newest_file to the newest content"
    fi
  else
    echo "There is a new extension file $newest_file"
    echo "Please get it"
  fi
done

# You sholud check if there is new extension or the old extension is update

# Remove temporary directory
rm -rf ./tmp

# The asciidoctor version of freebsd-doc use sholud see https://www.freshports.org/textproc/rubygem-asciidoctor/

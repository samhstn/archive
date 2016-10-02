#!/bin/bash

# See compile.sh for comments
# Since we cannot write files to just anywhere in heroku, we must specify the /tmp directory

for file in tags/*; do
  export dname="$(echo $file | awk -F'/' '{print $2}')"

  if [[ $dname != *"."* ]]
  then
    echo "<$dname></$dname>" > /tmp/$dname.html
    ln -s /tmp$dname.html server/views/$dname.html

    node_modules/.bin/riot tags/$dname /tmp/$dname
    ln -s tags/$dname public/tags/$dname.js
  fi
done

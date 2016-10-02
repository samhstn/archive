for file in tags/*; do
  # fname are all of the directories in ./tags
  # awk... takes everything after /. E.g. tags/home -> home
  export dname="$(echo $file | awk -F'/' '{print $2}')"

  # if $dname is directory (doesn't contains a '.' then ...)
  if [[ $dname != *"."* ]]
  then
    # write an empty riot tag to the server/views directory
    echo "<$dname></$dname>" > server/views/$dname.html

    # copmile the dirs from the tags direcory to public/tags
    node_modules/.bin/riot tags/$dname public/tags/$dname.js
  fi
done

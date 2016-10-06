#!/bin/bash
for dir in tags/*; do
  # compile the dirs from the tags direcory to public/tags
  node_modules/.bin/riot $dir public/$dir.js
done

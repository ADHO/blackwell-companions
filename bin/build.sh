#!/bin/bash

# compile scss to css
mkdir -p css;
npx node-sass --output-style compressed --omit-source-map-url scss/styles.scss > css/styles.css;

#!/bin/bash

set -e

PATH=$PATH:$PWD/node_modules/.bin

function minify_html {
	for i in *.html; do
		html-minifier --collapse-boolean-attributes --collapse-whitespace --conservative-collapse --decode-entities --html5 --minify-css --minify-js --remove-attribute-quotes --remove-comments --remove-optional-tags --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-style-link-type-attributes --remove-style-link-type-attributes --remove-tag-whitespace --sort-attributes --sort-class-name --trim-custom-fragments --use-short-doctype "$i" -o "$i".tmp
		mv "$i".tmp "$i"
	done
}

function minify_js {
	for i in *.js; do
		uglifyjs "$i" -c -m -o "$i"
	done
}

function minify_css {
	for i in *.css; do 
		cleancss -O2 -o "$i" "$i"
	done
}

rm -rf build
mkdir -p build
cd build

cp -r ../CNAME ../demos ../iframe ../widget.js .

minify_js

cd ../iframe
minify_html
minify_js
minify_css

cd images

svgo -f .

#!/bin/bash

# This is just a simple wrapper that invokes mapbox-gl-style-build
# in the yarn bin directory with the parameters we need.

set -e

rm -rf examples/ignore/build
mkdir examples/ignore/build

bin/mapbox-gl-style-build \
    --style-dir=examples/ignore/templates/styles \
    --layer-dir=examples/ignore/templates/layers \
    --out-dir=examples/ignore/build \
    --exclude=examples/ignore/templates/styles/ignore-folder/* \
    --include=examples/ignore/templates/styles/ignore-folder/ignore-style-2.js \

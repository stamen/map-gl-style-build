# Simple
rm -rf examples/simple/build
bin/map-gl-style-build \
    --style-dir=examples/simple/templates/styles \
    --layer-dir=examples/simple/templates/layers \
    --out-dir=examples/simple/build

# Nested
rm -rf examples/nested/build
bin/map-gl-style-build \
    --style-dir=examples/nested/templates/styles \
    --layer-dir=examples/nested/templates/layers \
    --out-dir=examples/nested/build

# Exclude
rm -rf examples/exclude/build
bin/map-gl-style-build \
    --style-dir=examples/exclude/templates/styles \
    --layer-dir=examples/exclude/templates/layers \
    --out-dir=examples/exclude/build \
    --exclude=examples/exclude/templates/styles/ignore-style.js \
    --exclude=examples/exclude/templates/styles/ignore-folder/*

# Shared variables
rm -rf examples/shared-variables/build
bin/map-gl-style-build \
    --style-dir=examples/shared-variables/templates/styles \
    --layer-dir=examples/shared-variables/templates/layers \
    --out-dir=examples/shared-variables/build

# Missing variable error
rm -rf examples/missing-variable-error/build
bin/map-gl-style-build \
    --style-dir=examples/missing-variable-error/templates/styles \
    --layer-dir=examples/missing-variable-error/templates/layers \
    --out-dir=examples/missing-variable-error/build


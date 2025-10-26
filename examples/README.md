# Examples

The examples contained here are meant to illustrate the functionality of the build system and aid in understanding different use cases.

Run `yarn build-examples` to build all examples. Isolate the relevant example to you in [`build-examples.sh`](./build-examples.sh) if necessary.

## Simple

A simple example of the file structure and output of the build system.

## Nested

An example of arbitrary nesting for organization reasons within the `templates` directory and replicated in the `build` directory.

## Exclude

An example of excluding specific files and folders from compilation into the `build` directory.

## Shared variables

An example of maintaining shared variables separately from the template files and merging them into `context`.

## Missing variable error

An example that should show an error on build because the compiler is missing an expected variable from `context`.

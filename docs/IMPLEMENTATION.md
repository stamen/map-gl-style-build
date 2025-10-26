# Implementation

Install:
`yarn add https://github.com/stamen/map-gl-style-build.git`

## Setting up your file structure

### Prerequisites

To reap the greatest benefit of a build system, you should address some prerequisites first:

- Decide which styles will be built
- Decide which style is the "base style"
  - "Base style" indicates the specific stylesheet that all _other_ styles will be considered variations off of
- Decide what the primary differentiators of your styles are to use for `context` in layers (can be style id if no larger grouping makes sense)
- Keep layer ids for layers with the same styling/intention consistent across styles
- Make layer styling consistent where it can be

Some of this can be addressed after setting up the file structure as well, but it's often easier to add consistency to start.

### Creating layer templates

This library contains a second bash script (`create-layer-templates`) to help turn initial stylesheets into the appropriate files/file format for use with the build system. Note that this script is only intended to be used once at the beginning of a project when implementing this system.

Based on the prerequisite decisions about primary differentiators for variants, this script can do the initial work of:

- Breaking existing JSON stylesheets out into the style template and layer JS files
- Imposing a file structure on the repo

```bash
create-layer-templates
    --in-dir=styles
    --out-dir=templates
    --base-style-path=styles/base-style.json
```

The parameters are as follows:

- `--in-dir`: the style directory containing existing variant styles to break out into template files
- `--out-dir`: the directory to build your template files to
- `--base-style-path`: the name of the style in the "in-dir" that is the base style

`--base-style-path` indicates the specific stylesheet that all _other_ styles in the directory designated as `--in-dir` will be considered variations off of.

After running the implementation script, you will see files in your project similar to those in the [`examples`](../examples/) directory here.

You may manually delete the initial styles directory unless reusing it for building the templates to. The script avoids this step as there may occasionally be reason to archive these pre-build-system styles for posterity.

Once these files are in place, you can point the build script at the appropriate directories to build as needed for your project.

### Considerations when implementing

Before running the implementation script or otherwise setting up the file structure in your repo, all style PRs should be merged and any ongoing style work should stop until the new repo structure is merged. **Once the new file structure is set up, you will no longer be able to make changes directly to style JSON or incorporate previous pending changes to a style JSON.**

After merge, style work can begin again in parallel with further changes for the build system.

Further changes to templates will be a manual process that includes:

- Continuing to make style layers consistent
- Finding common variables to use across layers

### Workflow implications of build system

After the build system is implemented, cartographers will no longer be able to make changes directly to a stylesheet. Instead all changes will be made directly to layer, variable, and style template module files. These files will have to be built into output stylesheets via a command line tool provided by this library.

This means cartographers will be unable to make direct changes in an editor like Maputnik. If an editor is used to test style changes, those changes will need to be implemented by hand afterwards.

The build system will make certain large scale changes more difficult and others less difficult than editing stylesheets directly. The inability to use an editor, needing to add new layer files, and making changes to a layer file that need to be accounted for in all of its overrides may increase friction for large style changes. The ability to make a change for all styles in one place and sharing common variables may decrease friction for other changes

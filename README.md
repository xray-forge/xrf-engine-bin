<img src="https://xray-forge.github.io/xrf-book/images/xrf-engine-bin-banner%400.5x.png">

# [XRF](https://github.com/xray-forge/xrf-engine) / CLI / BIN

Binaries and executable utilities needed for development or the game or game modification.

## Dirs:

### engines

Contains few builds of xray engine as example. <br/>
Custom builds or variants can be used here for your mod.

### package

Contains assets needed to build custom modded game package.

### profiling

Contains tools for game engine profiling.

### tools

Contains latest [xrf-tools](https://github.com/xray-forge/xrf-tools) executables.

## Updating

Update both optimized XRF CLI binaries (`xrf-cli` and `xrf-cli.exe`) from the `xrf-tools` nightly release with Node.js
18+ and Git. These use the full release profile; the `-dev` assets are not downloaded.

```sh
node tools/update.mjs
```

From the `xrf-engine` root, run `node cli/bin/tools/update.mjs`. The script downloads both binaries before replacing
them and stages the Linux binary with `git update-index --chmod=+x`, including on Windows.

## 📦 Credits

[Link.](https://xray-forge.github.io/xrf-book/CREDITS.html)

import { execFileSync } from "node:child_process";
import { chmod, mkdtemp, rename, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const directory = fileURLToPath(new URL(".", import.meta.url));
const temporary = await mkdtemp(join(directory, ".download-"));

const release = "https://github.com/xray-forge/xrf-tools/releases/download/nightly";
const binaries = ["xrf-cli", "xrf-cli.exe"];

try {
  for (const filename of binaries) {
    console.log(`Downloading ${filename}...`);
    const response = await fetch(`${release}/${filename}`, { signal: AbortSignal.timeout(120_000) });

    if (!response.ok) {
      throw new Error(`Download failed for ${filename}: HTTP ${response.status}`);
    }

    await writeFile(join(temporary, filename), Buffer.from(await response.arrayBuffer()));
  }

  await chmod(join(temporary, "xrf-cli"), 0o755);

  for (const filename of binaries) {
    await rename(join(temporary, filename), join(directory, filename));
  }

  execFileSync("git", ["update-index", "--chmod=+x", "--", "xrf-cli"], {
    cwd: directory,
    stdio: "inherit",
  });

  console.log("Updated both binaries. Git staged xrf-cli with executable permissions.");
} finally {
  await rm(temporary, { recursive: true, force: true });
}

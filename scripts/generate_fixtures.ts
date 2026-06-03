import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sampleAiVendorConcentrationWatch } from "../src/data/sampleVerticalBrief.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturesDir = path.join(root, "fixtures");
mkdirSync(fixturesDir, { recursive: true });

for (const filename of readdirSync(fixturesDir)) {
  if (filename.endsWith(".json")) {
    rmSync(path.join(fixturesDir, filename), { force: true });
  }
}

writeFileSync(
  path.join(fixturesDir, "ai-vendor-concentration-watch.json"),
  JSON.stringify(sampleAiVendorConcentrationWatch, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "ai-vendor-concentration-watch-clean.json"),
  JSON.stringify(
    sampleAiVendorConcentrationWatch.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);

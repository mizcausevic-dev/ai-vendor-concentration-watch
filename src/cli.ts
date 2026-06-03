import { readFileSync } from "node:fs";
import { analyze } from "./analyze.js";
import { formatSummary } from "./format.js";
import type { AiVendorConcentrationWatchItem } from "./types.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.error("Usage: ai-vendor-concentration-watch <input.json> [--format summary|json]");
  process.exit(1);
}

const inputPath = args[0] ?? "fixtures/ai-vendor-concentration-watch.json";
const formatArg = args.includes("--format") ? args[args.indexOf("--format") + 1] ?? "summary" : "summary";
const items = JSON.parse(readFileSync(inputPath, "utf8")) as AiVendorConcentrationWatchItem[];
const report = analyze(items);

if (formatArg === "json") {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(formatSummary(report.summary, "AI Vendor Concentration Watch"));
}

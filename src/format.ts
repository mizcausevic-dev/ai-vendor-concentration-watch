import type { AiVendorConcentrationWatchSummary } from "./types.js";

export function formatSummary(
  summary: AiVendorConcentrationWatchSummary,
  title = "AI Vendor Concentration Watch"
) {
  return [
    title,
    `Vendors tracked: ${summary.vendorsTracked}`,
    `Concentrated lanes: ${summary.concentratedLanes}`,
    `Single-vendor critical lanes: ${summary.singleVendorCriticalLanes}`,
    `Weak fallback lanes: ${summary.weakFallbackLanes}`,
    `Average concentration score: ${summary.averageConcentrationScore}`,
    `Replaceable spend: $${summary.replaceableSpendMillions}M`,
    summary.leadingMessage
  ].join("\n");
}

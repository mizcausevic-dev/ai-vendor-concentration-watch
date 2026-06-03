import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("formats the concentration summary", () => {
    const output = formatSummary({
      vendorsTracked: 6,
      concentratedLanes: 4,
      singleVendorCriticalLanes: 2,
      weakFallbackLanes: 3,
      averageConcentrationScore: 74,
      replaceableSpendMillions: 49,
      leadingMessage: "The AI supplier estate is directionally manageable."
    });

    expect(output).toContain("AI Vendor Concentration Watch");
    expect(output).toContain("Concentrated lanes: 4");
    expect(output).toContain("Replaceable spend: $49M");
  });
});

import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { sampleAiVendorConcentrationWatch } from "../src/data/sampleVerticalBrief.js";
import type { AiVendorConcentrationWatchItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleAiVendorConcentrationWatch, { now: "2026-06-02T00:00:00Z" });
    expect(report.items.length).toBe(sampleAiVendorConcentrationWatch.length);
  });

  it("counts concentrated lanes", () => {
    const report = analyze(sampleAiVendorConcentrationWatch, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.concentratedLanes).toBeGreaterThan(0);
  });

  it("counts single-vendor critical lanes", () => {
    const report = analyze(sampleAiVendorConcentrationWatch, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.singleVendorCriticalLanes).toBeGreaterThan(0);
  });

  it("sums replaceable spend", () => {
    const report = analyze(sampleAiVendorConcentrationWatch, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.replaceableSpendMillions).toBe(49);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleAiVendorConcentrationWatch, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.vendorsTracked).toBe(0);
    expect(report.summary.averageConcentrationScore).toBe(0);
    expect(report.summary.leadingMessage).toContain("directionally manageable");
  });

  it("hits low and medium branches explicitly", () => {
    const fixtures: AiVendorConcentrationWatchItem[] = [
      {
        id: "low-branch",
        lane: "Stable vendor lane",
        dimension: "PRICING_POWER",
        action: "NEGOTIATE",
        operatingCluster: "Growth systems",
        concentrationTier: "DIVERSIFIED",
        boardQuestion: "Is this lane stable enough to keep moving?",
        owner: "Chief Revenue Officer",
        audience: "Board growth committee",
        currentPosture: "Controlled.",
        concentrationNarrative: "This lane is controlled.",
        operatingReality: "Healthy.",
        riskHeadline: "Low concentration risk.",
        concentrationSignal: "Minimal dependency.",
        blockingIssue: "None",
        evidenceArtifacts: ["memo"],
        opportunityMoves: ["leave it alone"],
        relatedSurfaces: ["scorecard.kineticgain.com"],
        companyTags: ["OpenAI"],
        concentrationScore: 50,
        switchingCostScore: 48,
        contractExposureScore: 44,
        fallbackReadinessScore: 70,
        complianceDependencyScore: 32,
        platformCouplingScore: 40,
        replaceableSpendMillions: 4,
        headline: "Stable lane.",
        narrative: "Low branch test.",
        nextMove: "Keep the lane stable."
      },
      {
        id: "medium-branch",
        lane: "Pressured vendor lane",
        dimension: "MODEL_LOCK_IN",
        action: "DIVERSIFY",
        operatingCluster: "AI platform",
        concentrationTier: "WATCHLIST",
        boardQuestion: "Where is concentration visible but not yet broken?",
        owner: "Chief Product Officer",
        audience: "Board technology committee",
        currentPosture: "Watch state.",
        concentrationNarrative: "The lane is pressured.",
        operatingReality: "Some dependency.",
        riskHeadline: "Moderate concentration risk.",
        concentrationSignal: "Fallback is thin.",
        blockingIssue: "Provider-specific paths",
        evidenceArtifacts: ["control audit"],
        opportunityMoves: ["add a second provider"],
        relatedSurfaces: ["replacement.kineticgain.com"],
        companyTags: ["Anthropic"],
        concentrationScore: 70,
        switchingCostScore: 68,
        contractExposureScore: 62,
        fallbackReadinessScore: 42,
        complianceDependencyScore: 54,
        platformCouplingScore: 63,
        replaceableSpendMillions: 7,
        headline: "Pressured lane.",
        narrative: "Medium branch test.",
        nextMove: "Add a second provider."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-02T00:00:00Z" });
    expect(report.items[0].concentrationAssessment.severity).toBe("LOW");
    expect(report.items[0].switchingAssessment.severity).toBe("LOW");
    expect(report.items[1].concentrationAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].switchingAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].contractAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].fallbackAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].complianceAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].couplingAssessment.severity).toBe("MEDIUM");
    expect(report.summary.leadingMessage).toContain("directionally manageable");
  });

  it("exports through toExport", () => {
    const report = toExport(sampleAiVendorConcentrationWatch, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.vendorsTracked).toBe(sampleAiVendorConcentrationWatch.length);
  });
});

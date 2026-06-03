import { analyze } from "../analyze.js";
import { sampleAiVendorConcentrationWatch } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleAiVendorConcentrationWatch, { now: "2026-06-02T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Diversify the foundation-model layer, ring-fence bundled cloud AI renewals, port compliance evidence off vendor-specific shapes, reduce data-egress friction, and negotiate growth workflows with a visible fallback story before the next board cycle."
  };
}

export function vendorRegister() {
  return sampleAiVendorConcentrationWatch.map((item) => ({
    lane: item.lane,
    operatingCluster: item.operatingCluster,
    concentrationTier: item.concentrationTier,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    concentrationNarrative: item.concentrationNarrative,
    concentrationScore: item.concentrationScore,
    nextMove: item.nextMove
  }));
}

export function concentrationTiers() {
  return sampleAiVendorConcentrationWatch.map((item) => ({
    lane: item.lane,
    concentrationTier: item.concentrationTier,
    dimension: item.dimension,
    riskHeadline: item.riskHeadline,
    concentrationSignal: item.concentrationSignal,
    blockingIssue: item.blockingIssue,
    evidenceArtifacts: item.evidenceArtifacts,
    concentrationScore: item.concentrationScore,
    switchingCostScore: item.switchingCostScore,
    contractExposureScore: item.contractExposureScore,
    fallbackReadinessScore: item.fallbackReadinessScore,
    complianceDependencyScore: item.complianceDependencyScore,
    platformCouplingScore: item.platformCouplingScore
  }));
}

export function mitigationPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeRiskScore: item.compositeRiskScore,
    owner: item.owner,
    replaceableSpendMillions: item.replaceableSpendMillions,
    nextMove: item.nextMove
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    dimension: item.dimension,
    compositeRiskScore: item.compositeRiskScore,
    replaceableSpendMillions: item.replaceableSpendMillions,
    concentrationScore: item.concentrationScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic AI vendor concentration data only - no live invoices, procurement records, legal contracts, or private vendor performance logs are included.",
    "Scores are modeled to show how Kinetic Gain can expose supplier concentration, switching friction, pricing leverage, fallback weakness, and compliance dependency in one board-readable surface.",
    "All routes are read-only and demonstrate executive supplier-risk diagnosis, not procurement advice, legal guidance, or live vendor-selection instructions."
  ];
}

export function payload() {
  return {
    report,
    vendorRegister: vendorRegister(),
    concentrationTiers: concentrationTiers(),
    mitigationPosture: mitigationPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleAiVendorConcentrationWatch
  };
}

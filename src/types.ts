export type AiVendorConcentrationDimension =
  | "MODEL_LOCK_IN"
  | "DATA_EGRESS"
  | "PRICING_POWER"
  | "MULTI_VENDOR_GAP"
  | "COMPLIANCE_DEPENDENCY"
  | "INTEGRATION_DEPTH";

export type AiVendorConcentrationAction =
  | "DIVERSIFY"
  | "NEGOTIATE"
  | "RING_FENCE"
  | "PORT"
  | "CONTAIN"
  | "ESCALATE";

export type AiVendorConcentrationSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface AiVendorConcentrationWatchItem {
  id: string;
  lane: string;
  dimension: AiVendorConcentrationDimension;
  action: AiVendorConcentrationAction;
  operatingCluster: string;
  concentrationTier: "DIVERSIFIED" | "WATCHLIST" | "CONCENTRATED" | "LOCKED_IN";
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  concentrationNarrative: string;
  operatingReality: string;
  riskHeadline: string;
  concentrationSignal: string;
  blockingIssue: string;
  evidenceArtifacts: string[];
  opportunityMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  concentrationScore: number;
  switchingCostScore: number;
  contractExposureScore: number;
  fallbackReadinessScore: number;
  complianceDependencyScore: number;
  platformCouplingScore: number;
  replaceableSpendMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface AiVendorConcentrationAssessment {
  severity: AiVendorConcentrationSeverity;
  ok: boolean;
  message: string;
}

export interface AiVendorConcentrationWatchReportItem extends AiVendorConcentrationWatchItem {
  concentrationAssessment: AiVendorConcentrationAssessment;
  switchingAssessment: AiVendorConcentrationAssessment;
  contractAssessment: AiVendorConcentrationAssessment;
  fallbackAssessment: AiVendorConcentrationAssessment;
  complianceAssessment: AiVendorConcentrationAssessment;
  couplingAssessment: AiVendorConcentrationAssessment;
  compositeRiskScore: number;
}

export interface AiVendorConcentrationWatchSummary {
  vendorsTracked: number;
  concentratedLanes: number;
  singleVendorCriticalLanes: number;
  weakFallbackLanes: number;
  averageConcentrationScore: number;
  replaceableSpendMillions: number;
  leadingMessage: string;
}

export interface AiVendorConcentrationWatchExport {
  generatedAt: string;
  summary: AiVendorConcentrationWatchSummary;
  items: AiVendorConcentrationWatchReportItem[];
}

export interface AiVendorConcentrationWatchPayload {
  report: AiVendorConcentrationWatchExport;
  vendorRegister: ReturnType<typeof import("./services/verticalBriefService.js").vendorRegister>;
  concentrationTiers: ReturnType<typeof import("./services/verticalBriefService.js").concentrationTiers>;
  mitigationPosture: ReturnType<typeof import("./services/verticalBriefService.js").mitigationPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: AiVendorConcentrationWatchItem[];
}

import type {
  AiVendorConcentrationAssessment,
  AiVendorConcentrationSeverity,
  AiVendorConcentrationWatchExport,
  AiVendorConcentrationWatchItem,
  AiVendorConcentrationWatchReportItem
} from "./types.js";

function assessHigh(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): AiVendorConcentrationAssessment {
  let severity: AiVendorConcentrationSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: AiVendorConcentrationWatchItem[],
  options: { now?: string } = {}
): AiVendorConcentrationWatchExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: AiVendorConcentrationWatchReportItem[] = items.map((item) => {
    const concentrationAssessment = assessHigh(
      item.concentrationScore,
      58,
      74,
      "Vendor concentration is contained enough in this lane.",
      "Vendor concentration is visible and should be diversified before the next review cycle.",
      "Vendor concentration is high enough to distort the board and investor dependency story."
    );

    const switchingAssessment = assessHigh(
      item.switchingCostScore,
      52,
      70,
      "Switching cost is manageable enough in this lane.",
      "Switching cost is rising and should be reduced with cleaner fallback paths.",
      "Switching cost is high enough to weaken negotiating leverage materially."
    );

    const contractAssessment = assessHigh(
      item.contractExposureScore,
      48,
      66,
      "Contract exposure is controlled enough in this lane.",
      "Contract exposure is visible and should be negotiated harder.",
      "Contract exposure is high enough to give one supplier too much pricing power."
    );

    const fallbackAssessment = assessHigh(
      100 - item.fallbackReadinessScore,
      44,
      62,
      "Fallback readiness is strong enough in this lane.",
      "Fallback readiness is uneven and should be strengthened.",
      "Fallback readiness is weak enough to make concentration risk materially worse."
    );

    const complianceAssessment = assessHigh(
      item.complianceDependencyScore,
      46,
      64,
      "Compliance dependency is contained enough in this lane.",
      "Compliance dependency is visible and should be made more portable.",
      "Compliance dependency is high enough to trap evidence and audit posture in one vendor stack."
    );

    const couplingAssessment = assessHigh(
      item.platformCouplingScore,
      50,
      68,
      "Platform coupling is narrow enough in this lane.",
      "Platform coupling is rising and should be ring-fenced.",
      "Platform coupling is high enough to make supplier exit or repricing materially harder."
    );

    const compositeRiskScore =
      Math.round(
        ((item.concentrationScore +
          item.switchingCostScore +
          item.contractExposureScore +
          (100 - item.fallbackReadinessScore) +
          item.complianceDependencyScore +
          item.platformCouplingScore) /
          6) *
          10
      ) / 10;

    return {
      ...item,
      concentrationAssessment,
      switchingAssessment,
      contractAssessment,
      fallbackAssessment,
      complianceAssessment,
      couplingAssessment,
      compositeRiskScore
    };
  });

  const concentratedLanes = reportItems.filter((item) => item.concentrationAssessment.severity !== "LOW").length;
  const singleVendorCriticalLanes = reportItems.filter(
    (item) => item.concentrationTier === "LOCKED_IN" || item.contractAssessment.severity === "HIGH"
  ).length;
  const weakFallbackLanes = reportItems.filter((item) => item.fallbackAssessment.severity !== "LOW").length;
  const averageConcentrationScore =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.concentrationScore, 0) / reportItems.length) * 10) / 10;
  const replaceableSpendMillions = reportItems.reduce((sum, item) => sum + item.replaceableSpendMillions, 0);

  const leadingMessage =
    singleVendorCriticalLanes >= 2
      ? "AI supplier diversification is not keeping pace with concentration in the highest-value lanes."
      : weakFallbackLanes >= 3
        ? "Fallback readiness is still too thin across too many AI vendor relationships."
        : "The AI vendor estate is directionally manageable, though a few lanes still need better fallback leverage and cleaner supplier boundaries.";

  return {
    generatedAt,
    summary: {
      vendorsTracked: reportItems.length,
      concentratedLanes,
      singleVendorCriticalLanes,
      weakFallbackLanes,
      averageConcentrationScore,
      replaceableSpendMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: AiVendorConcentrationWatchItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}

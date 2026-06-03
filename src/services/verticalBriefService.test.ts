import { describe, expect, it } from "vitest";
import { concentrationTiers, mitigationPosture, payload, summary, vendorRegister, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the concentration summary", () => {
    expect(summary().vendorsTracked).toBeGreaterThan(0);
  });

  it("returns the vendor register view", () => {
    expect(vendorRegister().length).toBeGreaterThan(0);
  });

  it("returns the concentration tiers view", () => {
    expect(concentrationTiers().length).toBeGreaterThan(0);
  });

  it("returns the mitigation posture view", () => {
    expect(mitigationPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.vendorsTracked).toBeGreaterThan(0);
  });
});

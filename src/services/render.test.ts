import { describe, expect, it } from "vitest";
import {
  renderConcentrationTiers,
  renderDocs,
  renderMitigationPosture,
  renderVendorOverview,
  renderVendorRegister,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderVendorOverview()).toContain("AI Vendor Concentration Watch");
  });

  it("renders the vendor register route", () => {
    expect(renderVendorRegister()).toContain("/vendor-register");
  });

  it("renders the concentration tiers route", () => {
    expect(renderConcentrationTiers()).toContain("/concentration-tiers");
  });

  it("renders the mitigation posture route", () => {
    expect(renderMitigationPosture()).toContain("/mitigation-posture");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic AI vendor concentration data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});

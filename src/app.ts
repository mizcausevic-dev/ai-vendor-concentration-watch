import express from "express";
import {
  concentrationTiers,
  mitigationPosture,
  payload,
  riskMap,
  summary,
  vendorRegister,
  verification
} from "./services/verticalBriefService.js";
import {
  renderConcentrationTiers,
  renderDocs,
  renderMitigationPosture,
  renderVendorOverview,
  renderVendorRegister,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderVendorOverview()));
  app.get("/vendor-register", (_req, res) => res.type("html").send(renderVendorRegister()));
  app.get("/concentration-tiers", (_req, res) => res.type("html").send(renderConcentrationTiers()));
  app.get("/mitigation-posture", (_req, res) => res.type("html").send(renderMitigationPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/vendor-register", (_req, res) => res.json(vendorRegister()));
  app.get("/api/concentration-tiers", (_req, res) => res.json(concentrationTiers()));
  app.get("/api/mitigation-posture", (_req, res) => res.json(mitigationPosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, () => {
    console.log(`ai-vendor-concentration-watch listening on http://127.0.0.1:${port}`);
  });
}

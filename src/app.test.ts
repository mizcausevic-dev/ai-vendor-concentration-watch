import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("ai-vendor-concentration-watch app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("AI Vendor Concentration Watch");
  });

  it("serves the vendor register route", async () => {
    const response = await request(app).get("/vendor-register");
    expect(response.status).toBe(200);
  });

  it("serves the concentration tiers route", async () => {
    const response = await request(app).get("/concentration-tiers");
    expect(response.status).toBe(200);
  });

  it("serves the mitigation posture route", async () => {
    const response = await request(app).get("/mitigation-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.vendorsTracked).toBeGreaterThan(0);
  });

  it("serves the vendor register API", async () => {
    const response = await request(app).get("/api/vendor-register");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("serves the concentration tiers API", async () => {
    const response = await request(app).get("/api/concentration-tiers");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

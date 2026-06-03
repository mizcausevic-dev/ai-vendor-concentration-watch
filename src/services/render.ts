import { concentrationTiers, mitigationPosture, payload, riskMap, summary, vendorRegister, verification } from "./verticalBriefService.js";

const productTitle = "AI Vendor Concentration Watch";
const domain = "https://vendors.kineticgain.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root { color-scheme: dark; --bg:#07111d; --panel:#0d1a2b; --border:rgba(103,224,190,.22); --text:#edf2ff; --muted:#9fb0cf; --accent:#67e0be; --accent-2:#7dc4ff; }
      * { box-sizing:border-box; }
      body { margin:0; font-family:"Segoe UI",system-ui,sans-serif; background:radial-gradient(circle at top left, rgba(125,196,255,.12), transparent 30%), linear-gradient(180deg,#050c16 0%,var(--bg) 100%); color:var(--text); }
      a { color:var(--accent-2); text-decoration:none; }
      .wrap { max-width:1180px; margin:0 auto; padding:32px 24px 64px; }
      .hero,.section { background:linear-gradient(180deg, rgba(14,28,45,.95), rgba(10,19,33,.98)); border:1px solid var(--border); border-radius:28px; padding:28px; box-shadow:0 18px 60px rgba(2,7,16,.35); }
      .hero { margin-bottom:24px; }
      .eyebrow { display:inline-block; padding:10px 16px; border-radius:999px; border:1px solid var(--border); background:rgba(103,224,190,.08); color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.28em; }
      h1,h2 { margin:18px 0 12px; font-family:Georgia,serif; line-height:.95; }
      h1 { font-size:clamp(56px,8vw,92px); max-width:980px; }
      h2 { font-size:clamp(36px,4vw,54px); }
      .lede { color:var(--muted); font-size:20px; line-height:1.6; max-width:920px; }
      .nav { display:flex; gap:10px; flex-wrap:wrap; margin-top:22px; }
      .nav a { padding:10px 14px; border:1px solid rgba(125,196,255,.18); border-radius:999px; color:var(--muted); }
      .nav a.active { color:var(--text); border-color:var(--accent); background:rgba(103,224,190,.08); }
      .metrics,.grid { display:grid; gap:18px; }
      .metrics { grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); margin-top:26px; }
      .metric,.card,.table-wrap { background:rgba(16,32,50,.76); border:1px solid rgba(125,196,255,.12); border-radius:22px; padding:18px; }
      .metric-label,.chip { color:var(--accent); text-transform:uppercase; letter-spacing:.18em; font-size:12px; }
      .metric-value { display:block; font-size:40px; font-weight:700; margin-top:10px; }
      .metric-copy { margin-top:10px; color:var(--muted); line-height:1.5; }
      .section { margin-top:24px; }
      .grid { grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); }
      .card h3 { margin:12px 0 10px; font-size:30px; line-height:1.05; }
      .card p,li { color:var(--muted); line-height:1.6; }
      .table-wrap { overflow-x:auto; }
      table { width:100%; border-collapse:collapse; }
      th,td { text-align:left; padding:12px; border-bottom:1px solid rgba(125,196,255,.12); vertical-align:top; }
      th { color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.18em; }
      ul { padding-left:20px; }
      pre { white-space:pre-wrap; overflow-wrap:anywhere; color:var(--muted); background:rgba(7,17,29,.75); border:1px solid rgba(125,196,255,.12); border-radius:18px; padding:18px; }
      .footer { margin-top:24px; color:var(--muted); font-size:14px; display:flex; gap:18px; flex-wrap:wrap; }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/vendor-register", "Vendor register"],
    ["/concentration-tiers", "Concentration tiers"],
    ["/mitigation-posture", "Mitigation posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => `<a${href === path ? ' class="active"' : ""} href="${href}">${label}</a>`)
    .join("");
}

export function renderVendorOverview() {
  const executiveSummary = summary();
  const lanes = vendorRegister().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map((item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.operatingCluster)}</h3>
        <p><strong>Tier:</strong> ${escapeHtml(item.concentrationTier)}</p>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Narrative:</strong> ${escapeHtml(item.concentrationNarrative)}</p>
        <p><strong>Concentration score:</strong> ${item.concentrationScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`)
    .join("");
  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · risk ${item.compositeRiskScore} · concentration ${item.concentrationScore} · $${item.replaceableSpendMillions}M replaceable</li>`
    )
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">AI supplier risk</span>
      <h1>Where is one AI vendor quietly becoming too powerful in the board story?</h1>
      <p class="lede">AI Vendor Concentration Watch turns provider dependency, switching friction, contract leverage, and fallback weakness into one reusable board-facing supplier-risk surface.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Vendors tracked</span><span class="metric-value">${executiveSummary.vendorsTracked}</span><div class="metric-copy">Modeled AI supplier lanes in the current portfolio view.</div></div>
        <div class="metric"><span class="metric-label">Concentrated lanes</span><span class="metric-value">${executiveSummary.concentratedLanes}</span><div class="metric-copy">Lanes where supplier dependence is already board-visible.</div></div>
        <div class="metric"><span class="metric-label">Critical single-vendor lanes</span><span class="metric-value">${executiveSummary.singleVendorCriticalLanes}</span><div class="metric-copy">Lanes that need fallback or negotiating leverage before the next review cycle.</div></div>
        <div class="metric"><span class="metric-label">Replaceable spend</span><span class="metric-value">$${executiveSummary.replaceableSpendMillions}M</span><div class="metric-copy">Modeled spend tied to concentration-heavy AI supplier choices.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Vendor register</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible concentration pressure</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready surface for exposing AI vendor concentration, switching friction, contract leverage, and fallback weakness."
  );
}

export function renderVendorRegister() {
  const rows = vendorRegister()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.operatingCluster)}</td><td>${escapeHtml(item.concentrationTier)}</td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.audience)}</td><td>${escapeHtml(item.action)}</td><td>${escapeHtml(item.concentrationNarrative)}</td><td>${item.concentrationScore}</td></tr>`
    )
    .join("");
  return shell(
    "Vendor register",
    "/vendor-register",
    `<section class="hero"><span class="eyebrow">Vendor register</span><h1>Each lane keeps one owner, one concentration tier, one board audience, and one mitigation move attached.</h1><p class="lede">The vendor register keeps the concentration story tied to the exact lane where AI supplier dependence is still weakening leverage.</p><div class="nav">${navLinks("/vendor-register")}</div></section><section class="section table-wrap"><table><thead><tr><th>Operating cluster</th><th>Tier</th><th>Owner</th><th>Audience</th><th>Action</th><th>Concentration narrative</th><th>Score</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Vendor-register view showing which lanes deserve AI supplier diversification or containment before the next board cycle."
  );
}

export function renderConcentrationTiers() {
  const rows = concentrationTiers()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.concentrationTier)}</td><td>${escapeHtml(item.dimension)}</td><td>${escapeHtml(item.riskHeadline)}</td><td>${escapeHtml(item.concentrationSignal)}</td><td>${escapeHtml(item.blockingIssue)}</td><td>${item.concentrationScore}</td><td>${item.switchingCostScore}</td><td>${item.contractExposureScore}</td><td>${item.fallbackReadinessScore}</td><td>${item.complianceDependencyScore}</td><td>${item.platformCouplingScore}</td></tr>`
    )
    .join("");
  return shell(
    "Concentration tiers",
    "/concentration-tiers",
    `<section class="hero"><span class="eyebrow">Concentration tiers</span><h1>The real supplier pressure stays visible: is it model lock-in, pricing power, egress friction, compliance dependency, or platform coupling?</h1><p class="lede">This view keeps each lane tied to the dominant AI supplier weakness so leadership can reduce the right dependency first.</p><div class="nav">${navLinks("/concentration-tiers")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Tier</th><th>Dimension</th><th>Risk headline</th><th>Concentration signal</th><th>Blocking issue</th><th>Concentration</th><th>Switching cost</th><th>Contract exposure</th><th>Fallback readiness</th><th>Compliance dependency</th><th>Platform coupling</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Concentration-tier view showing which AI supplier failure mode is strongest in each lane."
  );
}

export function renderMitigationPosture() {
  const rows = mitigationPosture()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.action)}</td><td>${item.compositeRiskScore}</td><td>${escapeHtml(item.owner)}</td><td>$${item.replaceableSpendMillions}M</td><td>${escapeHtml(item.nextMove)}</td></tr>`
    )
    .join("");
  return shell(
    "Mitigation posture",
    "/mitigation-posture",
    `<section class="hero"><span class="eyebrow">Mitigation posture</span><h1>Vendor-risk decisions stay tied to one owner, one spend signal, and one next operating move.</h1><p class="lede">This posture makes it clear where to diversify, negotiate, ring-fence, port, contain, or escalate before the next review cycle.</p><div class="nav">${navLinks("/mitigation-posture")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Action</th><th>Risk score</th><th>Owner</th><th>Replaceable spend</th><th>Next move</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Mitigation-posture view for sequencing AI vendor concentration cleanup and fallback leverage."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `<section class="hero"><span class="eyebrow">Verification</span><h1>How this AI supplier surface is modeled and what it is safe to infer from it.</h1><p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone treats the sample like live procurement or legal guidance.</p><div class="nav">${navLinks("/verification")}</div></section><section class="section"><ul>${notes}</ul><pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre></section>`,
    "Verification notes for the AI Vendor Concentration Watch sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero"><span class="eyebrow">Docs</span><h1>AI Vendor Concentration Watch docs</h1><p class="lede">This surface packages supplier dependency, switching pressure, contract leverage, fallback readiness, and compliance portability into reproducible routes and JSON outputs for board and executive reviews.</p><div class="nav">${navLinks("/docs")}</div></section><section class="section"><ul><li><code>/vendor-register</code> keeps tier stories, owners, and next moves tied to one lane.</li><li><code>/concentration-tiers</code> compares concentration, switching friction, contract exposure, fallback readiness, compliance dependency, and platform coupling.</li><li><code>/mitigation-posture</code> sequences diversify, negotiate, ring-fence, port, contain, and escalate decisions.</li><li><code>/api/payload</code> exposes the reproducible vendor-concentration packet.</li></ul></section>`,
    "Product documentation for AI Vendor Concentration Watch and its supplier-risk routes."
  );
}

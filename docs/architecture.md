# Architecture

AI Vendor Concentration Watch is a static-friendly TypeScript executive-intelligence surface for exposing supplier concentration, switching friction, contract leverage, fallback weakness, and board-visible dependency risk across the broader Kinetic Gain suite.

## Routes

- `/`
- `/vendor-register`
- `/concentration-tiers`
- `/mitigation-posture`
- `/verification`
- `/docs`

## Core flow

1. `src/data/sampleVerticalBrief.ts` defines synthetic AI supplier lanes and modeled dependency pressure.
2. `src/analyze.ts` converts those signals into board-readable concentration assessments and a composite supplier-risk score.
3. `src/services/verticalBriefService.ts` exposes reusable views for summary, vendor register, concentration tiers, mitigation posture, risk map, and verification notes.
4. `src/services/render.ts` turns those views into one static-friendly executive UI.
5. `scripts/prerender.ts` writes the public HTML and JSON payloads into `dist-static/` for GitHub Pages packaging.

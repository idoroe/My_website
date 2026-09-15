# Portfolio content review

Review date: **September 15, 2026**. This record documents content sources and editorial decisions for the website refresh.

## Source of career facts

`rbc_updated_resume.pdf` is the approved career source. Its education, skills, experience, and project bullets are transcribed into `src/data/profile.ts`; contact details are stored in `src/config.ts`. The experience page and readable resume consume those shared facts. Homepage summaries and project case studies have been aligned with the same source.

The public PDF is an exact copy of the source, with the following fingerprint recorded during this review:

| File | Size | SHA-256 |
| --- | --- | --- |
| `rbc_updated_resume.pdf` | 125,367 bytes | `21320aaf4c34481761ad52c3ed86f691554c1f3054fdc49c0b5ea0676d7a5d70` |
| `public/resume.pdf` | 125,367 bytes | `21320aaf4c34481761ad52c3ed86f691554c1f3054fdc49c0b5ea0676d7a5d70` |

`RESUME_URL` in `profile.ts` versions the shared PDF URL; the source PDF itself has not been rewritten.

## Fact mapping

| Website fact | Source | Interpretation used |
| --- | --- | --- |
| Emmanuel Idoro; email; phone | Resume header | Consistent contact details, with display formatting applied to the phone number. |
| B.Sc. Software Engineering, University of Calgary, Schulich School of Engineering | Resume: Education | Software Engineering throughout; no Computer Engineering or unsupported year-of-study label. |
| September 2022–June 2028 | Resume: Education | June 2028 is expected graduation, because it is future-dated at review. |
| Data Engineer Intern, Royal Bank of Canada (RBC), Calgary, May–December 2026 | Resume: Professional Experience | Ongoing on September 15, with a scheduled December end. Old “joining” or “incoming” wording is removed; unsupported team naming is omitted. |
| Snowflake/SQL share validation; four-month stale-data issue; hourly quota automation; secrets and permissions | Resume: RBC bullets | Used for the experience entry and homepage examples, with original scope preserved. |
| AI Model Trainer, Mindrift AI, March 2025–Present, remote | Resume: Professional Experience | Current as stated by the source. |
| AI Model Trainer, Outlier AI, September 2024–August 2025, remote | Resume: Professional Experience | Past role. |
| Programming languages, frameworks, tools, and relevant coursework | Resume: Skills and Education | Lists retained without unsupported proficiency ratings. |
| FinSight, PipelineX, LabelForge | Resume: Personal Projects | Identified as personal projects, with source-supported stacks, functionality, and results. |

## Numerical claims retained from the resume

These are source-supported career and project claims. This website review did **not** independently reproduce their underlying measurements or run new project benchmarks.

| Context | Source-supported quantities |
| --- | --- |
| RBC | One data share serving stale data for four months; hourly API quota checks. |
| Mindrift | 50 Java/OOP prompts weekly; approximately 20% evaluation-accuracy improvement on similar tasks; 10–20 contributor reviews weekly on a 1–5 scale; approximately 25–35% fewer resubmissions. |
| Outlier | 20% improvement in code-suggestion accuracy on internal tests; 30% less rework; 10% more solved tasks. |
| FinSight | 50,000 synthetic transactions; one fact table and three dimension tables. |
| PipelineX | Four pipeline stages; health checks across four services; 15+ metrics; manual restart time reduced from minutes to seconds; incident diagnosis in under five minutes. |
| LabelForge | Three roles; 15+ reviewers; 30% reduction in revision requests. |

FinSight's synthetic dataset and batch processing are explicit. Anomaly explanations provide investigation context, without asserting fraud detection or formal model attribution. PipelineX's performance language is scoped to the project environment. Its recovery explanation distinguishes a health-check failure from the process exit that can trigger a Docker restart policy, consistent with [Docker's documentation](https://docs.docker.com/engine/containers/start-containers-automatically/).

## Academic reference

The user supplied the relationship: Ronnie taught Emmanuel Software Architecture and agreed to be a reference. The [University of Calgary faculty profile](https://profiles.ucalgary.ca/ronnie-de-souza-santos) independently supports:

- Full name: **Dr. Ronnie de Souza Santos**.
- Position: **Assistant Professor**.
- Affiliation: **Department of Electrical and Software Engineering, Schulich School of Engineering, University of Calgary**.
- Course: **SENG 401, Software Architecture**, listed for Winter 2024 and Winter 2025. The website does not assert which term Emmanuel attended.
- LinkedIn profile: [ronnie-santos](https://www.linkedin.com/in/ronnie-santos/), linked by the faculty profile.

The reference page describes the relationship and offers a request for an introduction through Emmanuel. It contains no invented recommendation, quotation, or assessment of Emmanuel's performance.

## Editorial continuity

- Existing project case studies and blog articles have been revised to fit the updated experience and remove stale internship framing.
- The FinSight article's published URL is preserved through the legacy mapping in `src/lib/createSlug.ts`, despite its revised title. Keep the original publication dates and record editorial updates separately.
- Screenshots should represent the actual projects. Repository links are the route to inspect the code; a live-demo link should be added only for an available demo.
- Keep ongoing-role language synchronized when the RBC internship ends or the Mindrift status changes. Update the source PDF, shared facts, homepage, and site metadata together.

## Final validation record

Completed against the production build on September 15, 2026:

- `npm run build`: 26 generated routes; successful static production build.
- TypeScript: `tsc --noEmit` passed. Astro compiler diagnostics reviewed across all 29 Astro files.
- `git diff --check`: passed.
- Desktop Chrome at 1440px and mobile emulation at 390px: all 26 routes checked, with one H1 and one main landmark per page, no missing descriptions, and no page JavaScript errors.
- Automated axe checks for WCAG 2 A/AA and WCAG 2.1 AA: no detected violations across all routes at desktop and mobile sizes. The six main pages were also checked in dark mode. These are automated checks, not a conformance certification.
- Verified 99 local URLs/assets/fragment targets. The 404 page intentionally returns HTTP 404.
- No horizontal overflow on the tested routes at 390px, or on the six main pages at 320px.
- Verified PDF response matches the source bytes; preview expands and the readable resume is included in print layout.
- Verified architecture tabs (arrows, Home, End), project filters and selected states, mobile menu and Escape, theme persistence through navigation, and theme behavior with blocked local storage.
- Verified copy-email feedback and clipboard contents. No email or reference request was sent.
- Verified navigation and all architecture guides remain available without JavaScript.
- Reviewed desktop/mobile screenshots, social preview artwork, and the existing project image set. Gallery images with distracting dummy text were omitted.
- Three project repositories returned HTTP 200 and are public. LinkedIn blocks automated fetches; the reference profile URL is corroborated by the university directory.

The supplied resume is the basis for career claims. Existing project metrics were not re-benchmarked as part of website validation.

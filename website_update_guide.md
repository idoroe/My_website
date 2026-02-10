# 🌐 WEBSITE UPDATE GUIDE — emmanuelidoro.netlify.app

## Every section, exactly what to change, with copy you can paste.

Your site nav: **Home → Projects → Experience → Blog → Resume → Contact**

I'm going through each one and telling you exactly what to put there to make the three projects (FinSight, LabelForge, PipelineX) carry across your ENTIRE site — not just the projects page.

---

---

# 1. HOME PAGE

## Current Problem
Your home page likely has generic intro text. It needs to immediately signal "this person builds real things" within 3 seconds of landing.

## What to Update

### Hero Section — Main Headline
**REPLACE** whatever generic headline you have with something that tells your story:

```
Emmanuel Idoro

Data Engineer & Full-Stack Developer

I build end-to-end systems — from data pipelines and ML models
to the production infrastructure that keeps them running.

Currently: Data Engineering Intern @ RBC Borealis
Previously: AI Model Trainer @ Mindrift AI
```

**Why this works:** It's not "passionate developer who loves coding." It's a specific identity (data engineer + full-stack) with proof (RBC, Mindrift). A hiring manager reads this in 2 seconds and knows exactly what you do.

### Featured Projects Row (if your home page has one)
Show all 3 project cards with ONE line each:

```
Featured Work

┌─────────────────────────────────────────────────────┐
│ 🔍 FinSight                                         │
│ Banking anomaly detection with explainable AI        │
│ Python · dbt · DuckDB · FastAPI · React              │
│ [View Project →]                                     │
├─────────────────────────────────────────────────────┤
│ 🏷️ LabelForge                                       │
│ AI training data annotation & review platform        │
│ React · Django · PostgreSQL · TypeScript              │
│ [View Project →]                                     │
├─────────────────────────────────────────────────────┤
│ ⚙️ PipelineX                                         │
│ Production infrastructure with CI/CD & monitoring    │
│ Docker · GitHub Actions · Prometheus · Grafana        │
│ [View Project →]                                     │
└─────────────────────────────────────────────────────┘
```

### Skills/Tech Section (if present on home)
Organize by what you've actually USED in your projects, not a random list:

```
Data Engineering     → Python, SQL, dbt, DuckDB, Snowflake, ETL Pipelines
Machine Learning     → scikit-learn, Isolation Forest, Feature Engineering, Model Serving
Full-Stack           → React, TypeScript, Django, FastAPI, PostgreSQL, REST APIs
DevOps & Infra       → Docker, GitHub Actions, Prometheus, Grafana, Trivy
```

**Every skill now maps to a real project.** If someone asks "where did you use dbt?" you point to FinSight. "Where did you use Django?" LabelForge. This is critical — skills without proof are just words.

### "About Me" Blurb (short version for home page)
```
I'm a 5th-year Computer Engineering student at the University of Calgary,
currently interning at RBC Borealis on the Enterprise Data Hub team.

My work sits at the intersection of data engineering and software development —
I've built ML pipelines that flag banking anomalies, annotation platforms
informed by my time training AI models, and production infrastructure
with self-healing monitoring.

I care about building systems that are not just functional, but observable,
testable, and ready for real users.
```

---

---

# 2. PROJECTS PAGE

## Current State
You have 3 placeholder projects with generic `post_img.webp` images:
- E-Commerce Platform (Full-Stack, React, Node.js)
- ML Sentiment Analyzer (ML, Python, TensorFlow)
- DevOps CI/CD Pipeline (DevOps, Docker, Kubernetes)

## REPLACE with these 3 — exact card content:

---

### Card 1: FinSight

**Category Tag:** `ML` `Data Engineering`
**Tech Tags:** `Python` `dbt` `DuckDB` `FastAPI` `React`
**Card Image:** Screenshot of the anomaly detail page (the one with the 3 reason bars)

**Title:** FinSight — Banking Transaction Anomaly Detection

**Description:**
An end-to-end data pipeline that transforms raw banking transactions through a dimensional model, detects anomalies using machine learning, and explains each flag with human-readable reasons. Built to understand what production financial data systems look like before my RBC Borealis internship.

**Link:** `/projects/finsight`

---

### Card 2: LabelForge

**Category Tag:** `Full-Stack`
**Tech Tags:** `React` `TypeScript` `Django` `PostgreSQL`
**Card Image:** Screenshot of the annotation UI (text displayed, label buttons, reviewer feedback visible)

**Title:** LabelForge — AI Training Data Annotation Platform

**Description:**
A multi-user annotation platform with role-based workflows, task queues, review pipelines, and quality metrics. Built from my experience as an AI model trainer at Mindrift — I wanted a better version of the tools I used every day.

**Link:** `/projects/labelforge`

---

### Card 3: PipelineX

**Category Tag:** `DevOps` `SRE`
**Tech Tags:** `Docker` `GitHub Actions` `Prometheus` `Grafana` `Trivy`
**Card Image:** Screenshot of the Grafana dashboard (5 panels with real metrics)

**Title:** PipelineX — Production Infrastructure & Observability

**Description:**
The production wrapper for FinSight — a full CI/CD pipeline, container health monitoring, Grafana dashboards, security scanning, and a live self-healing demo where the system recovers from container failures automatically.

**Link:** `/projects/pipelinex`

---

### Filter Tabs
Keep your existing filter tabs but update the labels:
- **All** (shows all 3)
- **Full-Stack** (shows LabelForge)
- **ML** (shows FinSight)
- **DevOps** (shows PipelineX)

### Page Subtitle
**REPLACE:**
```
OLD: "A collection of things I've built. Click any project for the full case study."
NEW: "Three end-to-end systems — from data pipelines to production infrastructure. Click any project for the full case study."
```

---

---

# 3. PROJECT DETAIL PAGES (Case Studies)

Each project card links to a detail page. Here's the EXACT structure for each.

---

## 3A. FinSight Case Study (`/projects/finsight`)

### Hero Section
```
Title:     FinSight
Subtitle:  Banking Transaction Anomaly Detection with Explainable AI
Tags:      Python · dbt · DuckDB · FastAPI · React · scikit-learn
Links:     [GitHub Repo] [Live Demo] [Watch Demo Video (30s)]
```

### The Story (2-3 paragraphs)
```
Before starting my data engineering internship at RBC Borealis, I wanted
to deeply understand what a production-grade financial data pipeline looks
like — not just the ML model, but the entire journey from raw data to
actionable insights.

FinSight ingests synthetic banking transactions, transforms them through
a dimensional data model using dbt, trains an Isolation Forest to detect
anomalies, and surfaces flagged transactions through an interactive
dashboard. Each anomaly comes with human-readable explanations — not
just "this is suspicious," but "this transaction is 7x this customer's
average, occurred at 2 AM, and is their first international purchase."

The goal wasn't just to build a model. It was to build the system around
the model — proper data transformations, quality tests, a serving API,
and a frontend that makes the output useful to a human analyst.
```

### Architecture Diagram
Include a Mermaid or image diagram showing:
```
Raw CSV → dbt (staging → intermediate → marts) → DuckDB → 
ML Training → Scoring → FastAPI → React Dashboard
```

### Key Technical Highlights (3-4 sections)

**Section 1: Dimensional Data Model**
```
The pipeline uses a star schema with fact_transactions at the center
and three dimension tables: dim_customer, dim_merchant, and dim_time.
This isn't just a flat CSV dump — it's modeled the way real data
warehouses work, with derived fields like customer risk tiers,
merchant categories, and time features (is_weekend, is_business_hours).

dbt handles the transformation pipeline across three layers:
staging (clean and cast), intermediate (enrich and join), and
marts (final tables ready for analytics and ML).
```

**Section 2: Anomaly Detection**
```
An Isolation Forest model trained on transaction features including
amount z-scores, transaction velocity, time-of-day patterns, and
merchant novelty. The model scores every transaction with a continuous
anomaly score, and a threshold flags the top ~3% as suspicious.
```

**Section 3: Explainability (THE HIGHLIGHT)**
```
Each flagged transaction gets a "top 3 reasons" breakdown:

• Unusual Amount — "$4,892 is 7.2x above this customer's average of $679"
• Unusual Time — "Transaction at 2:47 AM; customer typically transacts 9AM–6PM"
• International Activity — "First international transaction; no prior history"

These aren't generic labels. They're generated by comparing each
transaction's features against the customer's historical baseline,
producing specific, contextual explanations a human analyst can act on.
```

**Section 4: Dashboard**
```
The React frontend surfaces a transaction feed with anomaly highlighting,
summary statistics, and a detail view for each flagged transaction.
The anomaly detail page shows the score, top reasons (as horizontal
severity bars), and a sparkline of the customer's recent history for context.
```

### Screenshots
1. Dashboard overview (stats cards + timeline chart)
2. Transaction feed with anomalies highlighted
3. **Anomaly detail page with reason bars** (this is the hero shot)
4. dbt DAG showing the transformation pipeline

### What I'd Add Next
```
- Real-time streaming ingestion with Kafka
- Model drift detection comparing score distributions over time
- SHAP values for deeper feature attribution
- Multi-model ensemble (Isolation Forest + Autoencoder)
```

---

## 3B. LabelForge Case Study (`/projects/labelforge`)

### Hero Section
```
Title:     LabelForge
Subtitle:  AI Training Data Annotation & Review Platform
Tags:      React · TypeScript · Django · PostgreSQL · JWT Auth
Links:     [GitHub Repo] [Live Demo] [Watch Demo Video (30s)]
```

### The Story
```
I spent months as an AI model trainer at Mindrift AI, evaluating LLM
outputs and reviewing annotations across datasets. The workflow was
always the same: claim a task, annotate it, submit for review, get
feedback, iterate. But the tools we used were clunky — no quality
metrics, no clear rejection feedback, no way to see how the team
was performing.

LabelForge is the platform I wished existed. It's a multi-user
annotation system with three roles: Annotators claim and label tasks,
Reviewers approve or reject with inline comments, and Admins manage
projects and monitor quality. The dashboard tracks rejection rates,
throughput, and per-annotator performance in real time.

This isn't a theoretical exercise — it's built from real experience
with real annotation workflows.
```

### Architecture Diagram
```
React Frontend → Django REST API → PostgreSQL
     ↓                  ↓
 Auth (JWT)     Task State Machine
                (unclaimed → in_progress → submitted → approved/rejected)
```

### Key Technical Highlights

**Section 1: Role-Based Workflow**
```
Three user roles with distinct permissions and views:
- Annotators: see their task queue, claim unclaimed tasks, submit annotations
- Reviewers: see submitted tasks, approve or reject with comments
- Admins: create projects/datasets, bulk upload tasks, view all metrics

Custom Django permissions enforce these boundaries at the API level.
A task state machine prevents invalid transitions (e.g., can't approve
an unclaimed task).
```

**Section 2: Annotation Interface**
```
The core annotation UI displays the text to be labeled, a set of
label buttons defined per dataset (e.g., Positive/Negative/Neutral),
and keyboard shortcuts (1/2/3) for fast annotation. A built-in timer
tracks time spent per task. If a task was previously rejected, the
reviewer's feedback is displayed prominently so the annotator knows
exactly what to fix.
```

**Section 3: Review Pipeline**
```
Reviewers see a queue of submitted tasks with the annotator's label.
They can approve with one click or reject with a required comment
explaining why. Rejected tasks return to the annotator's queue with
the feedback attached. This mirrors the real-world review loops
I experienced at Mindrift.
```

**Section 4: Quality Dashboard**
```
The dashboard tracks:
- Completion rate and daily throughput (bar chart)
- Rejection rate across the project
- Per-annotator stats: tasks completed, rejection rate, average time
- Label distribution (donut chart)

This gives project managers immediate visibility into data quality
and annotator performance — something most annotation tools handle
poorly.
```

### Screenshots
1. Annotation UI with text, label buttons, and timer
2. Review queue with approve/reject actions
3. Rejected task showing reviewer feedback
4. **Quality dashboard with per-annotator stats** (hero shot)

### What I'd Add Next
```
- Named Entity Recognition (NER) annotation with text highlighting
- Inter-annotator agreement scoring (Cohen's Kappa)
- Real-time notifications when tasks are assigned or rejected (WebSocket)
- CSV/JSON export of completed annotations
```

---

## 3C. PipelineX Case Study (`/projects/pipelinex`)

### Hero Section
```
Title:     PipelineX
Subtitle:  Production Infrastructure, CI/CD & Observability for FinSight
Tags:      Docker · GitHub Actions · Prometheus · Grafana · Trivy
Links:     [GitHub Repo] [Watch Failure Demo (15s)]
```

### The Story
```
Most portfolio projects end at "it works on my laptop." PipelineX is
everything that comes after — the production infrastructure that
makes FinSight reliable, observable, and automatically recoverable.

It wraps the FinSight API in a full CI/CD pipeline (lint, test, build,
security scan), adds Prometheus metrics collection, and surfaces
everything through a Grafana dashboard. Docker health checks and
restart policies mean the system self-heals when containers crash.

The demo says it all: I kill the API container, the dashboard spikes
red, and 10 seconds later it's green again — automatically.
```

### Architecture Diagram
```
GitHub Push → GitHub Actions (lint → test → build → Trivy scan)
                              ↓
              Docker Compose (production)
              ┌─────────────────────────────┐
              │ FinSight API (:8000)        │
              │   └─ /health endpoint       │
              │   └─ /metrics (Prometheus)  │
              │ FinSight Frontend (:3000)   │
              │ Prometheus (:9090)          │
              │   └─ scrapes /metrics       │
              │ Grafana (:3001)             │
              │   └─ auto-loaded dashboard  │
              └─────────────────────────────┘
```

### Key Technical Highlights

**Section 1: CI/CD Pipeline**
```
Every push to main triggers a 4-stage GitHub Actions workflow:
1. Lint — ruff checks Python code quality
2. Test — pytest runs API unit tests
3. Build — Docker images built for API and frontend
4. Security Scan — Trivy scans container images for CRITICAL/HIGH vulnerabilities

The pipeline visualization in GitHub is itself a portfolio piece —
it shows a clear, professional workflow that mirrors what real
engineering teams use.
```

**Section 2: Observability Stack**
```
The FinSight API exposes a /metrics endpoint using
prometheus-fastapi-instrumentator. Prometheus scrapes these metrics
every 15 seconds. Grafana reads from Prometheus and displays
5 dashboard panels:

1. Request Rate — traffic patterns over time
2. Error Rate — spikes red when 5xx errors increase
3. P95 Latency — 95th percentile response time
4. Container Status — green (up) or red (down)
5. Request Duration Heatmap — visual density of response times

The Grafana dashboard is auto-provisioned — it loads on boot
with no manual configuration.
```

**Section 3: Self-Healing**
```
Docker health checks ping /health every 10 seconds. Combined with
restart: always in Docker Compose, crashed containers are
automatically restarted within seconds. No human intervention needed.
```

**Section 4: Failure Recovery Demo**
```
A shell script simulates a production incident:
1. Generates normal traffic (20 API requests)
2. Kills the API container (docker kill)
3. Monitors recovery attempts every 2 seconds
4. Reports when the API is healthy again (~10–15 seconds)

The Grafana dashboard captures the full story: traffic flowing,
sudden drop, error spike, recovery, metrics stabilizing. This
15-second clip is the most compelling visual in my entire portfolio.
```

### Screenshots / GIFs
1. GitHub Actions pipeline showing all 4 stages green
2. **Grafana dashboard with live metrics** (hero shot)
3. GIF/video: failure demo — kill → spike → recovery
4. Trivy scan output showing vulnerability report

### What I'd Add Next
```
- Terraform for cloud provisioning (AWS ECS)
- Kubernetes deployment manifests
- ELK stack for centralized logging
- Alerting rules with Grafana notifications (Slack/email)
- Chaos engineering with more failure scenarios
```

---

---

# 4. EXPERIENCE PAGE

## How to Connect Your Experience to Your Projects

Your experience page should NOT just list job titles and dates. Each role should subtly reference the projects where relevant. Here's the exact content:

---

### Experience Entry 1: RBC Borealis

```
Data Engineering / ML Software Engineer Intern
RBC Borealis — Enterprise Data Hub Team
May 2025 – Present

Building and maintaining enterprise data pipelines on the
Enterprise Data Hub team. Working with production-scale data
transformation, pipeline orchestration, and ML infrastructure
in a banking environment.

Related project: FinSight — built before this internship
to develop a deep understanding of dimensional modeling,
dbt transformations, and anomaly detection in financial data.
```

### Experience Entry 2: Mindrift AI

```
AI Model Trainer
Mindrift AI
[dates]

Evaluated and annotated LLM outputs across diverse datasets.
Performed quality reviews, provided structured feedback on
model responses, and maintained annotation consistency across
large-scale training datasets.

Related project: LabelForge — built an annotation and review
platform inspired by the workflows and pain points I experienced
in this role.
```

### Experience Entry 3: Outlier AI

```
AI Model Trainer
Outlier AI
[dates]

Trained and evaluated AI models through systematic data annotation
and quality assessment. Developed domain expertise in identifying
model strengths and failure patterns across different task types.
```

### Experience Entry 4: Software Developer (if applicable)

```
Software Developer
[Company / Freelance]
[dates]

[Your existing bullet points — keep these as they are]

Highlight: Optimized database queries resulting in [X]% performance
improvement — this data engineering mindset carried directly into
the dbt pipeline design in FinSight.
```

### Key Point
The "Related project" links are the secret weapon. They transform your experience page from a static resume into a portfolio narrative. Every role connects to something you built. That's the signal hiring managers notice.

---

---

# 5. BLOG PAGE

## What to Write (3 Blog Posts, One Per Project)

Your blog page is probably empty or has placeholder posts. Write these 3 posts — they don't need to be long (500–800 words each). They serve two purposes: SEO (people find you via Google) and depth (hiring managers who want to go deeper can read your thinking).

---

### Blog Post 1: FinSight

```
Title: "Building a Bank-Grade Anomaly Detection Pipeline from Scratch"
Subtitle: How I used dbt, DuckDB, and Isolation Forest to build FinSight

Topics to cover (500-800 words):
- Why I built this (preparing for RBC Borealis internship)
- The decision to use a star schema instead of flat tables
- Why dbt matters (repeatable transformations, testing, documentation)
- The explainability approach: why "top 3 reasons" beats a raw score
- One technical challenge you faced and how you solved it
- What you'd do differently next time

End with: link to the project page + GitHub repo
```

### Blog Post 2: LabelForge

```
Title: "I Trained AI Models for a Living — Then Built a Better Annotation Tool"
Subtitle: How my experience at Mindrift inspired LabelForge

Topics to cover (500-800 words):
- What it's actually like working as an AI model trainer
- The specific pain points in existing annotation workflows
- How the task state machine works (unclaimed → submitted → approved/rejected)
- Why quality metrics matter for data annotation teams
- The reviewer feedback loop and why it improves data quality
- One design decision you debated and what you chose

End with: link to the project page + GitHub repo
```

### Blog Post 3: PipelineX

```
Title: "Your App Works on Localhost. Now What?"
Subtitle: Adding CI/CD, monitoring, and self-healing to a real project

Topics to cover (500-800 words):
- Why "it works" isn't enough for production
- Setting up Prometheus + Grafana for a FastAPI app (brief tutorial)
- How Docker health checks + restart policies create self-healing
- The failure demo: what happens when you kill a container
- Why security scanning (Trivy) belongs in every CI pipeline
- What I learned about observability

End with: link to the project page + GitHub repo
```

### Blog Post Formatting Tips
- Include 1-2 code snippets per post (makes it scannable and credible)
- Include 1 screenshot per post (the hero shot from the project)
- Keep paragraphs short (3-4 sentences max)
- Write like you're explaining to a smart friend, not writing a textbook
- Total time per post: 1-2 hours if you've already built the project

---

---

# 6. RESUME PAGE

## What to Update

Your resume page should reflect the new projects. Here's what changes:

### Projects Section on Resume

```
PROJECTS

FinSight — Banking Transaction Anomaly Detection          Python, dbt, DuckDB, FastAPI, React
• Built end-to-end data pipeline: raw transactions → dbt star schema → ML scoring → React dashboard
• Trained Isolation Forest model on 50K synthetic transactions, flagging top 3% anomalies
• Implemented human-readable explainability: each flagged transaction shows top 3 deviation reasons
• Designed dimensional model (fact_transactions + 3 dimension tables) with dbt quality tests

LabelForge — AI Annotation & Review Platform              React, TypeScript, Django, PostgreSQL
• Built multi-user annotation platform with 3 roles (Annotator, Reviewer, Admin) and JWT auth
• Implemented task state machine: claim → annotate → submit → review → approve/reject workflow
• Created quality dashboard tracking rejection rates, throughput, and per-annotator performance
• Inspired by real annotation workflows from AI model training experience at Mindrift AI

PipelineX — Production Infrastructure & Observability     Docker, GitHub Actions, Prometheus, Grafana
• Designed 4-stage CI/CD pipeline: lint → test → build → Trivy security scan via GitHub Actions
• Deployed Prometheus + Grafana monitoring with auto-provisioned dashboards (5 metric panels)
• Implemented self-healing containers with Docker health checks and automatic restart policies
• Created live failure recovery demo: container kill → metrics spike → auto-recovery in ~10 seconds
```

### Skills Section on Resume
Organize to match your projects:

```
TECHNICAL SKILLS

Languages:        Python, JavaScript/TypeScript, SQL, Java, C++
Data Engineering:  dbt, DuckDB, Snowflake, ETL Pipelines, Star Schema Design
Machine Learning:  scikit-learn, Isolation Forest, Feature Engineering, Model Serving
Frontend:          React, TypeScript, TailwindCSS, Recharts
Backend:           Django REST Framework, FastAPI, Node.js/Express, PostgreSQL
DevOps:            Docker, Docker Compose, GitHub Actions, Prometheus, Grafana, Trivy
Cloud:             AWS (EC2, S3, ECS), CI/CD Pipelines
```

### Downloadable PDF
If your resume page has a downloadable PDF, make sure the PDF version also has these updated projects. This is the most commonly missed detail — people update the web page but forget the PDF download still has old content.

---

---

# 7. CONTACT PAGE

## Minor Update

Your contact page is probably fine as-is, but add one line:

```
Open to full-time opportunities in Data Engineering,
ML Engineering, and Full-Stack Development starting [your grad date].

Currently interning at RBC Borealis on the Enterprise Data Hub team.
```

This turns your contact page from passive ("here's my email") to active ("I'm available and here's my context").

---

---

# SUMMARY: What Changes Where

| Section | What Changes | Priority |
|---------|-------------|----------|
| **Home** | New headline, project cards, skills organized by project, updated about blurb | HIGH |
| **Projects** | Replace all 3 placeholders with FinSight, LabelForge, PipelineX. Real screenshots. | CRITICAL |
| **Project Details** | Add full case study pages for each project (story, architecture, screenshots, code) | CRITICAL |
| **Experience** | Add "Related project" links connecting each role to a project | MEDIUM |
| **Blog** | Write 3 posts (one per project) — 500-800 words each | MEDIUM |
| **Resume** | Update projects section + skills section + PDF download | HIGH |
| **Contact** | Add availability line | LOW |

---

# ORDER OF OPERATIONS

Don't try to update everything at once. Follow this order:

```
1. BUILD the projects first (Weeks 1-8 from the build plan)
2. Take screenshots as you build (don't wait until the end!)
3. Record the 3 demo clips
4. Update the Projects page (swap the 3 cards + write case studies)
5. Update the Resume page (new projects + skills)
6. Update the Home page (new headline, about, skills)
7. Update the Experience page (add project links)
8. Write the 3 blog posts
9. Update the Contact page
```

**The cardinal rule: don't update the website until the projects are built and you have real screenshots.** A portfolio with "coming soon" placeholders is worse than the generic one you have now. Build first, showcase second.

---

---

# IMPORTANT: Replace the Placeholder Images

Your current projects all use `/post_img.webp` — the same generic placeholder image. This is the single biggest visual problem on your site right now.

For each project, you need ONE hero screenshot:

```
FinSight:   The anomaly detail page with the 3 reason bars
LabelForge: The annotation UI with text, labels, and reviewer feedback
PipelineX:  The Grafana dashboard with all 5 panels showing live data
```

These three screenshots will do more for your portfolio than anything else. A hiring manager scrolling your projects page will see three distinct, real, impressive interfaces instead of three identical placeholder images.

**How to get great screenshots:**
1. Use your browser at 1440px width (standard laptop)
2. Make sure there's real data on screen (not empty states)
3. Crop to just the app — no browser chrome, no URL bar
4. Save as .webp or .png, optimize for web (<500KB each)
5. Replace `/post_img.webp` with `/finsight-hero.webp`, `/labelforge-hero.webp`, `/pipelinex-hero.webp`

---

*Build the projects → take screenshots → update the site. In that order. The site update itself should take one focused weekend after the projects are done.*

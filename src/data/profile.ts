// Career facts transcribed from rbc_updated_resume.pdf, reviewed September 15, 2026.
// Keep shared facts here so the homepage, experience page, and resume stay aligned.
export const EDUCATION = {
  degree: 'Bachelor of Science, Software Engineering',
  university: 'University of Calgary',
  school: 'Schulich School of Engineering',
  dates: 'September 2022 – June 2028',
  graduation: 'June 2028',
  coursework: ['Data Structures & Algorithms', 'Object-Oriented Programming (Java)', 'Software Design (C++)', 'Databases', 'Operating Systems', 'Probability & Statistics'],
};

export const EXPERIENCE = [
  {
    id: 'rbc',
    company: 'Royal Bank of Canada (RBC)',
    role: 'Data Engineer Intern',
    dates: 'May – December 2026',
    note: 'In progress · Scheduled to end December 2026',
    location: 'Calgary, AB',
    bullets: [
      'Validate internal and external Snowflake data shares using SQL, checking published views and schema mappings. Resolved a refresh issue that had left one share serving stale data for four months.',
      'Automate API quota management with a script that checks usage hourly and automatically increases quotas as usage approaches the limit to prevent quota-related service interruptions.',
      'Rotate service and application secrets and verify permissions for internal data shares, maintaining secure authentication and controlled access to enterprise data.',
    ],
    technologies: ['Snowflake', 'SQL', 'API automation', 'Access control'],
  },
  {
    id: 'mindrift',
    company: 'Mindrift AI',
    role: 'AI Model Trainer',
    dates: 'March 2025 – Present',
    note: '',
    location: 'Remote',
    bullets: [
      'Write 50 challenging Java/OOP prompts weekly, covering classes, inheritance, interfaces, and exceptions, to stress-test AI model capabilities.',
      'Edit model answers into correct, runnable Java with brief explanations and unit tests, improving evaluation accuracy by approximately 20% on similar tasks.',
      'Review 10–20 contributor tasks per week for guideline compliance on a 1–5 scale, reducing resubmissions by approximately 25–35% with targeted feedback.',
    ],
    technologies: ['Java', 'Object-oriented programming', 'Unit tests', 'Model evaluation'],
  },
  {
    id: 'outlier',
    company: 'Outlier AI',
    role: 'AI Model Trainer',
    dates: 'September 2024 – August 2025',
    note: '',
    location: 'Remote',
    bullets: [
      'Created training sets for JavaScript/React tasks that raised code-suggestion accuracy by 20% on internal tests.',
      'Partnered with quality managers to refine labeling rules and edge cases, cutting rework by 30%.',
      'Analyzed evaluation mistakes and refined data and prompts, increasing solved tasks by 10%.',
    ],
    technologies: ['JavaScript', 'React', 'Training data', 'Quality review'],
  },
];

export const SKILLS = [
  { label: 'Programming languages', items: ['Python', 'Java', 'SQL', 'C', 'C++', 'JavaScript', 'TypeScript', 'C#', 'HTML', 'CSS'] },
  { label: 'Frameworks & libraries', items: ['React', 'Django', 'FastAPI', 'Flask', 'REST APIs', 'scikit-learn'] },
  { label: 'Tools & technologies', items: ['AWS', 'Snowflake', 'Azure', 'Docker', 'Docker Compose', 'dbt', 'DuckDB', 'Git', 'GitHub', 'GitHub Actions', 'Prometheus', 'Grafana', 'Trivy', 'WebSockets', 'Figma', 'Postman', 'Microsoft Excel', 'Microsoft Teams'] },
];

export const PROJECT_SUMMARIES = [
  {
    name: 'FinSight', href: '/projects/finsight', subtitle: 'Anomaly-Detection Web API',
    stack: 'Python, FastAPI, DuckDB, dbt, scikit-learn, React, Docker',
    metric: '50K', metricLabel: 'synthetic transactions',
    bullets: [
      'Built an end-to-end anomaly-detection pipeline that ingests 50K synthetic banking transactions, transforms them through a dbt dimensional model (staging → intermediate → marts), and scores them with an Isolation Forest via FastAPI.',
      'Modeled a DuckDB star schema with a fact table and three dimension tables, dbt-managed transformations, and data quality tests, powering a React dashboard with anomaly explanations ranked by severity.',
      'Containerized the API and frontend into a Docker Compose stack with a single-command startup that runs data generation, dbt transforms, model training, and scoring automatically on first boot.',
    ],
  },
  {
    name: 'PipelineX', href: '/projects/pipelinex', subtitle: 'DevOps / SRE Layer for FinSight',
    stack: 'GitHub Actions, Docker Compose, Prometheus, Grafana, Trivy',
    metric: '15+', metricLabel: 'observability metrics',
    bullets: [
      'Automated a four-stage CI/CD pipeline (lint → tests → build → Trivy scan) that blocks merges on quality or security failures.',
      'Configured a production-style Docker Compose deployment with health checks across four services, cutting manual restart time from minutes to seconds.',
      'Provisioned Prometheus with 15+ metrics and Grafana dashboards for latency, error rates, and restarts, enabling incident diagnosis in under five minutes.',
    ],
  },
  {
    name: 'LabelForge', href: '/projects/labelforge', subtitle: 'Multi-User Annotation Platform',
    stack: 'React, TypeScript, Django REST Framework, PostgreSQL, JWT Auth, Docker',
    metric: '30%', metricLabel: 'fewer revision requests',
    bullets: [
      'Developed a full-stack annotation platform with three role-based workflows (Annotator, Reviewer, Admin) and a task state machine enforcing valid transitions at the API level (unclaimed → in-progress → submitted → approved/rejected).',
      'Created an annotation tool with customizable label buttons and keyboard shortcuts, improving usability for 15+ reviewers and decreasing revision requests by 30%.',
      'Shipped a quality dashboard with per-annotator metrics (rejection rate, average time, throughput), daily approval charts, and label-distribution breakdowns, filterable by project.',
    ],
  },
];

export const RESUME_URL = '/resume.pdf?v=rbc-2026-09';
export const RESUME_FILENAME = 'Emmanuel_Idoro_Resume.pdf';

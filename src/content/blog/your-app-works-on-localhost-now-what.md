---
title: "Your App Works on Localhost. Now What?"
description: "Adding CI/CD, Prometheus monitoring, Grafana dashboards, and self-healing containers to a real project — because 'it works on my machine' isn't a deployment strategy."
pubDate: "Feb 01 2026"
heroImage: "/post_img.webp"
tags: ["devops", "docker", "monitoring", "cicd"]
---

FinSight worked perfectly on my laptop. The API served anomaly scores, the React dashboard rendered them beautifully, and the dbt pipeline transformed data without errors. Ship it, right?

Not even close.

"It works on my machine" is the beginning of the story, not the end. What happens when the API container crashes at 3 AM? How do you know if response times are degrading? How do you verify that a new commit doesn't introduce a security vulnerability in your Docker image?

PipelineX is my answer to all of those questions. It's the production infrastructure layer around FinSight — and honestly, building it taught me more about real-world engineering than any feature I've ever coded.

## Setting Up Prometheus + Grafana for a FastAPI App

The first thing I wanted was visibility. If the API is slow, I want to see it on a graph. If errors spike, I want to see that too. Prometheus + Grafana is the industry standard for this, and it's surprisingly straightforward to set up.

Step one: expose metrics from FastAPI. I used `prometheus-fastapi-instrumentator`, which is a one-liner:

```python
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI()
Instrumentator().instrument(app).expose(app)
```

That single line adds a `/metrics` endpoint to your API that Prometheus can scrape. It automatically tracks request count, duration, and status codes — no manual instrumentation needed.

Step two: configure Prometheus to scrape those metrics. In `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: 'finsight-api'
    scrape_interval: 15s
    static_configs:
      - targets: ['api:8000']
```

Every 15 seconds, Prometheus pulls metrics from the API. It stores them in a time-series database that Grafana can query.

Step three: build the Grafana dashboard. This is where it gets visual. I created 5 panels:

1. **Request Rate** — requests per second over time
2. **Error Rate** — percentage of 5xx responses (this one turns red when things break)
3. **P95 Latency** — 95th percentile response time
4. **Container Status** — simple green/red indicator
5. **Request Duration Heatmap** — visual density showing where most response times cluster

The key decision here: auto-provisioning. I didn't want to manually configure Grafana through the UI every time I deploy. Instead, I defined the dashboard as a JSON file and configured Grafana to load it on boot:

```yaml
# docker-compose.yml excerpt
grafana:
  volumes:
    - ./grafana/provisioning:/etc/grafana/provisioning
    - ./grafana/dashboards:/var/lib/grafana/dashboards
```

Deploy the stack, open Grafana, and the dashboard is already there with all 5 panels configured. Zero clicks required.

## How Docker Health Checks Create Self-Healing

Here's a one-liner that changes everything:

```yaml
# docker-compose.yml
services:
  api:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 10s
      timeout: 5s
      retries: 3
    restart: always
```

That `healthcheck` tells Docker to ping the `/health` endpoint every 10 seconds. If it fails 3 times in a row, Docker marks the container as unhealthy. Combined with `restart: always`, Docker will automatically restart any container that enters an unhealthy state.

This is self-healing infrastructure. The API crashes? Docker restarts it. The process hangs? Health check fails, Docker restarts it. No pager. No human intervention. The system recovers on its own.

Is this as sophisticated as Kubernetes with pod autoscaling and rolling restarts? No. But for a single-host deployment, it's remarkably effective — and it's what I'd use for any side project or small-scale production service.

## The Failure Demo That Tells the Whole Story

I wrote a shell script that simulates a production incident. Here's what it does:

1. Generates 20 normal API requests (establishing a traffic baseline)
2. Runs `docker kill` on the API container
3. Monitors recovery every 2 seconds
4. Reports when the API is healthy again

The whole cycle takes about 10-15 seconds. But the real story is on the Grafana dashboard. You can watch it in real time:

- Request rate drops to zero (container is dead)
- Error rate spikes to 100% (health check failures)
- Container status goes red
- Then, 10 seconds later, everything reverses. Request rate recovers. Errors drop. Status goes green.

I recorded this as a 15-second screen capture. It's the single most compelling visual in my entire portfolio — not because the code is complex, but because it *demonstrates* something. It shows that I think about what happens after deployment, not just before.

## Why Security Scanning Belongs in Every Pipeline

The last stage of my CI/CD pipeline is a Trivy scan. Trivy checks your Docker images for known vulnerabilities — CVEs in OS packages, outdated libraries, configuration issues.

```yaml
# GitHub Actions step
- name: Security Scan
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: finsight-api:latest
    severity: CRITICAL,HIGH
    exit-code: 1
```

If Trivy finds a CRITICAL or HIGH vulnerability, the pipeline fails. The image doesn't get built. This catches things like:

- An outdated version of OpenSSL with a known exploit
- A Python package with a recently disclosed vulnerability
- A base image that hasn't been updated in months

Most developers don't think about security scanning until someone tells them to. Adding it to your CI pipeline means you think about it on every commit, automatically. It takes 30 seconds to configure and catches real issues.

## What I Learned About Observability

Before PipelineX, "monitoring" meant checking if the app was running. After PipelineX, monitoring means knowing *how* it's running — request latency trends, error rates, resource utilization, and recovery behavior.

The mental shift is from reactive ("something broke, let me investigate") to proactive ("I can see latency creeping up before it becomes a problem"). That's what observability gives you.

If you have a project running in Docker right now, I'd encourage you to add a `/health` endpoint, a Prometheus metrics exporter, and a basic Grafana dashboard. It takes an afternoon, and it transforms your project from "something that runs" to "something that's production-ready."

---

Check out the [full case study](/projects/pipelinex) or browse the [GitHub repo](https://github.com/idoroe/pipelinex).

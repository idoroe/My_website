---
title: "Your App Works on Localhost. Now What?"
description: "What PipelineX adds around FinSight: repeatable delivery checks, container health reporting, and monitoring that helps explain a failure."
pubDate: "Feb 01 2026"
updatedDate: "2026-09-15"
heroImage: "/screenshots/pipelinex-hero.webp"
tags: ["devops", "docker", "monitoring", "cicd"]
---

Once FinSight could transform data, score transactions, and display results, I wanted to understand how to operate the application. I needed a repeatable way to check changes and a way to see what was happening when something failed.

PipelineX is the personal project I built around those questions. It adds GitHub Actions, Docker Compose health checks, Trivy image scanning, and Prometheus and Grafana monitoring to FinSight.

## Build a Repeatable Delivery Workflow

The CI/CD pipeline has four stages: lint, tests, build, and scan. Ruff checks Python code, pytest runs API tests, Docker builds the images, and Trivy checks those images for vulnerabilities. Required quality and security checks block merges when they fail.

Order matters here. An image scan runs against an image that has already been built. A scan failure can stop later delivery steps; it cannot undo the build that supplied its input.

For example, this command illustrates scanning a local image and returning a failure status for high- or critical-severity findings:

```sh
trivy image --severity HIGH,CRITICAL --exit-code 1 finsight-api:latest
```

A CI job needs to respect that exit status and make subsequent steps depend on success. The [official Trivy Action documentation](https://github.com/aquasecurity/trivy-action) shows the corresponding image and failure settings for GitHub Actions.

## Separate Health from Recovery

PipelineX includes Docker Compose health checks across four services. A health check reports whether a container responds to a defined check; a restart policy controls what happens when the container's process exits.

That difference is easy to miss. In plain Docker Compose, marking a running container unhealthy does not by itself cause `restart: always` to restart it. A hung process can therefore need a different recovery mechanism from a process that has exited. Docker documents these behaviors in its [health-check reference](https://docs.docker.com/reference/dockerfile/#healthcheck) and [restart-policy guide](https://docs.docker.com/engine/containers/start-containers-automatically/).

This distinction changed how I think about failure testing. The useful question is which failure occurred, which signal revealed it, and which action restored the service.

## Choose Metrics That Answer Questions

Prometheus collects 15+ metrics, and Grafana dashboards bring latency, error rates, and restart information into one place. Dashboard configuration is provisioned with the project so the views do not need to be recreated manually.

I use different signals to answer different questions:

- **Request rate:** Is traffic reaching the application?
- **Error rate:** Are requests that reach it failing?
- **Latency:** How long are responses taking?
- **Target availability:** Can Prometheus scrape the monitored endpoint?
- **Restart information:** Has a process restarted during the investigation?

An unavailable API does not necessarily report an HTTP 500 response. It may return no response at all. Prometheus exposes an `up` metric for scrape success, which helps separate target availability from the application's own response metrics. [Prometheus documents `up` and other generated series here](https://prometheus.io/docs/concepts/jobs_instances/).

## Use Recovery as a Learning Exercise

The project reduced manual restart time from minutes to seconds and enabled incident diagnosis in under five minutes in the project environment. The value of the dashboards is that they help connect an observed symptom to a useful next action.

A good recovery exercise should record the failure mode, the signals observed, the intervention, and how recovery was confirmed. Repeating that process across a process exit, an unresponsive endpoint, and a dependency failure would give a more complete picture than one successful restart.

## What Comes Next

Centralized logs and alerting with documented response steps would make the next investigation easier. Additional failure scenarios would help test the recovery assumptions, while cloud provisioning would extend the repeatable setup beyond a local host.

PipelineX made operational concerns part of the application design. The work is easier to assess when delivery checks are explicit and the system provides enough evidence to understand its behavior.

Explore the [PipelineX case study](/projects/pipelinex) or the [source code on GitHub](https://github.com/idoroe/PipelineX).

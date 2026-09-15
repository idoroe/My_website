---
title: "Building an Explainable Anomaly Detection Pipeline from Scratch"
description: "The design decisions behind FinSight: a dbt dimensional model, data quality checks, and readable context for anomaly scores across 50,000 synthetic transactions."
pubDate: "Feb 08 2026"
updatedDate: "2026-09-15"
heroImage: "/screenshots/finsight-hero.webp"
tags: ["data-engineering", "machine-learning", "dbt", "python"]
---

FinSight started with a question: what has to happen between a raw transaction record and a useful anomaly alert?

I built the project around 50,000 synthetic banking transactions so I could work through that whole path. Python generates the data, dbt transforms it in DuckDB, an Isolation Forest scores it, and FastAPI serves the results to a React dashboard. Each stage has to preserve enough context for the next one to make sense.

## Choosing a Dimensional Model

A single wide table would have been a reasonable starting point for a small experiment. I chose a star schema to practice separating transaction events from the attributes used to describe them.

`fact_transactions` sits at the center, with `dim_customer`, `dim_merchant`, and `dim_time` supplying customer, merchant, and time context. That gives the application a consistent vocabulary for both analytics and feature preparation.

The benefit in this project is clarity. I can trace a dashboard field back to a transformation and then to its source. A star schema does not automatically make every query faster; the queries, storage engine, and actual execution plans still matter.

## Making Transformations Inspectable

I organized the dbt project into three layers:

- **Staging:** Clean records and establish consistent field types.
- **Intermediate:** Join related data and calculate derived features.
- **Marts:** Publish the tables used by analytics and the model.

Data quality tests make assumptions about those tables explicit. For example, this illustrative singular test identifies transactions with a missing customer key:

```sql
select transaction_id
from {{ ref('fact_transactions') }}
where customer_key is null
```

A dbt test fails when it returns rows at error severity. Running `dbt build` can then skip dependent downstream resources after a test failure, according to the dependency graph and test configuration. This is a useful foundation for a quality gate; the surrounding pipeline also needs to respect the command's exit status. [dbt's build documentation](https://docs.getdbt.com/reference/commands/build) explains that behavior.

## Giving Scores Useful Context

An anomaly score is a starting point for investigation. The dashboard also needs to show what is unusual about the transaction.

FinSight presents explanations ranked by severity, using transaction features and customer context. A reviewer might see that an amount is much larger than the customer's baseline, that the timing is unusual, or that an activity pattern is unfamiliar.

Those feature comparisons help someone inspect the record. They should not be read as proof of fraud or as a formal explanation of exactly how the Isolation Forest reached its score. Keeping that distinction clear makes the interface more useful and the claim more accurate.

## Connecting the Whole Workflow

The project includes the system around the model: transformations, quality tests, a serving API, a dashboard, and Docker Compose packaging. On first boot, a single-command startup runs data generation, transformations, model training, and scoring.

That repeatable setup makes it easier to inspect the complete path through the application. It also exposes the boundaries between stages: a problem in a join can become a problem in a model feature, which can become a confusing explanation in the interface.

## What I Would Evaluate Next

The current pipeline is a batch workflow using synthetic data. My next priorities would be to evaluate detection against known synthetic anomalies, test that historical features use only information available at the time of each transaction, and measure behavior as the dataset grows.

Streaming ingestion and model drift monitoring are useful future extensions. The first step is to understand the current pipeline's quality and limits well enough to know what those additions should improve.

Building FinSight reinforced the connection between data modeling and usable machine learning: every result is easier to assess when the path that produced it is visible.

Explore the [FinSight case study](/projects/finsight) or the [source code on GitHub](https://github.com/idoroe/Finsight-Lite).

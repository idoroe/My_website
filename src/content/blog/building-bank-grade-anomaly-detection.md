---
title: "Building a Bank-Grade Anomaly Detection Pipeline from Scratch"
description: "How I used dbt, PostgreSQL, and Isolation Forest to build FinSight — an end-to-end data pipeline that catches suspicious transactions and explains why they're flagged."
pubDate: "Feb 08 2026"
heroImage: "/screenshots/finsight-hero.webp"
tags: ["data-engineering", "machine-learning", "dbt", "python"]
---

I had a problem. I'd just landed a data engineering internship at RBC Borealis, and I was going to be working on the Enterprise Data Hub team — building and maintaining pipelines that move real financial data through a major bank's infrastructure. The thing is, I'd never actually built a data pipeline from scratch. Not a real one.

I'd taken database courses. I understood SQL. I knew what a star schema was in theory. But theory doesn't prepare you for the decisions you have to make when you're staring at raw CSV data and need to turn it into something a machine learning model can actually learn from.

So I built FinSight.

## Why a Star Schema Instead of Flat Tables

My first instinct was to just throw everything into one big table. Customer info, transaction details, timestamps, merchant data — flatten it all and let the ML model figure it out. It would've been faster to set up.

But that's not how real data warehouses work. At scale, you need structure. You need to be able to ask "show me all transactions for high-risk customers on weekends" without scanning every row in a 50-million-record table.

I went with a classic star schema: `fact_transactions` in the center, surrounded by `dim_customer`, `dim_merchant`, and `dim_time`. Each dimension table has derived fields that don't exist in the raw data — customer risk tiers (based on historical averages), merchant categories, and time features like `is_weekend` and `is_business_hours`.

This decision shaped everything that came after. The ML model doesn't just see raw amounts — it sees z-scores relative to each customer's normal behavior. That only works because the dimensional model pre-computes those baselines.

## Why dbt Matters

I could've written all my transformations in raw SQL scripts. But I wanted to understand dbt because that's what real data teams use, and honestly, once you use it, you get why.

The magic of dbt is the layered pipeline. My transformations run in three stages:

- **Staging:** Clean the raw CSV. Cast types, rename columns, filter garbage.
- **Intermediate:** Enrich and join. Calculate customer averages, merchant stats, time features.
- **Marts:** Final tables ready for analytics and ML. Star schema complete.

Each layer has tests. If a column has unexpected nulls, the pipeline fails before bad data reaches the model. That's not a nice-to-have — in financial data, one bad join can turn a legitimate $50 grocery purchase into a flagged anomaly.

```sql
-- Example dbt test: every transaction must have a valid customer
SELECT transaction_id
FROM {{ ref('fact_transactions') }}
WHERE customer_key IS NULL
```

If this returns rows, the pipeline stops. No silent failures.

## The Explainability Breakthrough

Here's where most anomaly detection projects stop: they train a model, it outputs a score, and they call it done. But a score of -0.73 means nothing to a fraud analyst. They need to know *why* this transaction is suspicious.

Each flagged transaction in FinSight gets a "top 3 reasons" breakdown. Not generic labels — specific, contextual explanations:

- "This transaction ($4,892) is 7.2x above this customer's average of $679"
- "Transaction occurred at 2:47 AM; this customer typically transacts between 9 AM and 6 PM"
- "First international transaction — no prior cross-border history"

The implementation is straightforward once you have the dimensional model. For each flagged transaction, I compare its features against the customer's historical baseline from `dim_customer`. The deviations get ranked by magnitude, and the top 3 become the explanation.

This is the feature that makes FinSight more than a toy project. It's the difference between "the model says this is bad" and "here's specifically what's unusual about this transaction, in plain English."

## What I Struggled With

The hardest part wasn't the ML model — Isolation Forest is well-documented and relatively straightforward. The hard part was designing the data model.

I spent two days going back and forth on whether `dim_time` should be its own table or just inline columns on the fact table. I went with a separate dimension because it let me pre-compute time-based features (day of week, hour bucket, is_holiday) once instead of recalculating them in every query.

The other challenge was synthetic data generation. I needed transactions that were realistic enough to have patterns — customers with normal spending habits, occasional large purchases, a few genuinely suspicious ones. I ended up writing a Python generator that creates customer profiles with specific spending distributions, then samples transactions from those distributions.

## What I'd Do Differently

If I rebuilt this today, I'd add streaming. The current pipeline is batch — it processes all transactions at once. A real banking system needs to flag suspicious transactions in near-real-time. Kafka for ingestion, with the model scoring transactions as they arrive, would be the natural next step.

I'd also explore SHAP values for deeper explainability. My current approach works well for simple deviations, but SHAP would let me explain interactions between features — like "this transaction is flagged because the combination of high amount AND unusual time is rare for this customer."

---

FinSight is the project I'm most proud of — not because it's the most technically complex, but because it forced me to think like a data engineer before I'd ever been one. Every decision I made here (star schema, dbt layers, explainability) came from trying to understand how production systems actually work.

Check out the [full case study](/projects/finsight) or browse the [GitHub repo](https://github.com/idoroe/Finsight-Lite).

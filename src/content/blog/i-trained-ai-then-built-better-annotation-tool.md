---
title: "I Trained AI Models for a Living — Then Built a Better Annotation Tool"
description: "How AI model training and contributor review work shaped LabelForge's task state machine, role-based workflows, and quality dashboard."
pubDate: "Feb 05 2026"
updatedDate: "2026-09-15"
heroImage: "/screenshots/labelforge-hero.webp"
tags: ["full-stack", "django", "react", "typescript"]
---

At Mindrift AI, I write challenging Java and object-oriented programming prompts, correct model answers, and review contributor tasks. Previously, at Outlier AI, I worked on JavaScript and React training tasks and helped refine labeling rules and edge cases.

That experience gave me a practical reason to build LabelForge. Annotation is a repeated cycle of selecting a task, making a judgment, submitting it, and responding to review. The interface should make that cycle clear, and the backend should keep it consistent.

LabelForge is my personal project exploring that workflow with React, TypeScript, Django REST Framework, and PostgreSQL.

## Start with the Task Lifecycle

I modeled the task lifecycle explicitly:

```text
unclaimed → in-progress → submitted → approved
                                    ↘ rejected → in-progress
```

The state machine limits which changes are valid. A task must be claimed before submission, and review actions apply to work that has been submitted. Returning a task for revision gives it a defined path back to the annotator.

Putting those rules in the API keeps them consistent across user actions. The interface can guide someone toward the next step, while the backend validates whether that step is allowed.

## Give Each Role a Clear Job

**Annotators** need a focused queue, clear label choices, and an efficient way to submit work. Customizable label buttons and keyboard shortcuts support those repeated actions.

**Reviewers** need to see the source task and the submitted annotation together, then approve it or return it with useful feedback.

**Admins** need to manage projects and datasets and understand how work is progressing across the team.

These roles share a system, but each interface emphasizes different decisions. JWT authentication identifies the user; role-based permissions determine which actions that user can take. Keeping those responsibilities distinct helped me reason about the API design.

## Keep Feedback with the Task

A rejection is more useful when the annotator can see what to change. LabelForge keeps review feedback with returned work so the next submission can respond to a specific issue.

I chose a workflow that returns a rejected task to its annotator. That supports continuity: the person who made the original judgment can review the comment and revise the work. Reassignment could be useful in other circumstances, but it would need a clear reason and a way to preserve that context.

The annotation interface improved usability for 15+ reviewers and reduced revision requests by 30%. Those results made the repeated interactions worth treating as a central part of the product.

## Make Quality Trends Visible

LabelForge's dashboard is filterable by project and includes:

- Per-annotator rejection rate, average task time, and throughput.
- Daily approval charts.
- Label-distribution breakdowns.
- Project completion and rejection rates.

A metric gives someone a place to investigate. A higher rejection rate might reflect ambiguous guidelines, more difficult tasks, or a mismatch between annotator and reviewer expectations. It does not establish the cause on its own.

The dashboard is most useful alongside the task and review history. Together, they help an admin move from an aggregate pattern to the examples behind it.

## What the Project Taught Me

Building LabelForge connected several parts of full-stack development: a React interface for a multi-step workflow, API validation, role-based permissions, relational storage, and aggregated reporting.

The most useful design questions came from the work itself. Who owns this task? What state is it in? What can this user do next? What information would make the next review more useful? Answering those questions gave the architecture a concrete purpose.

Explore the [LabelForge case study](/projects/labelforge) or the [source code on GitHub](https://github.com/idoroe/LabelForge).

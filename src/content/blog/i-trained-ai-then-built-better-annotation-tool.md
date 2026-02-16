---
title: "I Trained AI Models for a Living — Then Built a Better Annotation Tool"
description: "How my experience at Mindrift AI as an AI model trainer inspired LabelForge — a collaborative annotation platform with real-time WebSocket editing and quality tracking."
pubDate: "Feb 05 2026"
heroImage: "/screenshots/labelforge-hero.webp"
tags: ["full-stack", "nodejs", "react", "websockets"]
---

Before I ever wrote a line of code for LabelForge, I spent months doing the work it was designed to support. As an AI model trainer at Mindrift AI, my day looked like this: log in, claim a batch of tasks from the queue, read an LLM-generated response, evaluate whether it was correct, annotate it according to the guidelines, submit it, and wait for a reviewer to approve or reject my work.

The workflow itself was fine. But the tooling around it? Frustrating.

When a reviewer rejected one of my annotations, I'd get a vague notification. No specific comment explaining what was wrong. I'd have to re-read the entire task, guess what the issue was, and resubmit. Sometimes I'd get it right. Sometimes I'd get rejected again. There was no feedback loop — just a binary pass/fail.

And as someone who genuinely cared about doing good work, I wanted to see my stats. How many tasks had I completed this week? What was my rejection rate? Was I getting faster? There was no dashboard for that. No visibility into how I — or anyone else on the team — was performing.

That's the gap LabelForge fills.

## The Task State Machine

The core of LabelForge is a state machine that governs every task's lifecycle:

```
unclaimed → in_progress → submitted → approved
                                    ↘ rejected → in_progress (back to annotator)
```

This sounds simple, but getting it right at the API level matters. You can't approve an unclaimed task. You can't submit a task you haven't claimed. You can't reject a task that's already approved. Every invalid transition returns a clear error — no silent data corruption.

On the backend, I enforced this with validation logic that checks the current state before allowing any transition:

```javascript
async function submitTask(taskId, userId) {
  const task = await db.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
  if (task.status !== 'in_progress') {
    throw new Error(`Cannot submit task in '${task.status}' state`);
  }
  await db.query(
    'UPDATE tasks SET status = $1, submitted_at = NOW() WHERE id = $2',
    ['submitted', taskId]
  );
}
```

The simplicity is intentional. A state machine with 5 states and clear rules is easier to reason about than a freeform status field that any API endpoint can update to anything.

## Three Roles, Three Completely Different Experiences

LabelForge has three user roles, and each one sees a different app:

**Annotators** see their personal task queue. They can claim unclaimed tasks, annotate them using label buttons (with keyboard shortcuts for speed), and submit. If a task was previously rejected, the reviewer's feedback appears prominently at the top — no guessing what went wrong.

**Reviewers** see a queue of submitted tasks. For each one, they see the original text and the annotator's chosen label. One click to approve. Reject requires a comment explaining why. This is the part I cared about most — that rejection feedback is what closes the loop.

**Admins** create projects, upload task datasets in bulk, and see the quality dashboard. They never touch individual tasks — they manage the system.

Middleware and route-level checks enforce role boundaries at the API level. An annotator can't hit the review endpoint even if they construct the request manually. This isn't just good practice — in real annotation platforms, accidentally leaking reviewer-level access to annotators would compromise data quality.

## Why Quality Metrics Matter More Than You Think

Here's something I learned at Mindrift that most people don't think about: annotation quality is invisible until you measure it.

A team of 20 annotators can complete thousands of tasks per week. But if 15% of those get rejected on review, and 3 annotators account for 80% of the rejections, the project manager needs to know that. Without metrics, everyone looks equally productive. The only signal is "tasks are getting done" — which says nothing about whether they're getting done *well*.

LabelForge's quality dashboard tracks:

- **Completion rate** — how many tasks are done vs. total
- **Daily throughput** — tasks completed per day (bar chart)
- **Rejection rate** — across the entire project
- **Per-annotator stats** — tasks completed, rejection rate, average time per task

That last one is the most valuable. If one annotator has a 40% rejection rate while the team average is 8%, that's a training issue — not a workflow issue. You can't fix what you can't see.

## The Design Decision I Debated the Longest

Should rejected tasks go back to the same annotator, or to a different one?

Arguments for reassignment: fresh eyes might catch what the original annotator missed. Arguments for returning to the same person: they learn from the feedback, and consistency matters when tasks have context.

I went with returning to the same annotator with the reviewer's feedback attached. Here's why: the whole point of the feedback loop is learning. If annotator A makes a mistake, they should see the correction, internalize it, and avoid the same mistake on future tasks. Reassigning just distributes the error without fixing it.

In practice, this means the annotation UI shows a highlighted banner when a task has been previously rejected: "This task was returned by [Reviewer Name]: [Their specific comment]." The annotator reads the feedback, adjusts their annotation, and resubmits. Second-time approvals run well above 90% — the feedback works.

## What I Actually Learned

Building LabelForge taught me more about full-stack architecture than any course project. WebSocket-powered real-time collaboration across concurrent users. Node.js middleware that enforces role boundaries. React state management for a multi-step annotation workflow. PostgreSQL queries that aggregate per-user stats without killing performance.

But the bigger lesson was this: the best project ideas come from real frustration. I didn't brainstorm LabelForge in a vacuum. I sat in those annotation queues, dealt with the missing feedback, wished for the dashboard that didn't exist, and then built it.

If you've ever been annoyed by a tool at work and thought "I could build something better" — you probably can. And it makes for a much more compelling project than something you picked off a tutorial list.

---

Check out the [full case study](/projects/labelforge) or browse the [GitHub repo](https://github.com/idoroe/LabelForge).

# Maintaining Emmanuel's portfolio

This Astro site is maintained against `rbc_updated_resume.pdf`. The current content review is dated September 15, 2026. See [the content audit](docs/content-review.md) for fact sources and the PDF fingerprint.

## Where to make changes

| Content | Location |
| --- | --- |
| Education, experience, skills, project summaries, resume links | `src/data/profile.ts` |
| Name, headline, location, contact details, navigation, site description | `src/config.ts` |
| Homepage introduction and selected RBC examples | `src/components/home/` |
| Downloadable and embedded resume | `public/resume.pdf` |
| Project case studies | `src/content/projects/*.mdx` |
| Blog articles | `src/content/blog/*.md` |
| Academic reference | `src/pages/references.astro` |
| Social metadata | `src/components/BaseHead.astro` |

`profile.ts` supplies the experience and readable resume pages and shared homepage facts. Some homepage copy, project descriptions, and metadata are written separately; review those whenever the underlying facts change.

## Replace the resume

1. Keep the approved source PDF in the project root and copy that exact file to `public/resume.pdf`.
2. Update `profile.ts` from the PDF, including dates, job titles, skills, project results, and the source comment. Update contact details in `config.ts` if needed.
3. Change the query version in `RESUME_URL` in `profile.ts` so returning visitors receive the new PDF. Keep every PDF link and the embedded viewer using that shared constant. `RESUME_FILENAME` controls the downloaded filename.
4. Check the homepage, experience, resume, projects, blog, contact page, and social description for conflicting statements. Keep the downloadable PDF and readable resume consistent.
5. Confirm the source and public PDF are identical with `cmp rbc_updated_resume.pdf public/resume.pdf`; update the audit fingerprint when replacing the source.

## Keep time-sensitive facts current

- The degree is **B.Sc. Software Engineering**, University of Calgary, with **expected graduation in June 2028**. Avoid a year-of-study label that becomes stale automatically.
- The RBC role is **Data Engineer Intern, May–December 2026**. On the review date it is ongoing, with a scheduled December end. When it ends or changes, update the `note` and bullets in `profile.ts`, the homepage's “Current internship” card and introduction, the About copy, and `config.ts` descriptions and title. Do not keep current-role language after the role ends.
- Mindrift is **March 2025–Present** in the source resume. Confirm whether it remains current during each resume update. Outlier ended in **August 2025**.

## Maintain evidence and URLs

Keep numerical results traceable to the resume or documented project evidence. Preserve qualifiers such as “synthetic,” “approximately,” and “in the project environment.” Do not describe a personal project as a deployed banking system or turn an engineering estimate into a new benchmark.

Project screenshots must show the actual application. Capture updated images from the running project with representative data; do not invent screens, results, or users. Only add a live-demo URL when that demo is available. Keep repository URLs working.

Blog URLs are generated through `src/lib/createSlug.ts`. Its legacy mapping preserves `/blog/building-a-bank-grade-anomaly-detection-pipeline-from-scratch` after the article's title edit. Keep that mapping, and preserve published URLs when renaming other articles. Listings, article routes, and RSS must use the same slug helper. Keep original publication dates and update `updatedDate` when revising an article.

The academic reference is **Dr. Ronnie de Souza Santos**. Confirm professional details through his [University of Calgary profile](https://profiles.ucalgary.ca/ronnie-de-souza-santos). The relationship and agreement to serve as a reference come from Emmanuel. Do not invent an endorsement or quote. The reference request button prepares an email to Emmanuel to coordinate an introduction.

## Review before publishing

Run `npm run build`. Preview the site with `npm run dev` or `npm run preview`, and review desktop and mobile layouts in both themes. Check navigation, project filters, blog/tag links, reference links, the email-copy interaction, and every resume action. Confirm the PDF preview, download, and readable text agree. Inspect page titles, descriptions, social preview artwork, and favicons as part of the content review.

Record the completed checks and any remaining limits in `docs/content-review.md`.

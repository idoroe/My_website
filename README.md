# Emmanuel Idoro — Portfolio

Software Engineering student at the University of Calgary, with experience in data engineering and AI model training.

[Visit the portfolio](https://emmanuelidoro.netlify.app)

## Development

```sh
pnpm install
pnpm dev
```

## Production build

```sh
pnpm build
pnpm preview
```

The site is generated into `dist/`. Astro handles routing and content, with Tailwind CSS and DaisyUI for styling. Fonts and project screenshots are served locally.

## Content

- `src/data/profile.ts`: shared resume facts, experience, education, skills, and project summaries.
- `src/config.ts`: identity, navigation, social links, and default metadata.
- `src/content/projects/`: project case studies.
- `src/content/blog/`: engineering articles.
- `src/pages/references.astro`: academic reference and introduction link.
- `public/resume.pdf`: the downloadable resume.

The homepage includes an interactive architecture guide. The resume also has a readable HTML version and print styling. Navigation, project content, and contact links work without JavaScript.

See [the update guide](website_update_guide.md) and [the content review](docs/content-review.md) before changing career facts. Keep the PDF, shared data, and page copy aligned.

## Attribution

Originally built from Manuel Ernesto's [Astrofy](https://github.com/manuelernestog/astrofy) template. The original license is retained in [LICENSE](LICENSE).

// Adapted from https://equk.co.uk/2023/02/02/generating-slug-from-title-in-astro/

import { GENERATE_SLUG_FROM_TITLE } from '../config'

export default function (title: string, staticSlug: string) {
  // Preserve the published URL when the article title changes during an edit.
  const legacyBlogSlugs: Record<string, string> = {
    'building-bank-grade-anomaly-detection': 'building-a-bank-grade-anomaly-detection-pipeline-from-scratch',
  };
  if (GENERATE_SLUG_FROM_TITLE && legacyBlogSlugs[staticSlug]) {
    return legacyBlogSlugs[staticSlug];
  }

  return (
    !GENERATE_SLUG_FROM_TITLE ? staticSlug : title
      // remove leading & trailing whitespace
      .trim()
      // output lowercase
      .toLowerCase()
      // replace spaces
      .replace(/\s+/g, '-')
      // remove special characters
      .replace(/[^\w-]/g, '')
      // remove leading & trailing separtors
      .replace(/^-+|-+$/g, '')
  )
}

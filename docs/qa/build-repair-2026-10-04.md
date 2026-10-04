# Build and responsive regression verification — 4 October 2026

Rechecked at 19:41 Europe/Bucharest (16:41 UTC), using Node.js 24.13.0 and local Playwright Chromium on Windows.

## Additional defect found during recheck

The first recheck passed the existing suites, but a separate layout diagnostic exposed a brief resize overflow. The submit button inherited `transition-all`, which animated its desktop minimum width while folding to 280 pixels. The previous polling assertion waited until that animation finished and missed the transient overflow.

The strengthened regression now checks immediately after resizing. It failed against the previous production artifact (`24dd7f13a580d4d716217c0a8ea475ad6a1a77356737aec0fd9592567d89033a`), measuring 294 pixels against the unchanged 281-pixel limit. Contact submission-panel buttons now animate only background color, text color, border color and shadow; their dimensions reflow immediately. This also covers the new-inquiry button after successful submission. All eight localized desktop/mobile submission cases now include folding that accepted state to 280 pixels.

## Repairs and safeguards

- Contact submission uses an explicit `minmax(0,1fr)` grid column so intrinsic control widths cannot expand its reading column.
- The folding scenario checks overflow immediately after viewport changes, retaining the original one-pixel tolerance without polling. It checks draft preservation and menu scroll-lock cleanup in Romanian, English, Italian and Spanish, with element diagnostics on overflow.
- Eight additional contact cases cover loading, failure, retry, normal/compact widget dimensions and repeated resizing at 280, 320, 717 and 1280 CSS pixels. Provider requests are intercepted; the tests also check that controls fit within the submission panel and that the draft survives.
- Article language-switching verification waits for dropdown dismissal and scheduled navigation frames before opening the next menu. Topic, query and fragment assertions are retained. Five consecutive runs passed on each of desktop and mobile against the final build.
- `npm run check:ci` includes lint, TypeScript and the complete existing artifact/browser suites. Both GitHub workflows use the shared `typecheck` script. Workflow regressions now require the responsive, content, structural, source and release checks to remain mandatory before artifact upload; pull requests retain all technical gates.
- Concurrent article, translation, redirect and SEO changes from the other chat were preserved. The final integrated run tested the resulting shared source after that chat finished.

## Final integrated run

`npm run check:ci` completed successfully with exit code 0 in one uninterrupted run.

| Check | Result |
| --- | --- |
| ESLint and TypeScript | PASS |
| Structural files and four-language content | PASS |
| Unit tests | 52 passed |
| Production build | PASS; 88 localized routes |
| SEO and Pages artifact checks | PASS; 52 indexable pages |
| Production browser tests | 257 passed; 17 intentional skips |
| Responsive matrix and interaction scenarios | 90 passed |
| Isolated contact/CAPTCHA tests | 60 passed; intercepted providers |
| Immediate folding regression, five repetitions per language | 20 passed; retries disabled |
| Article language-switching regression, five repetitions per device | 10 passed; retries disabled |
| Git diff whitespace checks | PASS |

Final production build ID: `bd3efb91ce79b1fdace80d0b439a93ef388a217c39c503b97764348e6278d72a`.

The npm clean-install dry run also passed (`npm ci --offline --ignore-scripts --dry-run`). This checks lockfile consistency; it is not evidence of an executed clean installation on the GitHub Ubuntu runner.

## Publication status

`npm run check:release` still exits 1. All eight entries in [release-readiness.json](../release-readiness.json) require verified evidence, a reviewer and a date: clinical, professional, translations, privacy, providersAndAbuse, emailDelivery, domain and rollback. The localized privacy copy also contains unresolved facts.

The deployment workflow retains those publication requirements. Technical test success does not prove real CAPTCHA verification, email receipt, completed reviews or live deployment. This chat did not push or deploy these changes, change repository approval variables, or mark pending review records as verified.

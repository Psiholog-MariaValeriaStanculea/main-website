# Valeria Stănculea — psychology website

A four-language React/TypeScript/Vite website for children, parents and families. The editorial redesign implements the approved [design and usability specification](docs/website-design-and-usability-plan.md). See [implementation review and release conditions](docs/implementation-review.md) for source authority, drafted clinical content, EmailJS setup, privacy decisions and rollback preparation.

## Local development and review

Use Node.js 24. Install dependencies with `npm ci` and start development with `npm run dev`.

For a production-shaped review, run `npm run build:github-pages`, then `node scripts/serve-pages.mjs --port 4181`. Open `http://127.0.0.1:4181/main-website/ro`. The strict static preview serves each prerendered page and real HTTP 404 responses. The loopback preview is local to this computer.

## Validation

Install Chromium once with `npx playwright install chromium`. Run `npm run lint`, `npx tsc -b`, and `npm test`.

`npm test` validates project files and local imports, runs unit checks, builds the production artifact, audits SEO and Pages output, tests browser journeys and the responsive matrix, and builds an isolated contact-test artifact with dummy public identifiers. Provider requests in tests are intercepted; tests never send email. `.contact-test-dist` must never be deployed and does not replace the production `dist`.

Individual commands: `npm run test:unit`, `npm run check:seo`, `npm run check:pages`, `npm run test:e2e`, and `npm run test:contact`. Browser tests require a fresh production build. Screenshots/traces are in ignored `test-results` and `playwright-report` directories; representative design captures are in `docs/qa`. View failure reports with `npx playwright show-report`.

`npm run test:responsive` uses 28 CSS viewport profiles from 280px phones to 3840px 4K and 32:9 screens, with touch, portrait/landscape, fractional/Retina DPR, four languages, both themes, safe-area emulation, fold/unfold resizing and 200% text. The suite runs Chromium by default. To include installed Chrome and Edge on Windows PowerShell, set `$env:RESPONSIVE_CHANNELS='chrome,msedge'` before running it; remove that environment variable afterward with `Remove-Item Env:RESPONSIVE_CHANNELS`. Missing requested browsers fail rather than silently skip. Its diagnostics are in ignored `responsive-test-results` and `responsive-playwright-report` folders. This emulates screen conditions on the host; it does not certify native Safari/iOS, Android, macOS or Linux behavior. See [the responsive and platform review](docs/responsive-and-platform-review-2026-10-03.md).

`npm run check:files` checks all project files outside dependencies/builds/reports/caches: JSON/JSONC and YAML syntax, local import targets, raster/font signatures, public asset references and UTF-8 text. `npm run check:files -- --report` also refreshes `docs/project-file-inventory.json`, without recording environment values. Source files, public environment templates, fonts, portraits, lockfiles and selected review evidence stay visible to Git. Local environment overrides, compiler caches, temporary root captures, OS metadata and machine-generated test reports are ignored. Twenty-two historical temporary files are already tracked; ignore rules alone do not remove them from the index. The file inventory lists them for separate index cleanup without deleting local copies.

Coverage includes all 60 localized routes, direct reloads, real 404s, missing assets, language/section links, mobile menu focus/scroll lock, light/dark/system appearance, blocked storage, search/filter state, article Back restoration, in-memory inquiry drafts, optional message and sending feedback, delayed provider results, reduced motion, keyboard controls and no-JavaScript reading/email. Layout review includes 320, 390, 768, 1280 and 1440px, with enlarged translated text and spacing overrides.

## Content and routes

Localized editorial content is in `src/locales/{ro,en,it,es}/editorial.json`; full About content is in `master-about.json`. Romanian Home/About use the supplied PDF baseline. New service/FAQ/helper copy and translations require practitioner publication review. The six existing article bodies and URLs remain; unverified dates are hidden.

`src/lib/routes.ts` supplies the shared page inventory. The production build renders 60 HTML pages. While `VITE_PRIVACY_REVIEWED` is unset, four privacy pages are noindex and omitted from the sitemap, leaving 56 indexable entries. Set that flag only after completing the privacy notice and review; then rebuild. Metadata uses localized page copy, canonical/hreflang links, Person/WebSite/WebPage and article structured data, without unsupported LocalBusiness details, ratings or FAQ eligibility claims.

## Contact configuration

The confirmed contact address is fixed in `src/lib/siteConfig.ts`. Configure `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` in a local untracked `.env.production.local` or GitHub repository variables. These are public client identifiers; never put a private key or mailbox password in client configuration.

Set the template recipient to `psiholog.mariavaleriabaciu@gmail.com` in EmailJS, with Reply-To from `reply_to`. Follow the field mapping, processing review, allowed-origin and real-inbox verification steps in `docs/implementation-review.md`. Missing settings show unavailable feedback and direct email. Accepted provider responses do not themselves prove inbox delivery or confirm an appointment.

The inquiry draft, outstanding request and submission result share one in-memory application session. Visiting Privacy, using Back or changing language preserves the sending lock and feedback. Acceptance clears personal fields even while Contact is unmounted; rejection preserves the draft for an explicit retry. A full reload starts a new session. Drafts are never written to browser storage.

## GitHub Pages and release

The checked-in `.env.production` targets `https://psiholog-mariavaleriastanculea.github.io/main-website`, with `VITE_BASE_PATH=/main-website/`. The asset base and site URL pathname must match. GitHub Actions uses the URL/base reported by Configure Pages, including a verified custom domain.

Keep **Deploy GitHub Pages** as the only publishing workflow and Settings → Pages → Source set to **GitHub Actions**. It uploads the compiled production `dist`, with `.nojekyll`, rather than the source repository. A Jekyll deployment can overwrite it with uncompiled TypeScript and produce a blank page. A Configure Pages 404 means the repository's Pages site needs to be enabled/configured.

Both PR and deployment workflows run source, unit, artifact and browser checks. Publication additionally requires repository variable `WEBSITE_RELEASE_APPROVED=true`; set it only after the content, privacy, real-delivery, domain and recoverable-artifact requirements in the implementation review are complete. Set `VITE_PRIVACY_REVIEWED=true` only when the full privacy notice is ready. No production publication is part of the local implementation.

Before cutover, save the working artifact and original environment values. Publish the entire new `dist`, preserve route directories, return HTTP 404 for missing routes, and run `npm run check:pages -- --url YOUR_DEPLOYMENT_URL`. Verify representative language/article URLs, canonical URLs, HTTPS and actual EmailJS inbox arrival. Do not publish the isolated test artifact or rewrite all nested pages to the root HTML.

Each prerendered HTML page carries a SHA-256 build identity recorded in `dist/build-info.json`. The verifier compares that identity, route language and canonical URL against the expected artifact. The deployment workflow passes the build job's identity independently to its final check; an old release or a homepage fallback cannot pass simply by returning HTTP 200. With a local artifact, the command above reads the expected identity and canonical base from `dist`. Without that artifact, pass `--build-id EXPECTED_ID` from the trusted build record, and optionally `--canonical-base EXPECTED_SITE_URL` when checking through a different preview address. Do not derive the expected identity from the response being verified.

The shared static `404.html` provides Romanian, English, Italian and Spanish recovery cards when JavaScript is disabled. Each card links to its language's Home, Services and Contact pages. With JavaScript, the existing single localized error page remains.

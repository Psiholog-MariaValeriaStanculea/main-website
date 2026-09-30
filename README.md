# Valeria Stănculea — Psychology Website

A multilingual website for Valeria Maria Stănculea, clinical psychologist and integrative psychotherapist. Built with React, TypeScript, Vite, and Tailwind CSS, it includes responsive layouts, accessible animations, service information, appointment inquiries, a blog, and SEO support in Romanian, English, Italian, and Spanish.

## Automated regression tests

Use Node.js 24. After `npm ci`, install the browser once with `npx playwright install chromium`, then run `npm test`. This runs unit tests, builds the production site, audits all 48 SEO pages and the Pages artifact, and runs Chromium tests at desktop and 320px mobile widths.

Coverage includes blank/source-only deployments, competing workflows, missing or incorrectly served assets, base-path mismatches, direct route reloads, language switching, mobile menu focus/scroll behavior, theme and cookie persistence, unavailable storage, blog filters, contact validation, pricing toggles, FAQ transitions, carousel controls, reduced motion, and content without JavaScript. External font CSS is stubbed for repeatability; tests never send email.

For faster checks, use `npm run test:unit` or `npm run test:e2e` after a fresh build. View browser failures with `npx playwright show-report`; screenshots and traces are saved in ignored report directories. Pull requests run the suite, and the deployment workflow requires it to pass before uploading `dist`. GitHub Actions retains failure reports for seven days.

## Search engine optimization

`npm run build` renders all 48 localized pages with visible content and page-specific metadata. Titles and descriptions are maintained in `src/data/seoMetadata.ts`. Blog routes and sitemap entries come from the article data.

The generated output includes canonical URLs, reciprocal hreflang links, Open Graph/Twitter previews, LocalBusiness/Person/WebSite data, breadcrumbs, article data, the existing FAQ schema, and a noindex 404 page. Hash fragments and query parameters are excluded from canonical URLs.

Before publishing on the final domain, set `VITE_SITE_URL` in `.env.production` and rebuild. Include the deployment subdirectory once in `VITE_SITE_URL`, and set `VITE_BASE_PATH` to the matching path with a trailing slash. The checked-in `.env.production` targets `https://psiholog-mariavaleriastanculea.github.io/main-website`. GitHub Actions overrides these defaults with the URL and path reported by `actions/configure-pages`, including custom domains.

Upload the entire `dist` directory. The host must serve route directories and return an actual HTTP 404 status for missing URLs; `404.html` supplies the error page. Avoid rewriting every valid route to the root index, since that loses its prerendered metadata.

Run `npm run check:seo` after building to audit all generated pages. After deployment, verify ownership in Google Search Console, submit `/sitemap.xml`, inspect representative URLs, and validate structured data with Google's Rich Results Test.

## GitHub Pages deployment troubleshooting

Use **Deploy GitHub Pages** as the only deployment workflow. This React/Vite site must publish the compiled `dist` directory. A Jekyll workflow publishing the repository root can overwrite it with `index.html` referencing `/src/main.tsx`, resulting in a blank page even when Actions reports success. Do not add the Jekyll starter workflow to this repository.

The workflow checks source code, SEO, and the Pages artifact before uploading it, then checks the live homepage, language routes, and JavaScript/CSS responses after deployment. Run `npm run check:pages` after building, or `npm run check:pages -- --url https://psiholog-mariavaleriastanculea.github.io/main-website/` to check the deployed site.

The repository must have Settings > Pages > Build and deployment > Source set to **GitHub Actions**. A `Get Pages site failed / Not Found` error at Configure Pages means the workflow cannot read a configured Pages site. Enable Pages for the repository running this workflow before rerunning it. Changing the action version does not enable Pages.

Production assets and links must start with `/main-website/` for the current GitHub URL. Avoid publishing an older `dist` built for `/valeria-stanculea-web-main/`. Use `npm run build:github-pages`, upload the new build through the workflow, and run `npm run check:seo` to check stylesheet, script, and image paths in every generated page. The build rejects a mismatch between `VITE_BASE_PATH` and the URL pathname.

# Valeria Stănculea — Psychology Website

A multilingual website for Valeria Maria Stănculea, clinical psychologist and integrative psychotherapist. Built with React, TypeScript, Vite, and Tailwind CSS, it includes responsive layouts, accessible animations, service information, appointment inquiries, a blog, and SEO support in Romanian, English, Italian, and Spanish.

## Search engine optimization

`npm run build` renders all 48 localized pages with visible content and page-specific metadata. Titles and descriptions are maintained in `src/data/seoMetadata.ts`. Blog routes and sitemap entries come from the article data.

The generated output includes canonical URLs, reciprocal hreflang links, Open Graph/Twitter previews, LocalBusiness/Person/WebSite data, breadcrumbs, article data, the existing FAQ schema, and a noindex 404 page. Hash fragments and query parameters are excluded from canonical URLs.

Before publishing on the final domain, set `VITE_SITE_URL` in `.env.production` and rebuild. Include the deployment subdirectory once in `VITE_SITE_URL`, and set `VITE_BASE_PATH` to the matching path with a trailing slash. The checked-in `.env.production` targets `https://psiholog-mariavaleriastanculea.github.io/main-website`. GitHub Actions overrides these defaults with the URL and path reported by `actions/configure-pages`, including custom domains.

Upload the entire `dist` directory. The host must serve route directories and return an actual HTTP 404 status for missing URLs; `404.html` supplies the error page. Avoid rewriting every valid route to the root index, since that loses its prerendered metadata.

Run `npm run check:seo` after building to audit all generated pages. After deployment, verify ownership in Google Search Console, submit `/sitemap.xml`, inspect representative URLs, and validate structured data with Google's Rich Results Test.

## GitHub Pages deployment troubleshooting

The repository must have Settings > Pages > Build and deployment > Source set to **GitHub Actions**. A `Get Pages site failed / Not Found` error at Configure Pages means the workflow cannot read a configured Pages site. Enable Pages for the repository running this workflow before rerunning it. Changing the action version does not enable Pages.

Production assets and links must start with `/main-website/` for the current GitHub URL. Avoid publishing an older `dist` built for `/valeria-stanculea-web-main/`. Use `npm run build:github-pages`, upload the new build through the workflow, and run `npm run check:seo` to check stylesheet, script, and image paths in every generated page. The build rejects a mismatch between `VITE_BASE_PATH` and the URL pathname.

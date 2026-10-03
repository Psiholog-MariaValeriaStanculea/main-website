# Website implementation review

2 October 2026. Local implementation and preview; no production publication or domain changes. This accompanies the approved [design and usability specification](website-design-and-usability-plan.md).

## Visual refinement — 3 October 2026

The shared header now includes the user's supplied family concept as a refined transparent logo to the left of the existing brand text. The built-in imagegen output adds gentle hand detail; lossless responsive WebP assets keep downloads small. A warm neutral circular surface preserves visibility in both themes. Logo integration passed lint, TypeScript, production build, SEO/Pages checks and 37 existing layout/interaction checks (seven intentional skips), including enlarged text and mobile controls. See [logo asset and generation record](header-logo-design.md).

Home uses layered backgrounds, an organic portrait frame with decorative botanical line work, a subtle sun accent, family line drawings, service icons and shaded cards, a second authentic portrait, a three-step contact sequence, illustrated article categories and an asymmetric FAQ composition. Services, About, Resources and the Contact email panel share the visual system. Approved copy and inquiry behavior remain unchanged.

The light palette uses cream, peach, honey, sage and terracotta. The redesigned dark palette uses petrol/slate surfaces, powder-blue primary controls, lavender accents and warm-white text. Card and section surfaces have distinct tones; the closing panel uses a light blue/lavender gradient with dark text. The earlier brown-based dark palette has been replaced following user feedback. Decorative elements carry no clinical claims and remain hidden from assistive technology.

Validation of the broader implementation passed 33 unit checks, 179 production browser checks (seven intentional skips) and 16 intercepted-provider contact checks. The latest dark palette passed lint, production build, SEO/Pages checks and four targeted appearance/blocked-storage checks on desktop and mobile. Core solid semantic text/background pairs measure at least 4.69:1 in light mode and 5.01:1 in dark mode; closing-panel text also passes 4.5:1. Measurements are saved in `docs/qa/warm-theme-contrast.json`. Desktop and mobile dark screenshots were refreshed; `warm-dark-preview.png` shows the current palette. Palette measurements and browser checks do not constitute full accessibility certification. This remains a local preview; publication conditions below apply.

## What changed

### FAQ and Contact refinement — 3 October 2026

FAQ now shares the warm introductory surface used by the other primary pages. Its three topic groups use the same heading-and-content hierarchy as About, with decorative line icons, individual question panels, clear hover/keyboard focus and a tinted expanded-answer state. Multiple answers can remain open; reduced motion and prerendered no-JavaScript answers remain supported. The existing contact action uses the shared button treatment.

Contact now has a clearly defined inquiry panel, a separate direct-email panel with the family illustration, and a soft introductory surface. Name and email share a row on sufficiently wide screens and stack on phones. Required-field guidance, service context, message guidance, privacy information, appointment expectations and provider feedback keep their original order. Sending, accepted, rejected, uncertain and unavailable feedback have distinct visual cues while retaining the existing controller, text, live announcements, locking and draft behavior. The active Contact header button also retains its primary background to avoid low-contrast active-page styling.

Ordered text matches the pre-refinement baseline exactly on all eight localized FAQ/Contact pages; evidence is in `docs/qa/faq-contact-text-before.json` and `faq-contact-text-verification.json`. Validation passed lint, TypeScript, 33 unit checks, the production build, SEO/Pages checks, 187 production browser cases (15 intentional skips) and all 16 intercepted-provider contact scenarios. Expanded FAQ and contact text were additionally checked at 200% with spacing overrides in all four languages; light/dark desktop/mobile screenshots are saved in `docs/qa/`. Actual EmailJS delivery remains unverified; the production preview continues to show the existing unavailable state and explicit email alternative. No deployment or real provider submission was performed.

### About and Services reading refinement — 3 October 2026

About now uses a unified opening surface with the authentic portrait, a six-link section index, desktop chapter headings beside readable prose, a restrained mission callout, five consistent value panels and ten individually separated professional groups. All selected courses and continuation paragraphs remain in their original positions. On mobile the same sections follow one natural reading column. Chapter headings remain visible during long desktop sections on sufficiently tall viewports.

Services now uses Home's introductory surface and family line motif, a seven-link index, clearly separated service cards, shaded example lists and consistent contextual inquiry actions. Its closing panel follows Home's accepted theme treatment. Both pages retain the existing light and dark palettes; these styles are scoped to the long-form pages.

The frozen pre-refinement ordered text in `docs/qa/about-services-text-before.json` matches all eight prerendered pages exactly; `about-services-text-verification.json` records text-node counts and hashes. Browser checks independently confirm the same hydrated text and order in RO/EN/IT/ES, both themes and 320/1440px widths. No locale copy was edited for this refinement. Nested grids and headings reflow at 200% text with spacing overrides. Every original section fragment remains reachable; router-aware links avoid stale scroll restoration and move keyboard focus to the destination heading. Native link destinations and the selected-course disclosure remain usable without JavaScript.

Latest validation: lint, TypeScript, 33 unit checks, production build, SEO/Pages checks, and 187 production browser cases (15 intentional duplicate/device-matrix skips). The existing 16 intercepted-provider contact checks belong to the preceding implementation verification; provider code and form behavior were not changed by this refinement. Representative About and Services screenshots cover desktop/mobile and both themes in `docs/qa/`. The preview was refreshed locally; no publication was performed.

### Broader implementation

- A shared editorial system: warm cream, peach, honey, sage and terracotta; self-hosted Source Serif 4 and Inter; readable text widths; consistent spacing, controls and focus treatments; light, dark and system appearance.
- Six primary navigation destinations, a compact mobile dialog with focus restoration, visible language selection, and a footer with the confirmed email and legal links.
- Home follows the recognition → support → approach → resources → questions → contact journey. Support links reach the corresponding service section. The duplicated homepage form, testimonials, statistics, fees/packages, and unsupported operational promises are absent from the rendered site.
- One Services page with seven stable anchors. Inquiry links carry an allowlisted service ID into the short Contact form. Online support is a format and is described separately from website language availability.
- All seven About sections, with complete Romanian public prose, professional history, five equally treated values, and an accurately labelled disclosure of eight selected courses. Paragraphs and lists are separated for reading; no complete course catalogue was invented.
- Resources includes six preserved articles, category filters, accent-insensitive search, empty/reset states, correct singular result counts, and remembered collection state. Articles have a narrow reading column and relevant related articles, without repeated portrait thumbnails or unverified dates.
- Contact requests only name, email, category and an optional message. “Not sure” is the default. Drafts survive errors, language changes and visiting the privacy page, in memory only; refreshing clears them. Acceptance clears the remembered draft. An unavailable form explains the issue and shows direct email before the fields.
- Submission states distinguish sending, accepted, definite rejection, uncertain delivery and unavailable configuration. Concurrent sends are blocked; a late provider result resolves uncertainty. No automatic retry or email-app launch occurs. Provider bodies and personal fields are not logged.
- Four-language page copy, navigation, helpers, validation, feedback, metadata and error recovery. Active routes determine language, without language cookies or browser language persistence.
- Shared route inventory, aligned client/prerendered trees, 60 localized HTML pages, 56 indexable entries while privacy remains under review, canonical/hreflang links, genuine 404 output, preserved article URLs and legacy hash bookmarks. Prerendered reading content remains present until JavaScript commits the page.
- Responsive WebP variants of authentic supplied portraits and preloaded, subsetted fonts. Font downloads total about 391 KB instead of 781 KB; the hero portrait variants are about 17–46 KB. No third-party font request is needed.

## Content authority and review matrix

| Content | Source / implementation | Publication status |
| --- | --- | --- |
| Romanian Home and About public copy | Supplied `Dosar master site valeriastaculea.ro.pdf`; `editorial.json` and `master-about.json` | Approved editorial baseline. Confirm current professional facts before release. |
| Professional chronology and eight courses | PDF; Romanian import helper preserves prose and list order | Verify dates, affiliations, autonomous practice title and APRICAS status. The PDF describes training started January 2026 as ongoing; translations retain the start date without asserting a current completion status. |
| EN / IT / ES Home and About | Full translations in the four locale directories | Implemented; practitioner/native-language review remains necessary for professional terminology. |
| Services descriptions, examples and suitability language | Newly drafted `services` content in each `editorial.json` | **Draft for clinical publication review**, including current service availability and cross-border conditions. |
| FAQ, first-contact steps, contact helpers and resource notices | Newly drafted localized content | **Draft for clinical publication review**. No fees, appointment guarantees or response-time guarantees supplied. |
| Existing six articles | Existing `src/data/blogPosts.ts`, with URLs and body content preserved | Review clinical accuracy, authorship, references and translations. Dates are not shown or emitted in article schema until verified. |
| Contact destination | Confirmed `psiholog.mariavaleriabaciu@gmail.com` | Fixed code contact address; actual provider template recipient still requires verification. |
| Privacy and storage pages | Observed implementation plus linked provider documentation | Technical overview implemented. Full practitioner processing notice is a **release blocker**. Privacy routes remain `noindex` until reviewed. |
| Portraits | Authentic supplied originals, resized/compressed only | Confirm publication permission for supplied photographs. No fabricated portraits or article imagery. |

The PDF's implementation instructions were treated as source requirements, subordinate to the user's approved specification. Testimonial material was intentionally excluded. Unverified location, telephone, hours, prices, insurance, availability and response promises were not added.

## Actual data flow and storage

Reading pages downloads static HTML, local scripts/styles, self-hosted fonts and portraits. There are no analytics or advertising integrations in the active application. GitHub Pages documents security logging of visitor IP addresses; the legal page links its privacy statement.

Only the appearance preference uses local storage (`lovable-ui-theme`). Blocked or full storage is tolerated. Page language is in the route. Search/filter state and an unfinished inquiry remain in JavaScript memory and disappear on a full reload; there is no draft local/session storage or personal-data URL query. Service query values are fixed identifiers, not visitor messages.

Only a valid, explicit form submission contacts EmailJS when configured. The installed SDK is loaded on demand with an in-memory storage provider. If access to the browser storage getter is blocked, the same [documented EmailJS send endpoint](https://www.emailjs.com/docs/rest-api/send/) is used directly before any SDK send begins. Neither transport automatically retries. The practitioner must review the connected mailbox, EmailJS template/event history, applicable processor arrangements and transfers. The provider's policy discusses request metadata and possible US processing; this does not establish the practice's lawful basis or retention policy. See [EmailJS privacy policy](https://www.emailjs.com/legal/privacy-policy/).

## Provider setup and real delivery test

1. Configure the real service, template and public key through `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`. Only public identifiers belong in client configuration. Never add an EmailJS private key or mailbox password.
2. Set **To Email** in the provider template to the confirmed practice email. Do not use a visitor-controlled `to_email`. Set Reply-To to `{{reply_to}}`; keep the sender as the connected account. Use plain text for visitor content, or escaped template substitution if an HTML template is necessary.
3. Supported template fields are `from_name`, `from_email`, `reply_to`, `subject` (localized inquiry label), `category` (stable key), `service` (stable ID or empty), `language`, and `message` (may be empty). Ensure the template renders an optional message usefully. Do not enable an unreviewed automatic reply.
4. Verify the allowed origins for the real Pages/custom-domain host and any approved testing origin. Review quota, rate limits, abuse controls, template history and processing settings in the actual account.
5. Send one clearly labelled test using nonsensitive information. Verify acceptance, arrival in the confirmed inbox (including spam), sender/reply-to, accented characters, selected service, and empty message. Record provider acceptance separately from inbox arrival.
6. Verify a genuine rejection and a simulated network interruption preserve the draft and show the correct next action. Do not intentionally send duplicates to test uncertainty.

The current `.env.production` does not include provider identifiers. The preview therefore shows unavailable feedback and direct email. Mocked tests verify the UI/transport contracts; **actual mailbox delivery has not been verified**.

## Verification record

Commands: `npm run lint`, `npx tsc -b`, `npm run check:files`, `npm run test:unit`, `npm run build:github-pages`, `npm run check:seo`, `npm run check:pages`, `npm run test:e2e`, `npm run test:responsive`, and `npm run test:contact`.

Latest local results, 3 October 2026: lint, TypeScript, production build, SEO and Pages checks passed; 40/40 unit checks passed; 193 production browser checks passed (15 deliberately skipped cases duplicate device-specific/matrix coverage); 22/22 isolated contact checks passed. The complete `npm test` chain finished successfully. All 60 localized HTML routes load and reload; the 56 currently indexable routes pass metadata/sitemap checks. See [the four code-review fixes and closure evidence](code-review-fixes-2026-10-03.md).

The subsequent responsive audit added 28 viewport profiles spanning 280px folded phones through 4K and 32:9 displays, Retina/fractional DPR, touch and landscape. The expanded chain passed 111 responsive checks: 87 in Chromium and 12 each in installed Chrome and Edge, including cutout/home-indicator emulation, short-dialog scrolling, draft preservation across folding/rotation and enlarged text in the complete primary journey. It repaired narrow-header fragmentation, inaccessible menu-close positioning, intrinsic grid clipping on Home, 14px form typography and a sticky Contact aside on short windows. Project files were inventoried and structurally checked; local environment/caches/test reports received ignore rules. See [the platform review and native-testing limits](responsive-and-platform-review-2026-10-03.md). Native Apple/Android/Linux hardware and Safari/Firefox were not tested; the viewport emulations do not establish native OS compliance.

The browser suite covers direct load/reload of all 60 localized routes at desktop and 320px phone widths; language/anchor/query preservation; menu focus and scroll lock; three appearance modes; blocked storage; draft privacy/language navigation; collection search/reset/Back; selected training; reduced motion; keyboard skip/language/FAQ controls; and reading/email/navigation without JavaScript in all languages. A separate matrix checks the primary pages at 320, 390, 768, 1280 and 1440px, and 200% text with spacing overrides in all four languages on phone and desktop.

The isolated contact suite builds `.contact-test-dist` using dummy public identifiers and intercepts every provider request. It covers localized validation, definite rejection, explicit retry, optional message, stable service context, duplicate prevention, sending locks, late acceptance after uncertainty, network failure and blocked storage. Regression tests also cover Privacy/Back/language navigation while sending and acceptance/rejection while Contact is unmounted. The in-memory application session preserves the outstanding request and clears personal fields after acceptance without persisting drafts. It does not replace `dist` or contact the real provider. The test artifact must never be deployed.

Representative screenshots are in `docs/qa/`; files beginning `mocked-contact-` use intercepted provider responses and fictional test entries. Manual visual review inspected the desktop/mobile Home, Services, Contact, Resources and About hierarchy, as well as mobile navigation and dark appearance. Keyboard and accessible-tree checks were performed. A real assistive-technology speech session, representative-reader study and field Core Web Vitals measurement were not available; these checks do not constitute a WCAG compliance or user-study claim.

Browser defects discovered and repaired included missing trigger refs causing menus to position outside the viewport, lost menu-opener focus, typography/button style overrides, enlarged-translation grid overflow, stale scroll events overwriting Back restoration, and premature loss of drafts when consulting privacy information.

The subsequent preference-selector fix keeps language/appearance menus non-modal, so opening them does not remove the page scrollbar or add another scroll lock inside the mobile dialog. A shared focus-return hook uses `preventScroll:true`, avoiding jumps to the original document position of sticky header controls while preserving keyboard recovery and outside-click dismissal. The mobile dialog also restores focus without scrolling. Same-page language changes restore the saved reading position after native scroll anchoring reacts to translated text. Four regression cases cover desktop with visible native scrollbars and mobile: all four languages, keyboard/Escape, outside click, Light/Dark/System, unchanged page width/scroll position and the mobile dialog's independent lock. The existing Back, anchor/query and Contact checks also pass.

## Publication and rollback conditions

Before release:

- Have the practitioner approve new clinical content and all translations, and confirm current credentials, affiliations, selected course facts, services/formats and online conditions.
- Verify real EmailJS delivery, the fixed recipient, allowed origins, connected mailbox, provider processing and suitable abuse protection.
- Expand and approve the full privacy notice: controller/practice identity, processing purposes and lawful basis, processor/mailbox details, retention, transfers/safeguards, applicable rights and complaint channel, and confidentiality boundaries. Do not infer these from a provider policy. Then set `VITE_PRIVACY_REVIEWED=true` and rebuild.
- Verify domain ownership, DNS, HTTPS and actual intended Pages URL. Until cutover, the checked-in URL remains `https://psiholog-mariavaleriastanculea.github.io/main-website`, with `/main-website/` as its base path. Custom-domain deployment needs matching `VITE_SITE_URL` and `VITE_BASE_PATH`, preserved route directories, EmailJS origins, sitemap and canonical checks. No domain change has been made.
- Save the last known working production artifact, its deployment/commit identifier and its environment values. Rehearse restoring that artifact or rebuilding that revision with its original configuration. Local pre-implementation HEAD is `82fdfba`; this has **not** been established as the last working production deployment.
- Mark `WEBSITE_RELEASE_APPROVED=true` in repository variables only after the review/delivery/domain/rollback conditions are complete. The existing single GitHub Pages deployment workflow now checks this before uploading the production artifact; PR checks remain independent and do not publish.
- Publish the entire production `dist`, verify live nested routes, email delivery and HTTPS, and retain the rollback artifact. Clear the release approval variable if new unresolved publication facts arise.

No automatic release, custom-domain cutover, email to the practitioner, or third-party tracking was performed as part of this implementation.

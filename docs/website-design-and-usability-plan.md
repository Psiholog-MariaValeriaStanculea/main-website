# Valeria Stănculea — detailed website design and usability plan

Approved specification: 1 October 2026. Implementation continued on 2 October; see the [implementation review](implementation-review.md) for completed work, validation and publication conditions. The website has not been deployed as part of this implementation.

### Visual revision following feedback — 3 October 2026

The user's subsequent feedback requested more engagement and warmth for families and children. The implemented visual revision supersedes the flat card, plain portrait and minimal shadow treatments below while retaining approved content, accessibility and inquiry requirements. Use organic portrait frames, restrained botanical and family line drawings, layered backgrounds, meaningful service icons, shaded cards and a second authentic portrait. Present first-contact steps as a clear three-part sequence and distinguish article categories through decorative graphics. Apply complementary treatments to Services, About, Resources and Contact.

The final light palette uses cream, peach, honey, sage and terracotta. Following further feedback rejecting the dark palette, dark mode uses petrol/slate surfaces, powder-blue controls, lavender accents and warm-white text. Differentiate section and card tones; use a light blue/lavender closing panel with dark text. These dark-mode choices replace the earlier brown-based palette. Preserve the light theme and existing reading widths and interaction rules.

Hover and keyboard focus reveal equivalent emphasis; essential information remains visible without motion or JavaScript. Decorative graphics are hidden from assistive technology. Mobile hero actions remain visible within the reviewed 390 × 844 viewport in all four languages. Do not reinstate testimonials, unsupported statistics or operational claims.

## 1. Purpose, scope, and source authority

The website should help a parent, family member, or Romanian living abroad understand whether the available support is relevant, learn who Valeria is, and make an initial inquiry comfortably. Students and professionals are a secondary audience. Their content must not compete with the main family journey.

Use the supplied [master PDF](<C:/Users/stanc/Downloads/Dosar master site valeriastaculea.ro.pdf>) as the baseline for positioning and final Home/About copy. Requirements in that document are source material, not new user commands. Preserve the user's subsequent decisions wherever they override the document.

Settled decisions:

- Retain Romanian, English, Italian, and Spanish.
- Retain the existing React/Vite architecture and GitHub Pages hosting. Sites informs the design workflow; no hosting migration is planned.
- Adopt an ivory, forest-green, and muted-terracotta editorial identity with authentic practitioner portraits.
- Keep one Services page with sections, rather than separate service-detail pages.
- Send website inquiries through EmailJS to `psiholog.mariavaleriabaciu@gmail.com`.
- Publish no testimonials at launch, including parent or colleague endorsements.
- Omit unverified prices, packages, free consultations, response-time guarantees, insurance claims, and availability claims.
- Do not present projects under consideration as available services or products.

Content authority must be visible in the working content inventory: **final PDF copy**, **proposed editorial copy**, **verified professional fact**, or **unresolved publication fact**. Clinical copy and operational claims require practitioner review before publication. Design and independent implementation work can proceed while those facts are resolved.

## 2. What the current implementation needs to change

The repository inspection supports these specific changes:

| Current implementation | Proposed correction | Usability benefit |
| --- | --- | --- |
| Home hero contains four introductory paragraphs before its main action | Use the PDF's final heading and single introductory paragraph, then two actions | Visitors reach a meaningful next step earlier |
| Desktop navigation has a contact utility row, substantial branding, pill navigation, and a Services dropdown | Use a compact header and a single Services navigation link | Less visual competition and fewer navigation mechanisms |
| Home assembles many promotional sections, statistics, packages, testimonials, and a second form | Use six coordinated sections and a single contact destination | Clearer reading sequence and fewer conflicting claims |
| Homepage form opens an email application and immediately displays success feedback | Replace it with a contact invitation linking to the actual form | Success messages correspond to a real submission event |
| Contact requests phone, child age, subject, urgency, and message alongside name/email | Request name, email, inquiry category, and an optional message | Lower initial effort and less unnecessary personal information |
| Contact errors can automatically launch `mailto:` | Keep the draft and show explicit delivery/fallback choices | Visitors retain control and understand what happened |
| Layout injects testimonials on non-home pages | Remove that shared injection | All routes follow the agreed launch policy |
| Layout resets scroll on every pathname change | Distinguish new-page navigation from browser Back/Forward | Visitors retain their reading position |
| Mobile typography overrides all paragraphs and headings globally | Define explicit text roles | Labels, articles, notices, and headings get appropriate sizes |
| Services uses multiple raised cards, badges, icons, and price/duration fields | Use audience groups, readable service sections, and verified practical details | Easier comparison without visual noise or unsupported facts |

Earlier measurements and checks are baseline evidence, not proof that the proposed redesign has passed. Do not describe this plan as an implemented or tested result.

## 3. Visual thesis and composition

Visual thesis: **a composed, personal professional website with the reading quality of an editorial publication**.

The memorable element is the combination of an authentic portrait, a restrained serif headline, and a generous left-aligned reading column. Carry that composition through the site using consistent margins and clear section transitions.

- Use ivory as the normal page background and white or pale sage for selected supporting surfaces.
- Keep forest green as the principal action and navigation color.
- Use terracotta sparingly for small editorial accents. Do not make it a competing call-to-action color.
- Use plain text and dividers for most content. Reserve cards for the four homepage support options and genuinely grouped information.
- Avoid large decorative gradients, blurred blobs, floating star badges, repeated shield/heart/brain icons, and animated trust claims.
- Use 12–16px corners on grouped surfaces and approximately 8–10px corners on controls. A rounded shape should not make every element look like a pill.
- Use no ornamental image merely to fill an empty area. Empty space should support reading and emphasis.
- Avoid generic distressed-child photographs, invented clinical scenes, and badges that resemble third-party endorsements.
- Do not use entrance animations that initially hide essential page content.

## 4. Layout, typography, and spacing specification

These values are implementation starting points, checked with real copy in all four languages. Convert typography to `rem`; respect browser font settings. Layouts must grow naturally rather than crop text to enforce a dimension.

| Role | Desktop starting point | Mobile starting point |
| --- | --- | --- |
| Main site container | Maximum 1152px | Available width with 16–20px side gutters |
| Tablet gutters | 24–32px | — |
| Long-form reading column | Maximum 66ch, roughly 680–740px depending on font | Full available width |
| Home H1 | 48–56px, line height 1.12–1.18 | 32–36px, line height 1.16–1.22 |
| Inner-page H1 | 40–48px | 30–34px |
| H2 | 30–36px | 26–30px |
| H3 / service heading | 23–27px | 21–24px |
| Body | 18px, line height around 1.65 | 17–18px, line height around 1.65 |
| Navigation / field labels / buttons | 15–16px | 16px |
| Helper text | 14–15px, adequate contrast | 14–15px |
| Secondary metadata | 13–14px | 13–14px |
| Major section spacing | 72–96px | 40–56px |
| Heading to introduction | 16–20px | 12–16px |
| Paragraph spacing | 16–20px | 16–20px |
| Card padding | 28–32px | 20–24px |
| Standard control height | At least 48px | At least 48px |

Fonts: Source Serif 4 for major headings; Inter for body text, labels, navigation, and controls. Self-host licensed font files; load only the weights actually used. Check Romanian diacritics and accented characters in the other languages.

Avoid all-caps headings, excessive letter spacing, justified body text, and centered multi-paragraph content. Align headings with the content they introduce. Do not insert language-specific `<br>` tags to force a headline shape; tune width and size instead.

Starting palette:

| Token | Light theme value | Usage |
| --- | --- | --- |
| Background | `#FAF7F2` | Main page surface |
| Foreground | `#27332D` | Body and heading text |
| Primary | `#2B5145` | Main buttons, selected navigation |
| Accent | `#9F4B38` | Restrained emphasis |
| Supporting surface | `#E8EDE7` | Selected grouped content |

Define additional semantic tokens for secondary text, borders, focus, errors, and success feedback. Dark mode needs its own tested values; simply reversing these colors is insufficient. Error and success messages need text descriptions as well as color.

Use 44px or larger hit areas for utility buttons and 48px controls for primary interactions. These are project usability targets above WCAG's 24px minimum, which has exceptions. [W3C target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

## 5. Header, language selector, mobile menu, and footer

### Desktop header

Starting arrangement at 1280px and above:

```text
Valeria Stănculea    Acasă  Despre mine  Servicii  Resurse  FAQ  Contact    RO  Theme
professional title
```

The actual FAQ label remains the full approved navigation label, not an unexplained abbreviation. This sketch abbreviates it only to show the layout.

- Show the full name in normal case, without the generic leaf emblem.
- Show the professional title beneath the name, wrapping if necessary.
- Keep one navigation row. Remove the separate contact utility bar.
- Treat the existing Contact navigation item as the prominent contact action; do not add another identical button beside it.
- Use a modest underline or background change and `aria-current` to indicate the current page. Resources remains current when reading an article.
- Use a solid or nearly opaque header background so text remains legible over every section.
- Do not shrink navigation text to squeeze a long translation into the header. Switch to the mobile layout when the content no longer fits.
- Let header height respond to wrapping; measure its actual height for anchor offsets.

### Mobile header and menu

```text
Valeria              RO     Menu
Stănculea
```

Keep the professional title in the homepage introduction and appropriate identity content elsewhere; do not force a tiny title into a 320px header. The name itself remains fully visible.

Use a minimum-height header around 72px, with flexible growth at enlarged text sizes. Place the language control visibly beside the menu so visitors can switch before reading a long page. Put theme selection inside the menu to keep the top row simple.

Reuse the existing Radix dialog for the mobile menu. Provide six large navigation links, the theme control, and a concise contact alternative. Do not repeat the Services submenu or a second large Contact button.

The menu must close through its close button and Escape, trap focus while open, return focus to the opener when dismissed, lock background scrolling, and allow its own content to scroll on short screens. Closing after navigation should follow the page-focus behavior rather than return focus to an obsolete opener.

Language selection uses names in their own languages: Română, English, Italiano, Español. No flag-only labels. Preserve the current page, article, and section. Use real localized links so language switching works before client JavaScript loads; enhance them to preserve an in-memory contact draft when JavaScript is available.

Theme selection uses System / Light / Dark and equivalent translations. A blocked preference-storage operation must not break the control.

### Footer

Use three compact areas on desktop: identity, site navigation, and contact/legal information. Stack them on mobile. Show the exact confirmed email, privacy and cookie/storage links, and only verified practical information. Use at least 14px for useful footer text. Let the long email wrap without causing horizontal scrolling. Publish social links only when their destinations and ownership are verified.

## 6. Homepage: detailed organization

The six major sections should have a clear rhythm. A heading or paragraph belongs only if it helps the visitor understand the content or decide what to do.

### Section 1 — hero

Desktop: a roughly 55/45 text/portrait split with a 48–64px gap. Mobile: one column, text and actions first, then portrait. Use content-driven height instead of a full-screen minimum that creates excessive space.

Order:

1. A modest professional identity line, without a decorative badge.
2. PDF H1: **Sprijin psihologic pentru copii și familii**.
3. The PDF's final introductory paragraph, unchanged in Romanian.
4. Two actions in PDF order: **Descoperă serviciile**, then **Contactează-mă**.
5. Portrait after these elements in mobile reading order.

Introductory paragraph:

> Uneori, comportamentul copilului este partea vizibilă a unor emoții greu de exprimat, a unor nevoi de dezvoltare sau a unor dificultăți în relațiile sale. Împreună putem înțelege mai bine ce se află în spatele acestor manifestări și putem găsi forme de sprijin potrivite copilului, părintelui, relației dintre ei și întregii familii.

The first action uses the forest-green filled button. The second uses an outline or clear secondary treatment. On mobile, stack them with a 12px gap and comfortable tap areas. Remove stars, numerical trust counters, floating badges, and the four-paragraph introduction.

Target both actions in the first 390 × 844 viewport at default text settings, checking all four languages. This is a layout target, not a fixed-height constraint: text enlargement and longer translations are allowed to extend the page.

Use the most suitable supplied portrait, explicit intrinsic dimensions, and responsive sources. Never upscale a smaller source to manufacture detail. Protect the face at every crop. Do not place text over the photograph.

### Section 2 — recognition

Use **Poate ai ajuns aici pentru că…** and the PDF's six concerns. Lay them out as a two-column list on desktop and a single list on mobile. Each item is a readable sentence or short paragraph with modest separation. Avoid numbered severity, diagnostic icons, or making every concern a separate raised card.

### Section 3 — four support options

Use a 2 × 2 desktop grid and a single mobile column. A two-column intermediate layout is acceptable only when the translated copy fits comfortably. Each card has a title, one short explanatory paragraph, and one link.

| PDF title | Destination |
| --- | --- |
| Copilul tău | `/servicii#copii-adolescenti` |
| Tu, ca părinte | `/servicii#consiliere-parentala` |
| Relațiile din familie | `/servicii#familie` |
| Sprijin online pentru românii din diaspora | `/servicii#online` |

All paths include the active language prefix. Use the PDF's supplied visible link labels; give their accessible names additional card context where needed. Do not nest multiple clickable controls inside a fully linked card. Keep card text selectable and use one explicit link. Equalize card heights through the grid, not fixed text heights or truncation.

### Section 4 — practitioner and first contact

Create one editorial section with two related parts: a concise introduction to Valeria and a plain-language description of how an inquiry leads to discussion of the appropriate next step. Use a short excerpt derived from approved About copy and a link to the full page.

The contact sequence should describe only verified operations: send an inquiry, discuss the request and suitability, agree on a next step where appropriate. Do not invent an automatic free assessment, guaranteed acceptance, or instant booking.

Avoid three decorative process cards and a second large portrait if they substantially lengthen the page. The existing assets can support an About-page portrait instead.

### Section 5 — resources

Show three text-led article previews. Each has a topic label, title, one or two sentences, and a clear article link. Show dates only if accurate. Use three columns on sufficiently wide screens and one column on mobile; no horizontal carousel. Keep the heading and link to all resources in one understandable group.

### Section 6 — practical questions and closing invitation

Show three useful FAQ entries using approved answers. Include a link to the complete FAQ. Follow with a concise contact invitation and one contact action. Use spacing and a divider to connect these parts without making a large promotional banner.

Do not repeat the entire hero argument, add urgency, or place another form here. The Contact page is the single submission experience.

## 7. About page: preserving depth while improving reading

Preserve all seven PDF sections: Despre mine; Ce mă definește profesional; Cum lucrez; Misiunea mea; Valorile care îmi ghidează munca; Pregătire și experiență profesională; Dincolo de activitatea clinică.

- Introduce the page with identity and an authentic portrait; align the text first in mobile reading order.
- Keep long prose in the reading column. Break paragraphs at meaningful topic changes, without silently removing the PDF's substantive copy.
- Provide a small, ordinary on-page contents list after the introduction. On desktop it may sit beside the reading column; keep it non-sticky to avoid another persistent layer.
- Show the five values as equal, unnumbered entries with a short explanation each. Use simple grouped text, not oversized icon cards.
- Present education and professional experience as clearly labelled groups. Use real dates as text, not as a decorative timeline that is difficult to read on mobile.
- Keep principal qualifications and experience expanded.
- Show the eight supplied courses as **selected courses**. Use “Vezi cursurile și formările selectate” for the optional disclosure. A claim to show all training requires a verified full catalogue.
- Correct superseded dates, including the PDF's ARPI period, and verify whether the training begun in January 2026 is still ongoing.
- Distinguish current clinical and educational work from future ambitions. Do not publish an unverified Satul Relațional link or imply unavailable workshops can be booked.
- End with one link to Services and one clearly secondary Contact link, rather than repeating the complete homepage closing section.

## 8. Services page: helping visitors choose without self-diagnosing

Page introduction: a short explanation that visitors can explore support areas or make contact if they do not know which is appropriate. Follow it with a visible section index, then the content. Do not put several introductory feature cards before the actual services.

| Group | Section | Stable anchor |
| --- | --- | --- |
| Children and adolescents | Group heading | `copii-adolescenti` |
| Children and adolescents | Clinical psychological evaluation | `evaluare` |
| Children and adolescents | Counselling | `consiliere-copii` |
| Children and adolescents | Integrative psychotherapy | `terapie` |
| Parents and relationships | Parental counselling | `consiliere-parentala` |
| Parents and relationships | Parent–child relationships | `relatia-parinte-copil` |
| Parents and relationships | Family relationships/dynamics | `familie` |
| Access format | Online support for Romanians abroad | `online` |

Keep existing anchors working. Anchor identifiers remain stable across languages while visible text is translated.

Use a simple stacked index on mobile; no horizontally scrolling chips and no seven-item sticky bar. On desktop, show a compact index above the grouped content.

Each clinical service uses a consistent editorial pattern:

1. Approved service name.
2. Short plain-language explanation of its purpose.
3. A few relevant examples, reviewed by the practitioner, that do not function as a diagnosis checklist.
4. What the initial discussion helps clarify, without inventing exact session procedures or durations.
5. Verified practical information, if available.
6. One contact link: proposed label **Discutăm despre această formă de sprijin**.

Use a narrow service-heading column beside the description on wide screens and one column on mobile. Thin dividers separate services; reserve full surface changes for the larger audience groups. Do not use a two-column grid of lengthy service cards that forces visitors to compare unrelated blocks.

Keep the distinction between evaluation, counselling, and psychotherapy understandable in the descriptions. Clinical differences must come from approved professional copy. Present online as a format with individually assessed suitability, not a seventh interchangeable clinical treatment.

Contact links preselect the relevant inquiry category and carry an allowlisted service identifier. Display that context on Contact so it is understandable and can be changed. Include no personal or clinical information in the URL.

## 9. Resources and article reading experience

Use a Resources hub with a concise introduction and the existing article collection. Retain existing article URLs. The old Blog listing can remain an article index linked from Resources; do not break it simply to rename a navigation label.

- Bring the search field and meaningful existing categories near the collection they control.
- Avoid empty filters, placeholder downloads, and an empty professional-resource tab.
- Use readable titles and one short excerpt per preview, with consistent topic labels.
- Avoid forced single-line titles or CSS truncation that hides important distinctions.
- For six articles, use a simple collection; do not introduce pagination or infinite scrolling.
- Give search a visible label, an explicit clear action, result count, and useful empty state.
- Announce result-count changes politely after a short debounce, rather than on every keystroke.
- Do not log visitors' search terms or place arbitrary search text in the URL by default. Keep search/filter state in memory during article navigation so Back returns to the collection state.

Article pages use a reading column, descriptive headings, comfortable paragraph spacing, and a link back to the article collection. Show verified authorship and publication/review dates only. Add references where substantive claims need them. A modified page is not automatically a clinically reviewed article.

Use two or three genuinely related articles at the end where the existing content supports that relationship. Avoid unrelated promotional interruptions in the middle of clinical information. Review all six existing articles before launch.

## 10. FAQ organization and disclosure behavior

Use short introductions and meaningful groups such as first contact, support for children/families, online format, and practical arrangements. These are headings within the page, not separate routes or a new tab interface.

Draft questions around actual visitor uncertainty: how to begin, whether a chosen service is necessary, how parents may be involved, what online suitability means, and how appointment arrangements are discussed. Answers about confidentiality limits and children require practitioner review.

- Place the first-contact questions first.
- Keep answers concise where possible, but do not hide essential qualifications.
- Allow multiple answers to stay open so visitors can compare information.
- Make the full question row a keyboard-operable accordion trigger with a 48px minimum height and wrapping text.
- Use a restrained disclosure indicator with an accessible expanded/collapsed state; no decorative numbered badges.
- Keep expanded text aligned with its question.
- Reuse the existing Radix accordion and implement a readable prerendered fallback before enhancement. If JavaScript never starts, the answers remain visible.
- Check that enhancement does not create a disruptive visible layout shift.

Remove inconsistent prices, absolute confidentiality promises, blanket online-equivalence claims, and unsupported urgency expectations. Do not rely on FAQ structured data for a Google rich-result feature; Google removed that appearance in 2026. [Google Search updates](https://developers.google.com/search/updates#may-2026)

## 11. Contact page layout and field behavior

Desktop: a readable form column around 600–640px and a narrower practical-information column. Mobile: introduction, form, then the direct-email alternative and verified practical details. Do not place a large portrait, map, FAQ, or promotional argument before the form.

Proposed introduction: **Poți trimite o solicitare chiar dacă nu știi încă ce formă de sprijin este potrivită.** This is draft UI copy, not final PDF copy.

| Field | Label and behavior |
| --- | --- |
| Name | **Nume**; required; autocomplete name; accept diacritics and ordinary punctuation |
| Email | **Adresă de email**; required; email input/autocomplete; clear invalid-address feedback |
| Category | **Despre ce ai vrea să discutăm?**; required choice; default to **Nu sunt sigur(ă)** |
| Message | **Mesaj (opțional)**; multiline; maximum 1,000 characters; visible count without announcing every character |

Category options: child/adolescent support, parenting, family relationships, online support, professional inquiry, and not sure. Use the existing Select primitive, with a generous trigger and wrapping option labels. Required fields have visible text instructions; placeholders never replace labels. [W3C form-instruction guidance](https://www.w3.org/WAI/tutorials/forms/instructions/)

Draft helper text beside the message: **Pentru acest prim contact, evită detaliile medicale sau alte informații sensibile despre tine ori copil.** Link concise privacy information beside the form instead of burying it in the footer. This warning does not eliminate the possibility of receiving sensitive information; review the actual data flow accordingly.

Use **Trimite solicitarea** for the submit button. Avoid “Book now” or “Confirm appointment,” since submission does not establish an appointment.

Keep labels above fields, helper text close to its field, and 20–24px between field groups. Use a text area around five lines high, resizable without breaking the page. On mobile, inputs use at least 16px text and remain visible with the keyboard open. Do not position a fixed submit bar over the form.

Validation occurs on submission and, where helpful, after a field has been visited. Do not mark an untouched form red. After a failed validation, focus the first invalid field, show descriptive inline errors, and associate those errors programmatically. Preserve all valid entries.

The selected service context from Services is visible and editable through the category; remove its specific identifier if the user changes to a different category. Do not silently insert a long clinical description into the message field.

## 12. Submission states and exact feedback design

Use persistent inline feedback immediately beside the submission area. A toast may supplement it but cannot be the only message. Keep the submitted form visible with its values on success, switch the submit action to a disabled submitted state, and offer an explicit **Trimite o nouă solicitare** action that resets the form. This prevents accidental repeated sends and avoids a sudden layout collapse.

All messages below are proposed Romanian interface copy and require translation:

| State | Proposed feedback | Controls and data |
| --- | --- | --- |
| Ready | Short privacy and appointment explanation | Submit enabled when no request is pending |
| Invalid email | **Introdu o adresă de email validă pentru a putea primi un răspuns.** | Focus first invalid field; retain all text |
| Missing name | **Completează numele.** | Avoid prescribing a legal full name unnecessarily |
| Sending | **Solicitarea se trimite…** | Disable duplicate submission; set busy state; keep labels stable |
| Provider accepts | **Solicitarea a fost transmisă. O programare se stabilește separat, după discutarea cererii.** | Do not claim inbox delivery, a reply deadline, or a confirmed appointment |
| Definite rejection | **Solicitarea nu a putut fi trimisă. Datele completate sunt păstrate în formular. Poți încerca din nou sau poți scrie direct prin email.** | Explicit retry and email alternative |
| Uncertain delivery | **Nu putem confirma trimiterea. Datele sunt păstrate în formular. O nouă încercare poate trimite aceeași solicitare de două ori.** | No automatic retry; an explicit further send only after the original request is no longer pending |
| Missing configuration | **Formularul nu este disponibil momentan. Poți scrie direct la adresa de email de mai jos.** | No misleading submit action or fake success |

Use one controlled state machine so success, failure, and uncertainty cannot appear together. If a late provider result arrives, reconcile it with the displayed state. Never allow two live requests from one form instance.

Announce sending/success/uncertainty politely. Announce an actionable submission error appropriately without repeated alerts. Do not move focus unexpectedly after a successful send; persistent feedback should be perceivable from the submit area.

Keep the draft in memory across a language change while JavaScript is active. Do not persist message content in localStorage/sessionStorage, URLs, logs, or analytics. Before JavaScript enhancement, show a clear form-unavailable notice and a functioning direct-email link rather than an apparently working submit control.

Fix the recipient in the EmailJS template, restrict allowed origins, and keep secrets out of client code. Verify provider setup, actual delivery, and abuse controls before launch. The warning against sensitive details must not be represented as a guarantee of data protection.

## 13. Copywriting, localization, and content organization rules

Home/About final copy remains the approved baseline. Edit display structure without inventing qualifications or silently shortening substantive meaning. Proposed Services, FAQ, contact helper text, and interface messages are explicitly tracked as drafts.

For all newly written text:

- Address the visitor's next question rather than describing the interface or repeating the page title.
- Use clear professional warmth; avoid exaggerated reassurance, urgency, guilt, and promised outcomes.
- Explain necessary clinical terms in ordinary language on first use.
- Keep a single purpose per paragraph. As a starting target, use roughly 40–70 words per paragraph and shorter interface guidance; preserve necessary meaning over arbitrary word counts.
- Use the exact professional name and approved title consistently.
- Keep labels such as “Contactează-mă” consistent across navigation and page actions; use distinct labels where destinations differ.
- Avoid repeating “safe space,” “personalized support,” or similar generalities in every section.
- Never publish placeholder contact details, autogenerated star ratings, or invented article dates.
- Avoid indexing visitor concerns as a self-diagnosis checklist.

Use a translation glossary for professional titles, service names, confidentiality language, and inquiry categories. Translate by meaning and have sensitive clinical wording reviewed. Retain diacritics and language-specific punctuation.

The active route determines the language. Consolidate the existing duplicated preference handling. Preserve route, article identity, and stable section anchors when switching. Check every field, helper message, status, menu label, 404 message, metadata field, and loading state in all four languages.

Website language availability must remain separate from languages in which clinical services are actually provided. Publish the latter only when verified.

## 14. Accessibility and everyday interaction details

Target WCAG 2.2 AA with manual checks as well as automated checks. A passing scan alone is not a compliance conclusion.

- Use one H1 per page, a logical heading order, meaningful landmarks, and a visible-on-focus skip link.
- Use real links for navigation and buttons for actions. Make ordinary links distinguishable without relying only on color.
- Give all controls a visible focus treatment, sufficient contrast, and generous hit areas.
- Keep focused controls and anchored headings clear of the sticky header.
- Use semantic lists for grouped concerns, service indexes, and training entries.
- Give portrait images concise accurate alternative text; mark decorative elements appropriately.
- Respect reduced motion. Use short color/opacity transitions around 120–180ms rather than bouncing, sliding, or repeated scroll reveals.
- Test 200% text enlargement and reflow at 320 CSS pixels, including long translations. Allow horizontal scrolling only for genuinely two-dimensional content, which these page layouts should not need. [W3C reflow guidance](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- Test user text-spacing overrides without clipping or lost controls.
- Preserve reading position on Back/Forward; reset to the top only for a new page navigation that warrants it.
- Handle anchor scrolling when the target actually exists after lazy loading. Honor reduced motion and avoid arbitrary timed delays.
- Do not move focus to a page heading just because the language changed or an accordion opened.
- Keep essential text readable in prerendered HTML if JavaScript fails. Do not replace it with a permanent spinner during startup.
- Keep the contact email usable without JavaScript.

## 15. Performance, privacy, routes, and search configuration

Preserve the existing stack and reuse suitable installed components. Restyle through project tokens and component composition rather than rewriting accessible primitives or modifying vendored UI files merely for appearance.

Create a route manifest shared by client routing, prerendering, sitemap generation, and checks. Include the Resources and legal routes across four languages while preserving existing article routes and service anchors. Keep unsupported-language recovery from unnecessarily losing a valid requested page.

Do not switch from createRoot to hydration without aligning the current server/client trees. Verify slow-start behavior with the actual production build.

Images must have explicit dimensions and suitable responsive sources. Keep the above-fold portrait prioritized where it is the likely LCP image; lazy-load below-fold images. Use modern formats where they provide an actual quality/size benefit. Do not blindly convert the already-small hero asset or upscale it. Compress the much larger supplied portraits when used below the fold.

Load only necessary self-hosted font weights; avoid unnecessary third-party embeds. Review actual cookies/storage and network requests before deciding whether any consent banner is needed. Do not add a generic banner simply because it is common. Draft accurate privacy and storage notices based on actual behavior; practitioner/provider decisions about lawful processing and retention remain publication requirements.

Targets: LCP at most 2.5s, INP at most 200ms, and CLS at most 0.1 at the 75th percentile where field data is available. Lab tests help diagnose issues but do not establish field INP. [Core Web Vitals](https://web.dev/articles/vitals)

Use the current canonical domain until actual cutover, then update the final domain consistently. Configure language alternates, sitemap, page metadata, social metadata where already supported, and genuine 404 behavior. Do not emit alternates for unpublished language pages.

Keep the preview out of search indexing. A noindex directive controls indexing, not access to confidential information. No confidential clinical documents or unpublished personal data belong in the public preview.

## 16. Implementation sequence and review artifacts

| Phase | Work | Concrete review artifact / completion gate |
| --- | --- | --- |
| 1. Baseline and content | Map PDF requirements, existing sections, fact conflicts, routes, contact data flow, and translations | Content matrix with source authority and unresolved facts; initial privacy/provider decisions |
| 2. Structural design | Define containers, type scale, palette, spacing, header/footer, page order, and mobile navigation | Desktop/mobile layouts with real Romanian text and a long translated sample |
| 3. Critical journey | Build Home, Services, and Contact together using the existing stack | A working path from support card to relevant service to contextual inquiry, including uncertain-send behavior |
| 4. Content depth | Complete About, Resources, article review, FAQ, and accurate legal content | All required PDF sections present; no unsupported claims or placeholder destinations |
| 5. Localization | Complete four-language interface and reviewed page content | Translation matrix and screenshots of long-label/long-paragraph cases |
| 6. Technical integration | Align routes/prerendering, fallback content, theme/language startup, images, and metadata | Production build checked at direct URLs with slow/failed JavaScript |
| 7. Visual and usability review | Check all pages, states, sizes, themes, keyboard paths, and realistic tasks | Annotated issues list resolved by severity; screenshots of important form and mobile states |
| 8. Release preparation | Verify professional facts and EmailJS delivery; prepare domain configuration and rollback | Completed publication checklist and recoverable previous deployment |
| 9. Authorized launch | Publish the completed release, configure custom domain where ready, verify production | Working navigation, contact delivery, HTTPS, canonical URLs, and indexing configuration |
| 10. Follow-up | Check production usability, delivery, broken links, and available performance/search evidence | Targeted corrections based on observed problems; no new tracking added automatically |

Use the first coherent Home/Services/Contact preview to review real reading and interactions. Do not treat a static color palette as evidence that the user journey works. Continue the remaining authorized planning/implementation work without adding unnecessary approval gates.

## 17. Usability tasks and release acceptance

Perform task-based reviews, preferably including a small number of representative readers when available. Do not make claims of user validation if only an internal review was performed.

| Scenario | Observable acceptance condition |
| --- | --- |
| Parent unsure what support is needed | Finds relevant support language and can inquire with “not sure,” without selecting a diagnosis |
| Visitor enters through a service anchor | Correct section is visible below the header and its contact link carries understandable context |
| Romanian living abroad | Finds online information and understands that suitability and arrangements are discussed individually |
| Reader assesses professional background | Finds principal qualifications immediately and selected training without mistaking it for a full catalogue |
| Visitor uses the form on a phone | Labels remain visible, keyboard does not obscure active fields, and submission feedback is clear |
| Visitor changes language mid-inquiry | Current page and in-memory draft survive; all labels/statuses change correctly |
| Provider rejects or cannot confirm delivery | Draft is preserved, no fake success or email-app launch occurs, and the visitor has a clear next action |
| Reader opens an article and returns | Collection state and reading position are restored |
| Keyboard-only visitor | Can navigate, change language/theme, operate the menu/FAQ, and submit without getting trapped |
| Enlarged-text reader | All content and controls remain available without overlap, truncation, or horizontal page scrolling |
| JavaScript fails | Main content, FAQ answers, localized navigation/language links, and direct email remain usable |

Visual QA covers 320, 390, 768, 1280, and 1440px widths, including representative short-height and landscape cases. Review every route in Romanian at mobile/desktop, all routes for four-language content completeness, and critical navigation/form states in every language. Check light/dark/system behavior and a screen-reader pass over the main journey.

Run the project's relevant lint, unit, production build, route, SEO, GitHub Pages, and browser checks after implementation. Add meaningful checks for new behavior where appropriate; avoid snapshot tests that merely reproduce CSS choices.

Severity order: broken contact/navigation or misleading clinical/operational claims first; inaccessible controls and clipped content next; hierarchy and reading problems next; cosmetic alignment last. Visual polish is complete when the pages share a coherent system, not when every block has a decorative effect.

## 18. Publication facts still requiring verification

These do not prevent completing the design and independent work, but their related claims cannot be published as facts until resolved:

- Exact current credentials, professional title, historical training dates, and ongoing-training status.
- Which services/formats are currently offered and any cross-border limitations relevant to online support.
- Languages in which sessions are actually provided.
- Any location, telephone, opening hours, fees, insurance, or response expectations proposed for publication.
- Actual EmailJS template/provider settings, recipient, allowed origins, delivery, and appropriate processing arrangements.
- Accurate privacy/retention details and any third-party storage or transfer information that applies.
- Accuracy, authorship, dates, and professional review of existing articles.
- Domain ownership/configuration and the operational cutover details.

When information remains unverified, omit the associated claim and preserve a useful contact path. No testimonial, fabricated catalogue, empty download, future workshop, or unsupported promise is needed to complete the launch.

## 19. About and Services visual polish — 3 October 2026

The user's latest constraint is authoritative: keep every existing text node and its reading order on both pages. This refinement changes presentation and interaction only, retaining Home's accepted light and dark palettes, serif headings, soft surfaces, restrained line icons and organic portrait framing.

- About: group the opening copy and authentic portrait on one softly tinted surface; use a clear section index; place chapter headings beside readable prose on desktop and above it on mobile. Separate the five values and ten professional groups into consistent panels, preserving the selected-course disclosure and all paragraphs, lists and continuations. Sticky chapter headings apply only on sufficiently large screens.
- Services: use the shared introductory surface with the family line motif on desktop; retain the seven original index entries and service anchors. Each service presents its heading, description, examples, initial-contact text and contextual inquiry action in the original order. Reuse Home's closing-panel treatment.
- Reading and interaction: allow headings and nested grids to reflow with enlarged translated text; keep clear keyboard focus and comfortable anchor targets below the sticky header. Use router-aware fragment links with native HTML destinations so the index works with and without JavaScript.
- Verification: compare all eight localized pages against the frozen pre-refinement ordered text in `docs/qa/about-services-text-before.json`; verify identical production HTML and hydrated text. Test both themes at 320 and 1440px, every section link, 200% text with spacing overrides, and existing responsive/no-JavaScript journeys. Save the text verification record and review screenshots in `docs/qa/`.

Publication conditions and clinical-content review requirements remain those specified above.

## 20. FAQ and Contact visual polish — 3 October 2026

Apply the same accepted palettes and reading hierarchy to these pages, retaining all existing copy and its order across RO/EN/IT/ES. FAQ groups should be easy to scan, with separate question panels, visible open/focus states, multiple simultaneous answers and useful reading widths. Retain native prerendered answers when JavaScript is absent and respect reduced motion.

Contact should distinguish the inquiry form from direct email without adding fields or unsupported availability promises. Group name/email visually on wider screens; stack them on phones. Give service context, required-field guidance, optional-message guidance, privacy information, appointment expectations and submission feedback clear visual roles. Preserve validation, live feedback, duplicate prevention, error drafts and all existing delivery states. Keep the email address readable and explicitly clickable in both themes. Maintain adequate contrast for the active Contact navigation button.

Verify the production text against the frozen eight-page baseline, enlarged text with all FAQ answers expanded, keyboard operation, responsive layouts, both themes and all intercepted-provider contact scenarios. Local previews and simulated provider acceptance must remain distinct from real mailbox delivery and publication.
